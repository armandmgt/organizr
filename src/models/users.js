import { Schema, model } from '../db';

export const UserSchema = Schema({
  email: String,
  username: String,
  password: String,
});

const User = model('User', UserSchema);

export default User;
