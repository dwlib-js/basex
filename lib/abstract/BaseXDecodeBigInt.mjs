import BaseXErrorMode from './BaseXErrorMode.mjs';
import DecodeBigInt from './DecodeBigInt.mjs';

const BaseXDecodeBigInt = (instance, string, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return DecodeBigInt(instance, string, mode);
}

export default BaseXDecodeBigInt;
