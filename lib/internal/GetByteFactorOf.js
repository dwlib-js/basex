'use strict';

const GetInternalSlotOrThrow = require('#internal-slots/GetInternalSlotOrThrow');
const {
  $BaseXByteFactor
} = require('./');

const GetByteFactorOf = instance => GetInternalSlotOrThrow(instance, $BaseXByteFactor);

module.exports = GetByteFactorOf;
