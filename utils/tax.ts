import { Tax } from '../interfaces/tax';

/**
 *
 * @param {Number} grossSalary salary which is used to calculate taxes.
 * @returns An object contains some taxes and net salary.
 */
export const calculateTaxes = (grossSalary: number | string): Tax => {
  if (typeof grossSalary === 'string') {
    grossSalary = Number(grossSalary);
  }

  var socialInsurance = (grossSalary * 8.8) / 100;
  var generalHealthSystem = (grossSalary * 2.65) / 100;
  var incomeTax = (grossSalary * 4) / 100;

  var totalTaxAmount = socialInsurance + generalHealthSystem + incomeTax;

  return {
    socialInsurance: String(socialInsurance.toFixed(2)),
    generalHealthSystem: String(generalHealthSystem.toFixed(2)),
    incomeTax: String(incomeTax.toFixed(2)),
    totalTaxAmount: String(totalTaxAmount.toFixed(2)),
  };
};

/**
 *
 * @param {Number} grossSalary user's gross salary
 * @param {Number} totalTax user's amount of total tax.
 * @returns monthly net salary based on gross salary and total tax.
 */
export const calculateMonthlyNetSalary = (
  grossSalary: number | string = 0,
  totalTax: number | string = 0
): number => {
  grossSalary = Number(grossSalary);
  totalTax = Number(totalTax);

  if (Number.isNaN(grossSalary) || Number.isNaN(totalTax)) {
    throw new Error('both grossSalary and totalTax must be numeric values');
  }

  if (grossSalary < 0 || totalTax < 0) {
    throw new Error('the argument can not be a negative');
  }

  const monthlyNetSalary = grossSalary - totalTax;
  return Number(monthlyNetSalary.toFixed(2));
};
