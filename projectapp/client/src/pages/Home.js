import Members from '../components/DestinationForm';
import Stocks from '../components/Response';
import AddMemberModal from '../components/logout';
import AddStockModal from '../components/AddStockModal';

export default function Home() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddMemberModal />
        <AddStockModal />
      </div>
      <Stocks />
      <hr />
      <Members />
    </>
  );
}
