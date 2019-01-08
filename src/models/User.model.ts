import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  admin: boolean;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
  admin: { type: Boolean, default: false },
  password: { type: String, required: true },
  username: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() }
});

export const User: mongoose.Model<IUser> = mongoose.model('User', UserSchema);
