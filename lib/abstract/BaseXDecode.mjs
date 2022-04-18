import BaseXErrorMode from './BaseXErrorMode.mjs';
import DecodeBytes from './DecodeBytes.mjs';

const BaseXDecode = (instance, string, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return DecodeBytes(instance, string, mode);
}

export default BaseXDecode;
