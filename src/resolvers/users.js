import { AuthenticationError, UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import User from '../models/users';
import Todo from '../models/todos';
import createToken from '../auth/createToken';
import verifyToken, { getId } from '../auth/verifyToken';

export default {
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
    registerUser: async (parent, { email, password, username }) => {
      try {
        const user = await new User({
          email,
          password,
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
      if (!user) throw new AuthenticationError('Invalid credentials');
      const match = await bcrypt.compare(password, user.password || '');
      if (match) {
        return { token: createToken(user) };
      }
      throw new AuthenticationError('Invalid credentials');
    },
  },
  User: {
    id: ({ _id }) => _id,
    todos: async parent =>
      Todo.where({ user: parent._id })
        .find()
        .exec(),
  },
};
