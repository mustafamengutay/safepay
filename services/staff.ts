import { CustomValidationError } from '../interfaces/error';

import Tax from '../models/tax';

import { calculateMonthlyNetSalary, calculateTaxes } from '../utils/tax';

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

  const taxes = calculateTaxes(userTaxDetails.grossSalary);
  const monthlyNetSalary = calculateMonthlyNetSalary(
    userTaxDetails.grossSalary,
    taxes.totalTaxAmount
  );

  // TODO: Apply the DES algorithm
  userTaxDetails.tax.socialInsurance = taxes.socialInsurance;
  userTaxDetails.tax.generalHealthSystem = taxes.generalHealthSystem;
  userTaxDetails.tax.incomeTax = taxes.incomeTax;
  userTaxDetails.tax.totalTaxAmount = taxes.totalTaxAmount;
  userTaxDetails.monthlyNetSalary = monthlyNetSalary;
  userTaxDetails.status = 'unpaid';
  await userTaxDetails.save();

  return {
    message: 'Taxes calculated!',
    details: userTaxDetails,
  };
};
