'use strict';

const ToString = require('#abstract/ToString');
const BaseXValidate = require('#abstract-functions/BaseXValidate');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');

function validate(string) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  return BaseXValidate(this, chars);
}

module.exports = validate;
