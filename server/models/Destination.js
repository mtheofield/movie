const { Schema, model } = require('mongoose');
// const  = require('./');

const dateFormat = require('../utils/dateFormat');

const destinationSchema = new Schema({
  description: {
    type: String,
    required: 'Tell us about it here',
    minlength: 3,
    maxlength: 300,
    trim: true,
  },
  destinationTitle: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 300,
      },
      username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 25,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Destination = model('Destination', destinationSchema);

module.exports = Destination;
//test