import ToString from '#abstract/ToString';
import BaseXDecodeInt from '#abstract-functions/BaseXDecodeInt';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';
import ToErrorMode from '#abstract-functions/ToErrorMode';

function decodeInt(string, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXDecodeInt(this, chars, mode);
}

export default decodeInt;
