import { gql } from '@apollo/client';

//to add a member 
const ADD_MEMBER = gql`
  mutation addMember($name: String!, $email: String!, $phone: String!) {
    addMember(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
//delete a member from book 
const DELETE_MEMBER = gql`
  mutation deleteMember($id: ID!) {
    deleteMember(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { ADD_MEMBER, DELETE_MEMBER };
