const mongoose = require('mongoose');
const root = require('app-root-path');
const path = require('path');

require('dotenv').config()
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/destination_app',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
