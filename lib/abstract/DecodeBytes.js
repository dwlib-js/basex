'use strict';

const DecodeBytesBreak = require('./DecodeBytesBreak');
const DecodeBytesIgnore = require('./DecodeBytesIgnore');
const DecodeBytesStrict = require('./DecodeBytesStrict');

const DecodeBytes = (instance, string, errorMode) => {
  const decode = (
    errorMode === 'strict' ? DecodeBytesStrict :
    errorMode === 'ignore' ? DecodeBytesIgnore : DecodeBytesBreak
  );
  return decode(instance, string);
}

module.exports = DecodeBytes;
