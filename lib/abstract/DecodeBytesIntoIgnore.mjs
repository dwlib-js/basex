import MapGet from '#primordials/MapGet';
import MapHas from '#primordials/MapHas';
import TypedArrayLength from '#primordials/TypedArrayLength';
import Uint8Array from '#primordials/Uint8Array';
import GetAlphabetLookupOf from '#internal/GetAlphabetLookupOf';
import BaseXAlphabet from './BaseXAlphabet.mjs';
import GetMaxByteCount from './GetMaxByteCount.mjs';

const DecodeBytesIntoIgnore = (instance, string, destination) => {
  const alphabet = BaseXAlphabet(instance);
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  const destinationLength = TypedArrayLength(destination);
  const base = alphabet.length;
  const zeroChar = alphabet[0];
  let index = 0;
  let destinationIndex = 0;
  let leadingZeros = 0;
  while (index < length) {
    const char = string[index];
    if (char === zeroChar) {
      leadingZeros++;
    } else if (MapHas(alphabetLookup, char)) {
      break;
    }
    index++;
  }
  if (index === length) {
    while (destinationIndex < leadingZeros && destinationIndex < destinationLength) {
      destination[destinationIndex++] = 0;
    }
    return {
      read: index,
      decoded: leadingZeros,
      written: destinationIndex
    };
  }
  const maxByteCount = GetMaxByteCount(instance, length - leadingZeros);
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
  const byteCount = maxByteCount - offset + leadingZeros;
  while (destinationIndex < leadingZeros && destinationIndex < destinationLength) {
    destination[destinationIndex++] = 0;
  }
  while (offset < maxByteCount && destinationIndex < destinationLength) {
    destination[destinationIndex++] = bytes[offset++];
  }
  return {
    read: index,
    decoded: byteCount,
    written: destinationIndex
  };
}

export default DecodeBytesIntoIgnore;
