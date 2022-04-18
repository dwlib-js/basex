'use strict';

const ToString = require('#abstract/ToString');
const BaseXIsValid = require('#abstract-functions/BaseXIsValid');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');

function isValid(string) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  return BaseXIsValid(this, chars);
}

module.exports = isValid;
