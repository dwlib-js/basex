'use strict';

const MathCeil = require('#primordials/MathCeil');
const GetCharFactorOf = require('#internal/GetCharFactorOf');

const GetMaxCharCount = (instance, byteCount) => {
  const factor = GetCharFactorOf(instance);
  return MathCeil(byteCount * factor);
}

module.exports = GetMaxCharCount;
