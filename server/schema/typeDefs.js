const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Destination {
    _id: ID
    destinationTitle: String
    imageUrl: String
    description: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    username: String
    commentText: String
  }
  

  type Query {
    destinations: [Destination]!
    destination(destinationId: ID!): Destination
  }

  type Mutation {
    addDestination(destinationTitle: String!, description: String!, imageUrl: String!): Destination
    addComment(destinationId: ID!, username: String, commentText: String!): Destination
    removeDestination(destinationId: ID!): Destination
    removeComment(destinationId: ID!, commentId: ID!): Destination
  }
`;

module.exports = typeDefs;

