'use strict';

const BaseXErrorMode = require('./BaseXErrorMode');
const DecodeBytes = require('./DecodeBytes');

const BaseXDecode = (instance, string, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return DecodeBytes(instance, string, mode);
}

module.exports = BaseXDecode;
