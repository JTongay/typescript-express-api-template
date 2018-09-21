import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  admin: boolean;
  password: string;
}

export const UserSchema: mongoose.Schema = new mongoose.Schema({
  admin: { type: Boolean, default: false },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

export const User: mongoose.Model<IUser> = mongoose.model('User', UserSchema);
