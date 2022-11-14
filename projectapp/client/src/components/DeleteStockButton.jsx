import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { DELETE_STOCK } from '../mutations/stockMutations';
import { GET_STOCKS} from '../queries/stockQueries';
import { useMutation } from '@apollo/client';

export default function DeleteStockButton({ stockId }) {
  const navigate = useNavigate();

  const [deleteStock] = useMutation(DELETE_STOCK, {
    variables: { id: stockId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_STOCKS }],
  });

  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danger m-2' onClick={deleteStock}>
        <FaTrash className='icon' /> Delete Stock
      </button>
    </div>
  );
}
