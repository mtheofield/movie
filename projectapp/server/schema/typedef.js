// const { gql } = require("apollo-server-express");
// const typeDefs = gql`
// type User {
//     _id: ID!
//     username: String!
//     email: String!
//     gender: String!
//     dob: String!
//   }
//   type Stock {
//     name: String
//     description: String
//       status: {
//         type: String,
//         enum: ['New', 'Progress', 'Finished'],
//       },
//       stockId: {
//   }
// type Mutation {
//     addUser(
//       username: String!
//       email: String!
//       password: String!
//       gender: String!
//       dob: String!
//     ): Auth
//     login(password: String!, email: String!): Auth
//     updateUser(
//       username: String!
//       email: String!
//       password: String!
//       gender: String!
//       dob: String!
//     ): Auth
//     savePodcast(podcastData: PodcastInput!): User
//     removePodcast(_id: ID!): User
//     addPodcast(podcasts: [ID]!): Podcast
//   }
// `;

// module.exports = typeDefs;
