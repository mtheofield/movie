import { gql } from '@apollo/client';

export const ADD_DESTINATION = gql`
  mutation addTrip($description: String!, $tripTitle: String!, $imageUrl: String!) {
    addTrip(description: $description, tripTitle: $tripTitle, imageUrl: $imageUrl) {
      _id
      description  #ThoughtText
      destinationTitle    #ThoughtAuthor
      imageUrl
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;