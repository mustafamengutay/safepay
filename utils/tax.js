/**
 * 
 * @param {Number} grossSalary salary which is used to calculate taxes.
 * @returns An object contains some taxes and net salary.
 */
const calculateTaxes = (grossSalary) => {
    const socialInsurance = (grossSalary * 8.8) / 100;
    const generalHealthSystem = (grossSalary * 2.65) / 100;
    const incomeTax = (grossSalary * 4) / 100;

    const totalTaxAmount = socialInsurance + generalHealthSystem + incomeTax;

    return {
        socialInsurance: socialInsurance.toFixed(2),
        generalHealthSystem: generalHealthSystem.toFixed(2),
        incomeTax: incomeTax.toFixed(2),
        totalTaxAmount: totalTaxAmount.toFixed(2),
    };
};

/**
 * 
 * @param {Number} grossSalary user's gross salary
 * @param {Number} totalTax user's amount of total tax.
 * @returns monthly net salary based on gross salary and total tax.
 */
const calculateMonthlyNetSalary = (grossSalary, totalTax) => {
    const monthlyNetSalary = grossSalary - totalTax;
    return monthlyNetSalary.toFixed(2);
};

module.exports = {
    calculateTaxes,
    calculateMonthlyNetSalary,
};