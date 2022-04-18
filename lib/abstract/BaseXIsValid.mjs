import MapHas from '#primordials/MapHas';
import GetAlphabetLookupOf from '#internal/GetAlphabetLookupOf';

const BaseXIsValid = (instance, string) => {
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  for (let i = 0; i < length; i++) {
    const char = string[i];
    if (!MapHas(alphabetLookup, char)) {
      return false;
    }
  }
  return true;
}

export default BaseXIsValid;
