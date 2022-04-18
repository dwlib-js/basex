import MathFloor from '#primordials/MathFloor';
import BaseXAlphabet from './BaseXAlphabet.mjs';

const BaseXEncodeInt = (instance, integer) => {
  const alphabet = BaseXAlphabet(instance);
  if (!integer) {
    return alphabet[0];
  }
  const base = alphabet.length;
  let string = '';
  let carry = integer < 0 ? -integer : integer;
  while (carry) {
    const charIndex = carry % base;
    const char = alphabet[charIndex];
    string = `${char}${string}`;
    carry = MathFloor(carry / base);
  }
  return string;
}

export default BaseXEncodeInt;
