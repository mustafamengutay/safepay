import { calculateMonthlyNetSalary } from '../utils/tax';

describe('calculateMonthlyNetSalary', () => {
  it('returns monthly net salary if gross salary and total tax are given', () => {
    expect(calculateMonthlyNetSalary(200, 50)).toBe(150);
    expect(calculateMonthlyNetSalary(1000, 200)).toBe(800);
  });

  it('returns monthly net salary if arguments are given as strings', () => {
    expect(calculateMonthlyNetSalary('200', 50)).toBe(150);
    expect(calculateMonthlyNetSalary(1000, '200')).toBe(800);
    expect(calculateMonthlyNetSalary('5000', '500')).toBe(4500);
  });

  it('returns default value if arguments are not given', () => {
    expect(calculateMonthlyNetSalary()).toBe(0);
  });

  it('returns gross salary if total tax is not given', () => {
    expect(calculateMonthlyNetSalary(1000)).toBe(1000);
  });

  it('handles negative values correctly', () => {
    expect(() => calculateMonthlyNetSalary(-200, 50)).toThrow();
    expect(() => calculateMonthlyNetSalary(200, -50)).toThrow();
    expect(() => calculateMonthlyNetSalary(-200, -50)).toThrow();
  });

  it('handles non-numeric strings gracefully', () => {
    expect(() => calculateMonthlyNetSalary('hello', 10)).toThrow();
    expect(() => calculateMonthlyNetSalary(1000, 'world')).toThrow();
  });
});
