import { Schema, model, Types } from 'mongoose';

interface ITax {
  userId: Types.ObjectId;
  grossSalary: string;
  monthlyNetSalary: string;
  tax: {
    socialInsurance: string;
    generalHealthSystem: string;
    incomeTax: string;
    totalTaxAmount: string;
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
    type: String,
    default: '0',
  },
  monthlyNetSalary: {
    type: String,
    default: '0',
  },
  tax: {
    socialInsurance: {
      type: String,
      default: '0',
      required: true,
    },
    generalHealthSystem: {
      type: String,
      default: '0',
      required: true,
    },
    incomeTax: {
      type: String,
      default: '0',
      required: true,
    },
    totalTaxAmount: {
      type: String,
      default: '0',
      required: true,
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
