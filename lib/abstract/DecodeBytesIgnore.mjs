import MapGet from '#primordials/MapGet';
import MapHas from '#primordials/MapHas';
import Uint8Array from '#primordials/Uint8Array';
import GetAlphabetLookupOf from '#internal/GetAlphabetLookupOf';
import BaseXAlphabet from './BaseXAlphabet.mjs';
import GetMaxByteCount from './GetMaxByteCount.mjs';

const DecodeBytesIgnore = (instance, string) => {
  const alphabet = BaseXAlphabet(instance);
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  const base = alphabet.length;
  const zeroChar = alphabet[0];
  let index = 0;
  let bufferIndex = 0;
  while (index < length) {
    const char = string[index];
    if (char === zeroChar) {
      bufferIndex++;
    } else if (MapHas(alphabetLookup, char)) {
      break;
    }
    index++;
  }
  if (index === length) {
    return new Uint8Array(bufferIndex);
  }
  const maxByteCount = GetMaxByteCount(instance, length - bufferIndex);
  const bytes = new Uint8Array(maxByteCount);
  const lastIndex = maxByteCount - 1;
  let offset = lastIndex;
  while (index < length) {
    const char = string[index++];
    let carry = MapGet(alphabetLookup, char);
    if (carry !== undefined) {
      let j = lastIndex;
      while (carry || j >= offset) {
        const byte = bytes[j];
        carry += byte * base;
        bytes[j--] = carry & 0xff;
        carry >>= 8;
      }
      offset = j + 1;
    }
  }
  const byteCount = maxByteCount - offset + bufferIndex;
  const buffer = new Uint8Array(byteCount);
  while (offset < maxByteCount) {
    buffer[bufferIndex++] = bytes[offset++];
  }
  return buffer;
}

export default DecodeBytesIgnore;
