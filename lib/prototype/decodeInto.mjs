import TypeError from '#primordials/TypeError';
import IsUint8Array from '#types/isUint8Array';
import ToString from '#abstract/ToString';
import BaseXDecodeInto from '#abstract-functions/BaseXDecodeInto';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';
import ToErrorMode from '#abstract-functions/ToErrorMode';

function decodeInto(string, destination, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  if (!IsUint8Array(destination)) {
    throw new TypeError('destination is not an instance of Uint8Array');
  }
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXDecodeInto(this, chars, destination, mode);
}

export default decodeInto;
