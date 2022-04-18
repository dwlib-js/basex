'use strict';

const GetInternalSlotOrThrow = require('#internal-slots/GetInternalSlotOrThrow');
const {
  $BaseXAlphabet
} = require('#internal');

const BaseXAlphabet = instance => GetInternalSlotOrThrow(instance, $BaseXAlphabet);

module.exports = BaseXAlphabet;
