/**
 * 
 * @param {Number} grossSalary salary which is used to calculate taxes.
 * @returns An object contains some taxes and net salary.
 */
const calculate = (grossSalary) => {
    const socialInsurance = (grossSalary * 8.8) / 100;
    const generalHealthSystem = (grossSalary * 2.65) / 100;
    const monthlyTax = (grossSalary * 4) / 100;

    const totalTax = socialInsurance + generalHealthSystem + monthlyTax;
    const monthlyNetSalary = grossSalary - totalTax;

    return {
        socialInsurance: socialInsurance.toFixed(2),
        generalHealthSystem: generalHealthSystem.toFixed(2),
        totalTax: totalTax.toFixed(2),
        monthlyNetSalary: monthlyNetSalary.toFixed(2),
    };
};


/**
 * 
 * @param {Object} taxes contains socialInsurance, generalHealthSystem, and monthlyTax
 *  which is used to update user's taxes.
 * @returns An object contains total tax and net salary.
 */
const update = (taxes) => {
    const totalTax = taxes.socialInsurance + taxes.generalHealthSystem + taxes.monthlyTax;
    const monthlyNetSalary = taxes.grossSalary - totalTax;

    return {
        totalTax: Number(totalTax).toFixed(2),
        monthlyNetSalary: monthlyNetSalary.toFixed(2),
    };
};

module.exports = {
    calculate,
    update,
};