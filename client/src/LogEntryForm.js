import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './API.js';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} class='dark-matter'>
      {error ? <h3 className='error'>{error}</h3> : null}
      <h1>
        New Coffee Shop Entry
        <span>Please fill in the following form to add a new coffee shop.</span>
      </h1>
      <label>
        <span>Store Name: </span>
        <input id='title' type='text' name='title' required ref={register} />
      </label>

      <label>
        <span>Comments : </span>
        <textarea
          id='comments'
          name='comments'
          required
          ref={register}
        ></textarea>
      </label>
      <label>
        <span>Rating 1-10 : </span>
        <input id='rating' type='text' name='rating' required ref={register} />
      </label>

      <label>
        <span> </span>
        <button disabled={loading}>
          {loading ? 'Loading...' : 'Create Entry'}
        </button>
      </label>
    </form>
  );
};

export default LogEntryForm;
