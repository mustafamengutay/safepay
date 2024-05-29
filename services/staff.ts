import { CustomValidationError } from '../interfaces/error';

import Tax from '../models/tax';

import { encrypt } from '../utils/des';
import { privateKey, publicKey, signHashedData, xorHash } from '../utils/rsa';

import { calculateMonthlyNetSalary, calculateTaxes } from '../utils/tax';

export default class StaffService {
  listTaxes = async () => {
    const taxes = await Tax.find({ status: 'not calculated' }).populate(
      'userId'
    );

    return {
      message: 'All taxes were fetched!',
      list: taxes,
    };
  };

  calculateTaxes = async (userId: string) => {
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

    userTaxDetails.tax.socialInsurance = taxes.socialInsurance.toString();
    userTaxDetails.tax.generalHealthSystem =
      taxes.generalHealthSystem.toString();
    userTaxDetails.tax.incomeTax = taxes.incomeTax.toString();
    userTaxDetails.tax.totalTaxAmount = taxes.totalTaxAmount.toString();
    userTaxDetails.monthlyNetSalary = monthlyNetSalary.toString();
    userTaxDetails.status = 'unpaid';
    await userTaxDetails.save();

    const hashBuffer = xorHash(JSON.stringify(userTaxDetails.tax));
    const signature = signHashedData(hashBuffer, privateKey);

    return {
      message: 'Taxes calculated!',
      details: userTaxDetails,
    };
  };
}
