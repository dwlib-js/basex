import ToString from '#abstract/ToString';
import BaseXDecodeBigInt from '#abstract-functions/BaseXDecodeBigInt';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';
import ToErrorMode from '#abstract-functions/ToErrorMode';

function decodeBigInt(string, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXDecodeBigInt(this, chars, mode);
}

export default decodeBigInt;
