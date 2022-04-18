'use strict';

const BaseXErrorMode = require('./BaseXErrorMode');
const DecodeBytesInto = require('./DecodeBytesInto');

const BaseXDecodeInto = (instance, string, destination, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return DecodeBytesInto(instance, string, destination, mode);
}

module.exports = BaseXDecodeInto;
