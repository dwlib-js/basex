'use strict';

const GetInternalSlotOrThrow = require('#internal-slots/GetInternalSlotOrThrow');
const {
  $BaseXAlphabetLookup
} = require('./');

const GetAlphabetLookupOf = instance => GetInternalSlotOrThrow(instance, $BaseXAlphabetLookup);

module.exports = GetAlphabetLookupOf;
