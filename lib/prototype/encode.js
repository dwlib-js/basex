'use strict';

const BaseXEncode = require('#abstract-functions/BaseXEncode');
const RequireThisBaseX = require('#abstract-functions/RequireThisBaseX');

function encode(input) {
  RequireThisBaseX(this);
  return BaseXEncode(this, input);
}

module.exports = encode;
