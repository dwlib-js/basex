'use strict';

const DecodeBigIntBreak = require('./DecodeBigIntBreak');
const DecodeBigIntIgnore = require('./DecodeBigIntIgnore');
const DecodeBigIntStrict = require('./DecodeBigIntStrict');

const DecodeBigInt = (instance, string, errorMode) => {
  const decodeBigInt = (
    errorMode === 'strict' ? DecodeBigIntStrict :
    errorMode === 'ignore' ? DecodeBigIntIgnore : DecodeBigIntBreak
  );
  return decodeBigInt(instance, string);
}

module.exports = DecodeBigInt;
