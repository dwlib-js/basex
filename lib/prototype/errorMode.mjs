import BaseXErrorMode from '#abstract-functions/BaseXErrorMode';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';

function errorMode() {
  RequireThisBaseX(this);
  return BaseXErrorMode(this);
}

export default errorMode;
