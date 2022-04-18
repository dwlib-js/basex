'use strict';

const DecodeBytesIntoBreak = require('./DecodeBytesIntoBreak');
const DecodeBytesIntoIgnore = require('./DecodeBytesIntoIgnore');
const DecodeBytesIntoStrict = require('./DecodeBytesIntoStrict');

const DecodeBytesInto = (instance, string, destination, errorMode) => {
  const decodeInto = (
    errorMode === 'strict' ? DecodeBytesIntoStrict :
    errorMode === 'ignore' ? DecodeBytesIntoIgnore : DecodeBytesIntoBreak
  );
  return decodeInto(instance, string, destination);
}

module.exports = DecodeBytesInto;
