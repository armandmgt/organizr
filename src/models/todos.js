import { model, Schema } from '../db';

export const TodoSchema = Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  done: { type: Boolean },
  labels: [{ type: String }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Todo = model('Todo', TodoSchema);

export default Todo;
