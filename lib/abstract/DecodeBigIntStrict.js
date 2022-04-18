'use strict';

const BigInt = require('#primordials/BigInt');
const MapGet = require('#primordials/MapGet');
const MapSize = require('#primordials/MapSize');
const GetAlphabetLookupOf = require('#internal/GetAlphabetLookupOf');
const ThrowInvalidCharacterError = require('./ThrowInvalidCharacterError');

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

module.exports = DecodeBigIntStrict;
