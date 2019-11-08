import { model, Schema } from '../db';

export const TodoSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date },
  done: { type: Boolean },
  labels: { type: Array, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Todo = model('Todo', TodoSchema);

export default Todo;
