import MapGet from '#primordials/MapGet';
import MapSize from '#primordials/MapSize';
import GetAlphabetLookupOf from '#internal/GetAlphabetLookupOf';

const DecodeIntBreak = (instance, string) => {
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  const base = MapSize(alphabetLookup);
  let integer = 0;
  for (let i = 0; i < length; i++) {
    const char = string[i];
    const charIndex = MapGet(alphabetLookup, char);
    if (charIndex === undefined) {
      break;
    }
    integer = integer * base + charIndex;
  }
  return integer;
}

export default DecodeIntBreak;
