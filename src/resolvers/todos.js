import { UserInputError } from 'apollo-server';
import Todo from '../models/todos';

export default {
  Mutation: {
    createTodo: async (
      parent,
      { title, description, dueDate, labels },
      { me }
    ) => {
      try {
        return await new Todo({
          title,
          description,
          dueDate,
          labels,
          user: me,
        }).save();
      } catch (e) {
        const validationErrors = { user: 'User does not exist' };
        throw new UserInputError('Todo creation failed', {
          validationErrors,
          formattedMessage: Object.values(validationErrors).join(', '),
        });
      }
    },
    deleteTodo: async (parent, { id }, { me }) => {
      try {
        const todo = await Todo.findOne({
          _id: id,
          user: me._id,
        }).exec();
        if (todo)
          return { ok: true, todo: await Todo.findByIdAndRemove(id).exec() };
        return { ok: false };
      } catch (e) {
        console.log(e);
        return { ok: false };
      }
    },
    updateTodo: async (
      parent,
      { id, title, description, dueDate, done, labels },
      { me }
    ) => {
      try {
        const todo = await Todo.findOne({
          _id: id,
          user: me._id,
        }).exec();
        if (todo)
          return {
            ok: true,
            todo: await Todo.findByIdAndUpdate(
              id,
              {
                title,
                description,
                dueDate,
                done,
                labels,
              },
              { new: true }
            ).exec(),
          };
        return { ok: false };
      } catch (e) {
        console.log(e);
        return { ok: false };
      }
    },
  },
  Todo: {
    id: ({ _id }) => _id,
  },
};
