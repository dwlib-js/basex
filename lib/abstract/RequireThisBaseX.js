'use strict';

const TypeError = require('#primordials/TypeError');
const IsBaseX = require('./IsBaseX');

const RequireThisBaseX = argument => {
  if (!IsBaseX(argument)) {
    throw new TypeError(`'this' is not an instance of BaseX`);
  }
}

module.exports = RequireThisBaseX;
