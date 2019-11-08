import { UserInputError } from 'apollo-server';
import Todo from '../models/todos';
import User from '../models/users';

export default {
  Mutation: {
    createTodo: async (
      parent,
      { title, description = '', dueDate, labels, user: { id, email } }
    ) => {
      const user =
        id ||
        (await User.where({ email })
          .findOne()
          .exec());
      try {
        return await new Todo({
          title,
          description,
          dueDate,
          labels,
          user,
        }).save();
      } catch (e) {
        const validationErrors = { user: 'User does not exist' };
        throw new UserInputError('Todo creation failed', {
          validationErrors,
          formattedMessage: Object.values(validationErrors).join(', '),
        });
      }
    },
  },
};
