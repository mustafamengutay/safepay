import { CustomValidationError } from '../interfaces/error';

import Tax from '../models/tax';
import { encrypt } from '../utils/des';

import { calculateMonthlyNetSalary, calculateTaxes } from '../utils/tax';

export const listTaxes = async () => {
  const taxes = await Tax.find({ status: 'not calculated' });

  return {
    message: 'All taxes were fetched!',
    list: taxes,
  };
};

export const calculateTaxesService = async (userId: string) => {
  const userTaxDetails = await Tax.findOne({ userId });
  if (!userTaxDetails) {
    throw new CustomValidationError(404, "User's tax were not found.");
  }

  if (userTaxDetails.status === 'unpaid') {
    return {
      message: 'Taxes have already been calculated!',
      details: userTaxDetails,
    };
  }

  let taxes = calculateTaxes(userTaxDetails.grossSalary);
  const monthlyNetSalary = calculateMonthlyNetSalary(
    userTaxDetails.grossSalary,
    taxes.totalTaxAmount
  );

  taxes = encrypt(taxes);

  // TODO: Apply the DES algorithm
  userTaxDetails.tax.socialInsurance = taxes.socialInsurance.toString();
  userTaxDetails.tax.generalHealthSystem = taxes.generalHealthSystem.toString();
  userTaxDetails.tax.incomeTax = taxes.incomeTax.toString();
  userTaxDetails.tax.totalTaxAmount = taxes.totalTaxAmount.toString();
  userTaxDetails.monthlyNetSalary = monthlyNetSalary.toString();
  userTaxDetails.status = 'unpaid';
  await userTaxDetails.save();

  return {
    message: 'Taxes calculated!',
    details: userTaxDetails,
  };
};
