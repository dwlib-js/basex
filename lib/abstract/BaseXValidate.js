'use strict';

const MapHas = require('#primordials/MapHas');
const GetAlphabetLookupOf = require('#internal/GetAlphabetLookupOf');
const ThrowInvalidCharacterError = require('./ThrowInvalidCharacterError');

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

module.exports = BaseXValidate;
