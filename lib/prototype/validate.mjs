import ToString from '#abstract/ToString';
import BaseXValidate from '#abstract-functions/BaseXValidate';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';

function validate(string) {
  RequireThisBaseX(this);
  const chars = ToString(string);
  return BaseXValidate(this, chars);
}

export default validate;
