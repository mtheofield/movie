import { gql } from '@apollo/client';


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
