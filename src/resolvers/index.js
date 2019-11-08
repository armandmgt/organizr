import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import User from '../models/users';
import userResolver from './users';
import todoResolver from './todos';

export default [
  userResolver,
  todoResolver,
  {
    Query: {},
    Mutation: {
      reset: async () => {
        const { n, ok } = await User.deleteMany({});
        return n === 0 || ok === 1;
      },
    },
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
  },
];
