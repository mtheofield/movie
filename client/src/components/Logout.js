import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_DESTINATIONS} from '../utils/queries';

const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_DESTINATIONS);
    const destinations = data?.destinations || [];

    return (
        <main>
            <br />
            <div className="flex-row justify-center">
                <h1>Logged out</h1>
            </div>
        </main>
    );
};

export default Dashboard;
