import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import Schema from '../organizr.graphql';
import User from './models/users';
import createToken from './auth/createToken';
import verifyToken, { getId } from './auth/verifyToken';

const app = express();
app.use(cors());

const resolvers = {
  Query: {
    users: async () => User.find().exec(),
    viewer: async (parent, { token }) => {
      if (!verifyToken(token)) {
        return { codes: ['invalid_token'], messages: ['Invalid token'] };
      }
      const user = await User.findById(getId(token))
        .select('email password username')
        .exec();
      if (user) return user;
      return { codes: ['invalid_user'], messages: ['Invalid user'] };
    },
  },
  Mutation: {
    registerUser: async (parent, { email, password, username }) => {
      const user = await new User({
        email,
        password,
        username,
      }).save();
      return { user, token: createToken(user._id) };
    },
  },
  User: (parent, { _id: id, ...other }) => ({ id, ...other }),
  UserOrError: {
    __resolveType: obj => (obj.id ? 'User' : 'Error'),
  },
  RegisterResultOrError: {
    __resolveType: obj => (obj.token ? 'RegisterResult' : 'Error'),
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
