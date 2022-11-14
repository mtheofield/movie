import Members from '../components/Members';
import Stocks from '../components/Stocks';
import AddMemberModal from '../components/AddMemberModal';
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
