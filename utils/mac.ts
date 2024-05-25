import crypto from 'crypto';

/**
 *
 * @param data Any kind of data.
 * @param secretKey It is a secret key which is used to generate a HMAC.
 * @returns HMAC
 */
export const generateHmacSHA256 = (data: any, secretKey: string): string => {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(data);

  return hmac.digest('hex');
};

/**
 *
 * @param data Any kind of data.
 * @param receivedMac A generated HMAC value.
 * @param secretKey It is a secret key which is used to verify the data.
 * @returns True if it is verified, otherwise returns false.
 */
export const verifyHmacSHA256 = (
  data: any,
  receivedMac: string,
  secretKey: string
): boolean => {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(data);
  const calculatedMac = hmac.digest('hex');

  return calculatedMac === receivedMac;
};
