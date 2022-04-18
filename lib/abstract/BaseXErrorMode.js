'use strict';

const GetInternalSlotOrThrow = require('#internal-slots/GetInternalSlotOrThrow');
const {
  $BaseXErrorMode
} = require('#internal');

const BaseXErrorMode = instance => GetInternalSlotOrThrow(instance, $BaseXErrorMode);

module.exports = BaseXErrorMode;
