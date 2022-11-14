import { useQuery } from '@apollo/client';
import MemberRow from './MemberRow';
import Spinner from './Spinner';
import { GET_MEMBERS } from '../queries/memberQueries';

export default function Members() {
  const { loading, error, data } = useQuery(GET_MEMBERS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.members.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
