'use strict';

const GetInternalSlotOrThrow = require('#internal-slots/GetInternalSlotOrThrow');
const {
  $BaseXCharFactor
} = require('./');

const GetCharFactorOf = instance => GetInternalSlotOrThrow(instance, $BaseXCharFactor);

module.exports = GetCharFactorOf;
