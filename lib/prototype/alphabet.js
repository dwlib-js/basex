'use strict';

const BaseXAlphabet = require('#abstract-functions/BaseXAlphabet');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');

function alphabet() {
  RequireThisBaseX(this);
  return BaseXAlphabet(this);
}

module.exports = alphabet;
