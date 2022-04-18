'use strict';

const ToString = require('#abstract/ToString');
const BaseXDecodeBigInt = require('#abstract-functions/BaseXDecodeBigInt');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');
const ToErrorMode = require('#abstract-functions/ToErrorMode');

function decodeBigInt(string, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXDecodeBigInt(this, chars, mode);
}

module.exports = decodeBigInt;
