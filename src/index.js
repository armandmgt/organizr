import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import { AuthenticationError, UserInputError } from 'apollo-server';
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
        throw new AuthenticationError('Invalid token');
      }
      const user = await User.findById(getId(token))
        .select('email password username')
        .exec();
      if (user) return user;
      throw new AuthenticationError('Invalid token');
    },
  },
  Mutation: {
    reset: async () => {
      return User.remove({});
    },
    registerUser: async (parent, { email, password, username }) => {
      const passwordHash = await bcrypt.hash(password, 10);
      try {
        const user = await new User({
          email,
          passwordHash,
          username,
        }).save();
        return { user, token: createToken(user) };
      } catch (e) {
        const validationErrors = { email: 'Email is not available' };
        throw new UserInputError('Registration failed', {
          validationErrors,
          formattedMessage: Object.values(validationErrors).join(', '),
        });
      }
    },
    signInUser: async (parent, { email, password }) => {
      const user = await User.where({ email })
        .findOne()
        .exec();
      const match = await bcrypt.compare(password, user.passwordHash || '');
      if (match) {
        return { token: createToken(user) };
      }
      throw new AuthenticationError('Invalid credentials');
    },
  },
  User: (parent, { _id: id, ...other }) => ({ id, ...other }),
};

const server = new ApolloServer({
  typeDefs: Schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
