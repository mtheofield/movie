import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import './css/betastyle.css';

import { ADD_DESTINATION } from '../utils/mutations.js';
import { QUERY_DESTINATIONS } from '../utils/queries';


const DestinationForm = () => {
  // const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
  });
  const [characterCount, setCharacterCount] = useState(0);

  const [addDestination, { error }] = useMutation(ADD_DESTINATION, {
    // All returning data from Apollo Client queries/mutations return in a `data` field, followed by the the data returned by the request
    update(cache, { data: { addDestination } }) {
      try {
        const { destinations } = cache.readQuery({ query: QUERY_DESTINATIONS });

        cache.writeQuery({
          query: QUERY_DESTINATIONS,
          data: { destinations: [addDestination, ...destinations] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addDestination({
        variables: { ...formState },
      });

      setFormState({
        description: '',
        destinationTitle: '',
        imageUrl: '',
      });

      // navigate.push('/dashboard');

    } catch (err) {
      console.error(err);
    }
  };



  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'description' && value.length <= 280) {
      setFormState({ ...formState, [name]: value });
      setCharacterCount(value.length);
    } else if (name !== 'description') {
      setFormState({ ...formState, [name]: value });
    }
  };



  return (
    <>
      <h3 className="destinationCard card-title">Where is your destination?</h3>
      <div className="destinationCard">


        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >


          <div className="col-12">
            <input
              name="destinationTitle"
              placeholder="Where did you go?"
              value={formState.destinationTitle}
              className="form-input w-100"
              onChange={handleChange}
            />
          </div>
          <div className="col-12">


            <textarea
              name="description"
              placeholder="Share your experience!"
              value={formState.description}
              className="form-input w-100"
              style={{ lineHeight: '1.5' }}
              onChange={handleChange}>
            </textarea>
          </div>


          <div className="col-12 col-lg-3">
            <button className=" btn-add nav-table-cell" type="submit">
              Submit a destination
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              Error...
            </div>
          )}
        </form>


        <div className="form-container">
          {/* <form className="form-picture"
            id="formImage"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleFormSubmit2}>
            <input type="file" name="files[]" multiple />
            <input type="submit" value="Upload Files" name="submit" />
          </form> */}

          <div className="polaroid-container">
            {/* <img id="imgCloudinary" className="polaroid" src={imgBlank} alt="" /> */}
          </div>


        </div>
      </div>
    </>
  );
};

export default DestinationForm;
