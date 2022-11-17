const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { typeDefs, resolvers } = require('./schema');
const path = require('path');


const db = require('./config/db');
const cors  = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

async function startApolloServer(typeDefs, resolvers) {

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();

const app = express();

server.applyMiddleware({ app });

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
}


startApolloServer(typeDefs, resolvers)