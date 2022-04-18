import ToString from '#abstract/ToString';
import BaseXNormalize from '#abstract-functions/BaseXNormalize';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';
import ToErrorMode from '#abstract-functions/ToErrorMode';

function normalize(string, errorMode) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  const mode = errorMode !== undefined ? ToErrorMode(errorMode) : undefined;
  return BaseXNormalize(this, chars, mode);
}

export default normalize;
