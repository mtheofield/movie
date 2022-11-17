import React from 'react';
import { useQuery } from '@apollo/client';
import DestinationForm from '../components/DestinationForm';
import DestinationList from '../components/DestinationList';

import { QUERY_DESTINATIONS } from '../utils/queries';

const WriteReview = () => {
    const { loading, data } = useQuery(QUERY_DESTINATIONS);
    const destinations = data?.destinations || [];
    return (
        <main>
            <div className="flex-row justify-center">
                <div
                    className="col-12 col-md-10 mb-3 p-3">
                    <DestinationForm />
                </div>

            </div>
        </main>
    );
};

export default WriteReview