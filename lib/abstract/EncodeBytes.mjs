import TypedArrayLength from '#primordials/TypedArrayLength';
import Uint8Array from '#primordials/Uint8Array';
import BaseXAlphabet from './BaseXAlphabet.mjs';
import GetMaxCharCount from './GetMaxCharCount.mjs';

const EncodeBytes = (instance, buffer) => {
  const alphabet = BaseXAlphabet(instance);
  const length = TypedArrayLength(buffer);
  const base = alphabet.length;
  const zeroChar = alphabet[0];
  let string = '';
  let index = 0;
  while (index < length && buffer[index] === 0) {
    string += zeroChar;
    index++;
  }
  if (index === length) {
    return string;
  }
  const maxCharCount = GetMaxCharCount(instance, length - index);
  const bytes = new Uint8Array(maxCharCount);
  const lastIndex = maxCharCount - 1;
  let offset = lastIndex;
  while (index < length) {
    let carry = buffer[index++];
    let j = lastIndex;
    while (carry || j >= offset) {
      const byte = bytes[j];
      carry += byte << 8;
      bytes[j--] = carry % base;
      carry = (carry / base) | 0;
    }
    offset = j + 1;
  }
  while (offset < maxCharCount) {
    const byte = bytes[offset++];
    string += alphabet[byte];
  }
  return string;
}

export default EncodeBytes;
