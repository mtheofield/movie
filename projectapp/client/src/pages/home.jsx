import Members from '../components/review';
import Stocks from '../components/Stocks';
import AddMemberModal from '../components/open';
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
