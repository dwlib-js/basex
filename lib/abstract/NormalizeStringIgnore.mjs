import MapHas from '#primordials/MapHas';
import GetAlphabetLookupOf from '#internal/GetAlphabetLookupOf';

const NormalizeStringIgnore = (instance, string) => {
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  let normalized = '';
  for (let i = 0; i < length; i++) {
    const char = string[i];
    if (MapHas(alphabetLookup, char)) {
      normalized += char;
    }
  }
  return normalized;
}

export default NormalizeStringIgnore;
