import { Schema, model, Types } from 'mongoose';

interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  tax: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      required: true,
    },
    tax: {
      type: Schema.Types.ObjectId,
      ref: 'Tax',
    },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;
