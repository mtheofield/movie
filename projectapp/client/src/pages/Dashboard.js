import React from 'react';
import { useQuery } from '@apollo/client';
import DestinationForm from '../components/DestinationForm';
import DestinationList from '../components/DestinationList';

import { QUERY_DESTINATIONS } from '../utils/queries';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_DESTINATIONS);
  const destinations = data?.destinations || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Please wait</div>
          ) : (
            <DestinationList
            destinations={destinations}
              message={"Where do you really want to travel too?"}
              title="What is the coolest place you have gone? "
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
