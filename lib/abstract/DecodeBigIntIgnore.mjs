import BigInt from '#primordials/BigInt';
import MapGet from '#primordials/MapGet';
import MapSize from '#primordials/MapSize';
import GetAlphabetLookupOf from '#internal/GetAlphabetLookupOf';

const ZERO = BigInt(0);

const DecodeBigIntIgnore = (instance, string) => {
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  const base = MapSize(alphabetLookup);
  const baseBigInt = BigInt(base);
  let bigint = ZERO;
  for (let i = 0; i < length; i++) {
    const char = string[i];
    const charIndex = MapGet(alphabetLookup, char);
    if (charIndex !== undefined) {
      bigint = bigint * baseBigInt + BigInt(charIndex);
    }
  }
  return bigint;
}

export default DecodeBigIntIgnore;
