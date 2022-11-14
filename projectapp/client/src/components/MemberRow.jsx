import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_MEMBER } from '../mutations/memberMutations';
import { GET_MEMBERS } from '../queries/memberQueries';
import { GET_STOCKS } from '../queries/stockQueries';

export default function MemberRow({ member }) {
  const [deleteMember] = useMutation(DELETE_MEMBER, {
    variables: { id: member.id },
    refetchQueries: [{ query: GET_MEMBERS }, { query: GET_STOCKS }],

  });

  return (
    <tr>
      <td>{member.name}</td>
      <td>{member.email}</td>
      <td>{member.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteMember}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
