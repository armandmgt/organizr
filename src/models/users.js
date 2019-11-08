import * as bcrypt from 'bcrypt';
import { model, Schema } from '../db';

export const UserSchema = Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function setTodos() {
  this.todos = [];
});

UserSchema.pre('save', async function hashPassword() {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = model('User', UserSchema);

export default User;
