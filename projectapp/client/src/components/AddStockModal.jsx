import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_STOCK } from '../mutations/stockMutations';
import { GET_STOCKS } from '../queries/stockQueries';
import { GET_MEMBERS } from '../queries/memberQueries';

export default function AddStockModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [memberId, setMemberId] = useState('');
  const [status, setStatus] = useState('new');

  const [addStock] = useMutation(ADD_STOCK, {
    variables: { name, description, memberId, status },

    update(cache, { data: { addStock } }) {
      // console.log(addStock)
      const { stocks } = cache.readQuery({ query: GET_STOCKS });
      // const  = cache.readQuery({ query: GET_STOCKS, variables: {name, description, status, stockId }});
      // console.log(TEST)
      cache.writeQuery({
        query: GET_STOCKS,
        data: { stocks: [...stocks, addStock] },
      });
    },
  });

  // Get Members 
  const { loading, error, data } = useQuery(GET_MEMBERS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('You must fill out all fields');
    }

    addStock(name, description, memberId, status);
    // console.log (TEST)

    setName('');
    setDescription('');
    setStatus('new');
    setMemberId('');
  };

  if (loading) return null;
  if (error) return 'Error something is wrong';

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addStockModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>To Do</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addStockModal'
            aria-labelledby='addStockModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addStockModalLabel'>
                    New Stock
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                      <label className='form-label'>Name</label>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Description</label>
                      <textarea
                        className='form-control'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        id='status'
                        className='form-select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value='new'>New</option>
                        <option value='progress'>Progress</option>
                        <option value='finished'>Finished</option>
                      </select>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Member</label>
                      <select
                        id='memberId'
                        className='form-select'
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                      >
                        <option value=''>Select Member</option>
                        {data.members.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type='submit'
                      data-bs-dismiss='modal'
                      className='btn btn-primary'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}