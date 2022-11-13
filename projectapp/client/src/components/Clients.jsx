import {gql, useQuery} from '@apollo/client';
import CLientRow from "./ClientRow";
import { GET_CLIENTS } from '../queries/clientQuery';

export default function Clients() {
    const { loading, error, data} = useQuery(GET_CLIENTS)
    
    if (loading) return <p> loading...</p>
    if (error) return <p> something went wrong </p> 
    
  return <>{!loading && !error && (
    <table className= 'table table-hover mt-3'> 
    <thead> 
        <tr>
        <th>name</th>
        <th>email</th>
        <th>phone</th>
        </tr>
        </thead>
        <tbody>
            {data.clients.map(client =>(
                <CLientRow key={client.id} client={client} />
            ))}
        </tbody>
        </table>
   )} </>;
    
}
