import CryptoJS from 'crypto-js';
import { Tax } from '../interfaces/tax';

const SECRET_KEY = 'cmpe455secret!';

const fields: (keyof Tax)[] = [
  'socialInsurance',
  'generalHealthSystem',
  'incomeTax',
  'totalTaxAmount',
];

export const encrypt = (taxes: Tax): Tax => {
  fields.forEach((field) => {
    taxes[field] = CryptoJS.DES.encrypt(taxes[field], SECRET_KEY).toString();
  });

  return taxes;
};

export const decrypt = (taxes: Tax): Tax => {
  fields.forEach((field) => {
    taxes[field] = CryptoJS.DES.decrypt(taxes[field], SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    );
  });

  return taxes;
};
