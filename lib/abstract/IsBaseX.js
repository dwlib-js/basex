'use strict';

const HasInternalSlot = require('#internal-slots/HasInternalSlot');
const {
  $BaseXAlphabet
} = require('#internal');

const IsBaseX = argument => HasInternalSlot(argument, $BaseXAlphabet);

module.exports = IsBaseX;
