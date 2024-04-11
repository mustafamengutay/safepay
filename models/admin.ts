import { Schema, model } from 'mongoose';

interface IAdmin {
  email: string;
  password: string;
  role: string;
}

const adminSchema = new Schema<IAdmin>(
  {
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
      default: 'admin',
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;
