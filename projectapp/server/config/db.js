// const mongoose = require('mongoose');

// const connectDB = async () => {
//   const conn = await mongoose.connect(process.env.MONGO_URI);

//   console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
// };

// module.exports = connectDB;

// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const root = require('app-root-path');
const path = require('path');

require('dotenv').config({path:root +path.sep + ".env"});

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/travel_blog_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
//process.env.MONGODB_URI ||
module.exports = mongoose.connection;

