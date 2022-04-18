'use strict';

const ToString = require('#abstract/ToString');
const BaseXDecodeInt = require('#abstract-functions/BaseXDecodeInt');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');
const ToErrorMode = require('#abstract-functions/ToErrorMode');

function decodeInt(string, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXDecodeInt(this, chars, mode);
}

module.exports = decodeInt;
