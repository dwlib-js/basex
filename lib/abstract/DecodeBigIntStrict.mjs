import BigInt from '#primordials/BigInt';
import MapGet from '#primordials/MapGet';
import MapSize from '#primordials/MapSize';
import GetAlphabetLookupOf from '#internal/GetAlphabetLookupOf';
import ThrowInvalidCharacterError from './ThrowInvalidCharacterError.mjs';

const ZERO = BigInt(0);

const DecodeBigIntStrict = (instance, string) => {
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  const base = MapSize(alphabetLookup);
  const baseBigInt = BigInt(base);
  let bigint = ZERO;
  for (let i = 0; i < length; i++) {
    const char = string[i];
    const charIndex = MapGet(alphabetLookup, char);
    if (charIndex === undefined) {
      ThrowInvalidCharacterError(i);
    }
    bigint = bigint * baseBigInt + BigInt(charIndex);
  }
  return bigint;
}

export default DecodeBigIntStrict;
