'use strict';

const BaseXErrorMode = require('./BaseXErrorMode');
const DecodeInt = require('./DecodeInt');

const BaseXDecodeInt = (instance, string, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return DecodeInt(instance, string, mode);
}

module.exports = BaseXDecodeInt;
