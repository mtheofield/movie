import React from 'react';
import { useQuery } from '@apollo/client';

import DestinationList from '../components/DestinationList';
import DestinationForm from '../components/DestinationForm';

import { QUERY_DESTINATIONS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_DESTINATIONS);
  const destinations = data?.destinations || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <DestinationForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Please wait</div>
          ) : (
            <DestinationList
            destinations={destinations}
              message={"I would love to hear more"}
              title="The best destinations for..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;