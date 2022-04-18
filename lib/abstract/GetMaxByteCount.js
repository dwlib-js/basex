'use strict';

const MathCeil = require('#primordials/MathCeil');
const GetByteFactorOf = require('#internal/GetByteFactorOf');

const GetMaxByteCount = (instance, charCount) => {
  const factor = GetByteFactorOf(instance);
  return MathCeil(charCount * factor);
}

module.exports = GetMaxByteCount;
