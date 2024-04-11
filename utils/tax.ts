import { Tax } from '../interfaces/tax';

/**
 *
 * @param {Number} grossSalary salary which is used to calculate taxes.
 * @returns An object contains some taxes and net salary.
 */
export const calculateTaxes = (grossSalary: number): Tax => {
  const socialInsurance = (grossSalary * 8.8) / 100;
  const generalHealthSystem = (grossSalary * 2.65) / 100;
  const incomeTax = (grossSalary * 4) / 100;

  const totalTaxAmount = socialInsurance + generalHealthSystem + incomeTax;

  return {
    socialInsurance: Number(socialInsurance.toFixed(2)),
    generalHealthSystem: Number(generalHealthSystem.toFixed(2)),
    incomeTax: Number(incomeTax.toFixed(2)),
    totalTaxAmount: Number(totalTaxAmount.toFixed(2)),
  };
};

/**
 *
 * @param {Number} grossSalary user's gross salary
 * @param {Number} totalTax user's amount of total tax.
 * @returns monthly net salary based on gross salary and total tax.
 */
export const calculateMonthlyNetSalary = (
  grossSalary: number,
  totalTax: number
): number => {
  const monthlyNetSalary = grossSalary - totalTax;
  return Number(monthlyNetSalary.toFixed(2));
};
