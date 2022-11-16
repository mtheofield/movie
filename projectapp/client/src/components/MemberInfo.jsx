import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function MemberInfo({ member }) {
  return (
    <>
      <h5 className='mt-5'>Member Information</h5>
      <ul className='list-group'>
        <li className='list-group-item'>
          <FaIdBadge className='icon' /> {member.name}
        </li>
        <li className='list-group-item'>
          <FaEnvelope className='icon' /> {member.email}
        </li>
        <li className='list-group-item'>
          <FaPhone className='icon' /> {member.phone}
        </li>
      </ul>
    </>
  );
}
