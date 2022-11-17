// const mongoose = require('mongoose');

//   const conn = await mongoose.connect(process.env.MONGO_URI) {
//     useNew
// }

//   console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
// };

// module.exports = connectDB;

// const mongoose = require('mongoose');
// const mongoose = require('mongoose');
// const root = require('app-root-path');
// const path = require('path');

// require('dotenv').config({path:root +path.sep + ".env"});

// mongoose.connect(
//     process.env.MONGODB_URI || 'mongodb://localhost/travel_blog_db',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   }
// );
// //process.env.MONGODB_URI ||
// module.exports = mongoose.connection;


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/destination_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
