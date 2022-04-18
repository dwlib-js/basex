import MapHas from '#primordials/MapHas';
import GetAlphabetLookupOf from '#internal/GetAlphabetLookupOf';
import ThrowInvalidCharacterError from './ThrowInvalidCharacterError.mjs';

const BaseXValidate = (instance, string) => {
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  for (let i = 0; i < length; i++) {
    const char = string[i];
    if (!MapHas(alphabetLookup, char)) {
      ThrowInvalidCharacterError(i);
    }
  }
  return string;
}

export default BaseXValidate;
