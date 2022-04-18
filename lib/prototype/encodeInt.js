'use strict';

const ToInteger = require('#abstract/ToInteger');
const BaseXEncodeInt = require('#abstract-functions/BaseXEncodeInt');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');

function encodeInt(integer) {
  RequireThisBaseX(this);
  const value = ToInteger(integer);
  return BaseXEncodeInt(this, value);
}

module.exports = encodeInt;
