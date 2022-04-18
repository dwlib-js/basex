import RangeError from '#primordials/RangeError';

const ThrowInvalidCharacterError = index => {
  throw new RangeError(`Invalid BaseX character at index ${index}`);
}

export default ThrowInvalidCharacterError;
