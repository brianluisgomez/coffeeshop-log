import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const myMap = useRef();
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 35.7821377,
    longitude: -78.651112,
    zoom: 10
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = event => {
    console.log(event);
    const [longitude, latitude] = event.result.center;
    setAddEntryLocation({
      latitude,
      longitude
    });
  };

  return (
    <ReactMapGL
      ref={myMap}
      {...viewport}
      mapStyle='mapbox://styles/bgome04/ck6jng8h50prq1iploxph8aok'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {logEntries.map(entry => (
        <React.fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div
              onClick={() =>
                setShowPopup({
                  // ...showPopup,
                  [entry._id]: true
                })
              }
            >
              <svg
                viewBox='0 0 24 24'
                width='24'
                height='24'
                stroke='#f8c102'
                stroke-width='2.5'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='css-i6dzq1'
              >
                <path d='M18 8h1a4 4 0 0 1 0 8h-1'></path>
                <path d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z'></path>
                <line x1='6' y1='1' x2='6' y2='4'></line>
                <line x1='10' y1='1' x2='10' y2='4'></line>
                <line x1='14' y1='1' x2='14' y2='4'></line>
              </svg>
            </div>
          </Marker>

          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              anchor='top'
            >
              <div className='popup'>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <p>Rating: {entry.rating}</p>
              </div>
            </Popup>
          ) : null}
        </React.fragment>
      ))}
      <Geocoder
        mapRef={myMap}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        position='top-left'
        onViewportChange={setViewport}
        onResult={showAddMarkerPopup}
      />

      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div>
              <svg
                viewBox='0 0 24 24'
                width='24'
                height='24'
                stroke='#f8c102'
                stroke-width='2.5'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='css-i6dzq1'
              >
                <path d='M18 8h1a4 4 0 0 1 0 8h-1'></path>
                <path d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z'></path>
                <line x1='6' y1='1' x2='6' y2='4'></line>
                <line x1='10' y1='1' x2='10' y2='4'></line>
                <line x1='14' y1='1' x2='14' y2='4'></line>
              </svg>
            </div>
          </Marker>

          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor='top'
          >
            <div className='popup'>
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
