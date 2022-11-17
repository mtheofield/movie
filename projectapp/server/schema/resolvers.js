const { Destination, User } = require('../models');

const resolvers = {
  Query: {
    destinations: async () => {
      const  destination  = await Destination.find().sort({ createdAt: -1 });
       console.log("---> destination :" + JSON.stringify (destination));
      return destination;
    },

    destination: async (parent, { destinationId }) => {
      return await Destination.findOne({ _id: destinationId });
    },
  },

  Mutation: {
    addDestination: async (parent, { description, destinationTitle, imageUrl }) => {
      return await Destination.create({ description, destinationTitle, imageUrl });
    },


    addComment: async (parent, { destinationId, commentText }) => {
      return  Destination.findOneAndUpdate(
        { _id: destinationId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeDestination: async (parent, { destinationId }) => {
      return  Destination.findOneAndDelete({ _id: destinationId });
    },
    removeComment: async (parent, { destinationId, commentId }) => {
      return  Destination.findOneAndUpdate(
        { _id: destinationId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
