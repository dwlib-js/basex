'use strict';

const BaseXErrorMode = require('./BaseXErrorMode');
const DecodeBigInt = require('./DecodeBigInt');

const BaseXDecodeBigInt = (instance, string, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return DecodeBigInt(instance, string, mode);
}

module.exports = BaseXDecodeBigInt;
