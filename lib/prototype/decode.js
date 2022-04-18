'use strict';

const ToString = require('#abstract/ToString');
const BaseXDecode = require('#abstract-functions/BaseXDecode');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');
const ToErrorMode = require('#abstract-functions/ToErrorMode');

function decode(string, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXDecode(this, chars, mode);
}

module.exports = decode;
