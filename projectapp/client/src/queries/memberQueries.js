import { gql } from '@apollo/client';

const GET_MEMBERS = gql`
  query getMembers {
    members {
      id
      name
      email
      phone
    }
  }
`;

export { GET_MEMBERS };

