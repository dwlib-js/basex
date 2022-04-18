'use strict';

const MapHas = require('#primordials/MapHas');
const GetAlphabetLookupOf = require('#internal/GetAlphabetLookupOf');

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

module.exports = BaseXIsValid;
