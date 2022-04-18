import BaseXErrorMode from './BaseXErrorMode.mjs';
import DecodeInt from './DecodeInt.mjs';

const BaseXDecodeInt = (instance, string, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return DecodeInt(instance, string, mode);
}

export default BaseXDecodeInt;
