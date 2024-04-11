import { Schema, model } from 'mongoose';

interface IStaff {
  email: string;
  password: string;
  role: string;
}

const staffSchema = new Schema<IStaff>(
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
      default: 'staff',
      required: true,
    },
  },
  { timestamps: true }
);

const Staff = model<IStaff>('Staff', staffSchema);

export default Staff;
