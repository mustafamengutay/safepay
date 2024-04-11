import { Schema, model, Types } from 'mongoose';

interface ITax {
  userId: Types.ObjectId;
  grossSalary: number;
  monthlyNetSalary: number;
  tax: {
    socialInsurance: number;
    generalHealthSystem: number;
    incomeTax: number;
    totalTaxAmount: number;
  };
  status: string;
}

const taxSchema = new Schema<ITax>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  grossSalary: {
    type: Number,
    default: 0,
    min: 0,
  },
  monthlyNetSalary: {
    type: Number,
    default: 0,
    min: 0,
  },
  tax: {
    socialInsurance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    generalHealthSystem: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    incomeTax: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalTaxAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  status: {
    type: String,
    default: 'not calculated',
    required: true,
  },
});

const Tax = model<ITax>('Tax', taxSchema);

export default Tax;
