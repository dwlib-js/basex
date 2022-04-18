'use strict';

const BaseXErrorMode = require('#abstract-functions/BaseXErrorMode');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');

function errorMode() {
  RequireThisBaseX(this);
  return BaseXErrorMode(this);
}

module.exports = errorMode;
