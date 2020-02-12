import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 36.6,
    longitude: -95.665,
    zoom: 4
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);
  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/bgome04/ck6jng8h50prq1iploxph8aok'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {logEntries.map(entry => (
        <Marker
          key={entry.id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-12}
          offsetTop={-24}
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
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default App;
