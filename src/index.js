import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Schema from '../organizr.graphql';

const app = express();
app.use(cors());

let id = 0;
const users = {};

const resolvers = {
  Query: {
    users: () => Object.entries(users).map(([id, user]) => ({ id, ...user })),
    user: () => ({}),
    me: () => ({ username: 'Robin Wieruch' }),
  },
  Mutation: {
    addUser: (parent, { username }) => {
      const user = { username };
      users[id] = user;
      id += 1;
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs: Schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
