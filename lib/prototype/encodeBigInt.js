'use strict';

const ToBigInt = require('#abstract/ToBigInt');
const BaseXEncodeBigInt = require('#abstract-functions/BaseXEncodeBigInt');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');

function encodeBigInt(bigint) {
  RequireThisBaseX(this);
  const value = ToBigInt(bigint);
  return BaseXEncodeBigInt(this, value);
}

module.exports = encodeBigInt;
