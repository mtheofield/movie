import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/footer';
import MemberInfo from '../components/sign-up.js';
import DeleteStockButton from '../components/DeleteStockButton';
import EditStockForm from '../components/Post';
import { useQuery } from '@apollo/client';
import { GET_STOCK } from '../queries/stockQueries';

export default function Stock() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_STOCK, { variables: { id } });
// console.log(data)
  if (loading) return <Spinner />;
  if (error) return <p>Uh oh something went wrong</p>;

  
  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Take me back
          </Link>

          <h1>{data.stock.name}</h1>
          <p>{data.stock.description}</p>

          <h5 className='mt-3'>Stock Status</h5>
          <p className='lead'>{data.stock.status}</p>
        {/* console.log(data.stock.member) */}
          <MemberInfo member={data.stock} />

          <EditStockForm stock={data.stock} />

          <DeleteStockButton stockId={data.stock.id} />
        </div>
      )}
    </>
  );
}
