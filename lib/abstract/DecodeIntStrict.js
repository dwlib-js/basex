'use strict';

const MapGet = require('#primordials/MapGet');
const MapSize = require('#primordials/MapSize');
const GetAlphabetLookupOf = require('#internal/GetAlphabetLookupOf');
const ThrowInvalidCharacterError = require('./ThrowInvalidCharacterError');

const DecodeIntStrict = (instance, string) => {
  const alphabetLookup = GetAlphabetLookupOf(instance);
  const length = string.length;
  const base = MapSize(alphabetLookup);
  let integer = 0;
  for (let i = 0; i < length; i++) {
    const char = string[i];
    const charIndex = MapGet(alphabetLookup, char);
    if (charIndex === undefined) {
      ThrowInvalidCharacterError(i);
    }
    integer = integer * base + charIndex;
  }
  return integer;
}

module.exports = DecodeIntStrict;
