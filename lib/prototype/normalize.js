'use strict';

const ToString = require('#abstract/ToString');
const BaseXNormalize = require('#abstract-functions/BaseXNormalize');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');
const ToErrorMode = require('#abstract-functions/ToErrorMode');

function normalize(string, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXNormalize(this, chars, mode);
}

module.exports = normalize;
