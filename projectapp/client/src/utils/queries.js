import { gql } from '@apollo/client';

export const QUERY_DESTINATIONS= gql`
  query getDestination {
    destination {
      _id
      description #thoughtText
      tripTitle   #ThoughtAuthor
      imageUrl
      createdAt
    }
  }
`;


