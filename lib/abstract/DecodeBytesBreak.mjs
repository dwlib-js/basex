import MapGet from '#primordials/MapGet';
import Uint8Array from '#primordials/Uint8Array';
import GetAlphabetLookupOf from '#internal/GetAlphabetLookupOf';
import BaseXAlphabet from './BaseXAlphabet.mjs';
import GetMaxByteCount from './GetMaxByteCount.mjs';

const DecodeBytesBreak = (instance, string) => {
  const alphabet = BaseXAlphabet(instance);
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  const base = alphabet.length;
  const zeroChar = alphabet[0];
  let index = 0;
  while (index < length && string[index] === zeroChar) {
    index++;
  }
  if (index === length) {
    return new Uint8Array(length);
  }
  let bufferIndex = index;
  const maxByteCount = GetMaxByteCount(instance, length - index);
  const bytes = new Uint8Array(maxByteCount);
  const lastIndex = maxByteCount - 1;
  let offset = lastIndex;
  while (index < length) {
    const char = string[index];
    let carry = MapGet(alphabetLookup, char);
    if (carry === undefined) {
      if (index === bufferIndex) {
        offset++;
      }
      break;
    }
    let j = lastIndex;
    while (carry || j >= offset) {
      const byte = bytes[j];
      carry += byte * base;
      bytes[j--] = carry & 0xff;
      carry >>= 8;
    }
    offset = j + 1;
    index++;
  }
  const byteCount = maxByteCount - offset + bufferIndex;
  const buffer = new Uint8Array(byteCount);
  while (offset < maxByteCount) {
    buffer[bufferIndex++] = bytes[offset++];
  }
  return buffer;
}

export default DecodeBytesBreak;
