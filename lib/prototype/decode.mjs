import ToString from '#abstract/ToString';
import BaseXDecode from '#abstract-functions/BaseXDecode';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';
import ToErrorMode from '#abstract-functions/ToErrorMode';

function decode(string, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXDecode(this, chars, mode);
}

export default decode;
