'use strict';

const TypeError = require('#primordials/TypeError');
const IsUint8Array = require('#types/isUint8Array');
const ToString = require('#abstract/ToString');
const BaseXDecodeInto = require('#abstract-functions/BaseXDecodeInto');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');
const ToErrorMode = require('#abstract-functions/ToErrorMode');

function decodeInto(string, destination, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  if (!IsUint8Array(destination)) {
    throw new TypeError('destination is not an instance of Uint8Array');
  }
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXDecodeInto(this, chars, destination, mode);
}

module.exports = decodeInto;
