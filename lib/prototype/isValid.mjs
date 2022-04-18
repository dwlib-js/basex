import ToString from '#abstract/ToString';
import BaseXIsValid from '#abstract-functions/BaseXIsValid';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';

function isValid(string) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  return BaseXIsValid(this, chars);
}

export default isValid;
