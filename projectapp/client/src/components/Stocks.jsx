import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import StockCard from './login';
import { GET_STOCKS } from '../queries/stockQueries';

export default function Stocks() {
  const { loading, error, data } = useQuery(GET_STOCKS);

  if (loading) return <Spinner />;
  if (error) return <p>Uh oh something went wrong</p>;
// console.log(data)
  return (
    <>
      {data.stocks.length > 0 ? (
        <div className='row mt-4'>
          {data.stocks.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </div>
      ) : (
        <p>There are currently to dos for an event</p>
      )}
    </>
  );
}