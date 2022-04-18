import BaseXErrorMode from './BaseXErrorMode.mjs';
import DecodeBytesInto from './DecodeBytesInto.mjs';

const BaseXDecodeInto = (instance, string, destination, errorMode) => {
  const mode = errorMode === undefined ? BaseXErrorMode(instance) : errorMode;
  return DecodeBytesInto(instance, string, destination, mode);
}

export default BaseXDecodeInto;
