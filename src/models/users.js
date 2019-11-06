import { Schema, model } from '../db';

export const UserSchema = Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  passwordHash: { type: String, required: true },
});

const User = model('User', UserSchema);

export default User;
