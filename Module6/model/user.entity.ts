import mongoose, { Schema, Document } from "mongoose";

export type Role = 'admin' | 'user';

export interface UserEntity extends Document{
  id: string;
  role: Role;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<UserEntity>('User', UserSchema);