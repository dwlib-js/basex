'use strict';

const BaseXValidate = require('./BaseXValidate');
const NormalizeStringBreak = require('./NormalizeStringBreak');
const NormalizeStringIgnore = require('./NormalizeStringIgnore');

const NormalizeString = (instance, string, errorMode) => {
  const normalize = (
    errorMode === 'strict' ? BaseXValidate :
    errorMode === 'ignore' ? NormalizeStringIgnore : NormalizeStringBreak
  );
  return normalize(instance, string);
}

module.exports = NormalizeString;
