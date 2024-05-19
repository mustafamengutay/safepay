import { CustomValidationError } from '../interfaces/error';

import Tax from '../models/tax';
import { decrypt } from '../utils/des';

export const updateUserGrossSalaryService = async (
  userId: string,
  grossSalary: number
) => {
  const userTaxDetails = await Tax.findOne({ userId });
  if (!userTaxDetails) {
    throw new CustomValidationError(
      404,
      "User's taxes were not found. Please make sure the user ID is correct."
    );
  }

  // TODO: Apply the DES algorithm
  userTaxDetails.grossSalary = grossSalary.toString();
  userTaxDetails.tax.socialInsurance = '0';
  userTaxDetails.tax.generalHealthSystem = '0';
  userTaxDetails.tax.incomeTax = '0';
  userTaxDetails.tax.totalTaxAmount = '0';
  userTaxDetails.monthlyNetSalary = '0';
  userTaxDetails.status = 'not calculated';

  return await userTaxDetails.save();
};

export const getTaxesService = async (userId: string) => {
  const userTaxDetails = await Tax.findOne({ userId });
  if (!userTaxDetails) {
    throw new CustomValidationError(404, "User's taxes were not found.");
  }

  if (userTaxDetails.status === 'not calculated') {
    return { message: 'Your taxes have not been calculated yet.' };
  } else if (userTaxDetails.status === 'paid') {
    return { message: 'You have already paid your taxes.' };
  }

  return {
    message: `User's taxes were fetched successfully!`,
    status: userTaxDetails.status,
    taxes: decrypt(userTaxDetails.tax),
  };
};

export const payTaxesService = async (userId: string, amount: number) => {
  const userTaxDetails = await Tax.findOne({ userId });
  if (!userTaxDetails) {
    throw new CustomValidationError(404, "User's taxes were not found.");
  }

  if (userTaxDetails.status === 'not calculated') {
    throw new CustomValidationError(
      404,
      'Your taxes have not been calculated yet.'
    );
  }
  if (amount < Number(userTaxDetails.tax.totalTaxAmount)) {
    throw new CustomValidationError(
      404,
      'You do not have enough money to pay your taxes!'
    );
  } else if (amount > Number(userTaxDetails.tax.totalTaxAmount)) {
    throw new CustomValidationError(404, 'You entered more than your tax fee.');
  } else if (amount === 0) {
    throw new CustomValidationError(404, 'You tried to pay 0 Euros.');
  }

  userTaxDetails.tax.totalTaxAmount = String(
    Number(userTaxDetails.tax.totalTaxAmount) - amount
  );
  userTaxDetails.tax.socialInsurance = '0';
  userTaxDetails.tax.generalHealthSystem = '0';
  userTaxDetails.tax.incomeTax = '0';
  userTaxDetails.monthlyNetSalary = '0';
  userTaxDetails.status = 'paid';

  return await userTaxDetails.save();
};
