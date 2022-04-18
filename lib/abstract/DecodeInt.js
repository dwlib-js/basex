'use strict';

const DecodeIntBreak = require('./DecodeIntBreak');
const DecodeIntIgnore = require('./DecodeIntIgnore');
const DecodeIntStrict = require('./DecodeIntStrict');

const DecodeInt = (instance, string, errorMode) => {
  const decodeInt = (
    errorMode === 'strict' ? DecodeIntStrict :
    errorMode === 'ignore' ? DecodeIntIgnore : DecodeIntBreak
  );
  return decodeInt(instance, string);
}

module.exports = DecodeInt;
