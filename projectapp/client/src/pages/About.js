import React from 'react';
import { useQuery } from '@apollo/client';
import imgBlank from '../components/assets/images/blank.jpg';
import imgSpinner from '../components/assets/images/spinner.gif';


import { QUERY_DESTINATIONS } from '../utils/queries';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_DESTINATIONS);
  const destinations = data?.destinations || [];

  return (
    <main>
      <br />
      <div className="flex-row justify-center">
        <div className="mb-3 destinationCard">
          <h3 className=" p-2 m-0 card-header">
            We love to travel! <br />
          </h3>
          <div className="  p-2">
            <p>This is a way to connect people with each other and share their stories </p>
          </div>
          <div className="  p-2">
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
