import BigInt from '#primordials/BigInt';
import BaseXAlphabet from './BaseXAlphabet.mjs';

const ZERO = BigInt(0);

const BaseXEncodeBigInt = (instance, bigint) => {
  const alphabet = BaseXAlphabet(instance);
  if (!bigint) {
    return alphabet[0];
  }
  const base = alphabet.length;
  const baseBigInt = BigInt(base);
  let string = '';
  let carry = bigint < ZERO ? -bigint : bigint;
  while (carry) {
    const charIndex = carry % baseBigInt;
    const char = alphabet[charIndex];
    string = `${char}${string}`;
    carry /= baseBigInt;
  }
  return string;
}

export default BaseXEncodeBigInt;
