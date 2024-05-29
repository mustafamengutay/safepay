import { generateKeyPairSync, createSign, createVerify } from 'crypto';

export const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
});

/**
 *
 * @param data Any data which will be hashed by XOR.
 * @returns A buffer which is a hash value.
 */
export const xorHash = (data: any) => {
  const buffer = Buffer.from(data);
  let hash = 0;

  for (let i = 0; i < buffer.length; i++) {
    hash ^= buffer[i];
  }

  // Limit hash to 48 bits
  return Buffer.from([
    (hash >> 40) & 0xff,
    (hash >> 32) & 0xff,
    (hash >> 24) & 0xff,
    (hash >> 16) & 0xff,
    (hash >> 8) & 0xff,
    hash & 0xff,
  ]);
};

/**
 *
 * @param hashedData Any hashed data
 * @param privateKey RSA private key
 * @returns signed data
 */
export const signHashedData = (hashedData: any, privateKey: string): string => {
  const sign = createSign('RSA-SHA256');
  sign.update(hashedData);
  sign.end();

  return sign.sign(privateKey, 'hex');
};

/**
 * Verify given hashed data using signature which is created using the `RSA-SHA256` algorithm.
 * @param hashedData Any hashed data
 * @param signature
 * @returns True if data is verified, otherwise, returns false.
 */
export const verifySignedData = (hashedData: any, signature: string) => {
  const verify = createVerify('RSA-SHA256');
  verify.update(hashedData);
  verify.end();

  return verify.verify(publicKey, signature, 'hex');
};
