import BaseXErrorMode from './BaseXErrorMode.mjs';
import NormalizeString from './NormalizeString.mjs';

const BaseXNormalize = (instance, string, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return NormalizeString(instance, string, mode);
}

export default BaseXNormalize;
