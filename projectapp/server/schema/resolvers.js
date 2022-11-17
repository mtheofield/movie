const { Member, Stock } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
      member: async () => {
        return Member.find();
      },
  
      // Member QUERY - FIND ONE
      member: async (parent, { name }) => {
        return Member.findOne({ _id: name });
      },
  
      // Stocks QUERY - FIND BY Member
      stocks: async (parent, { genre, name, id }) => {
        const params = {};
  
        if (genre) {
          params.genre = genre;
        }
  
        if (name) {
          params.name = {
            $regex: name,
          };
        }
  
        if (id) {
          params.id = {
            $regex: id,
          };
        }
  
        return Podcast.find(params).populate("genre");
      },
  
      // FIND ONE PODCAST QUERY
      podcast: async (parent, { podcastId }) => {
        return Podcast.findOne({ _id: podcastId });
      },
  
      // RETRIEVE DATA FOR LOGGED-IN USER
      user: async (parent, args, context) => {
        if (context.user) {
          return Profile.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    },
  
    // MUTATIONS
    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
  
      // user to login
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError("this is not the correct credentials");
        }
  
        const validPw = await user.isValidPassword(password);
  
        if (!validPw) {
          throw new AuthenticationError("this is not the correct credentials");
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
  
      // Update your users 
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return User.findByIdAndUpdate(context.user.id, args, {
            new: true,
          });
        }
  
        throw new AuthenticationError("You are not");
      },
     
    },
  };
  
  module.exports = resolvers;
  