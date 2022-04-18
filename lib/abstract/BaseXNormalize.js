'use strict';

const BaseXErrorMode = require('./BaseXErrorMode');
const NormalizeString = require('./NormalizeString');

const BaseXNormalize = (instance, string, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return NormalizeString(instance, string, mode);
}

module.exports = BaseXNormalize;
