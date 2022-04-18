import BaseXAlphabet from '#abstract-functions/BaseXAlphabet';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';

function alphabet() {
  RequireThisBaseX(this);
  return BaseXAlphabet(this);
}

export default alphabet;
