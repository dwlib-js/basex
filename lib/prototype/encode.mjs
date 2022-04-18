import BaseXEncode from '#abstract-functions/BaseXEncode';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';

function encode(input) {
  RequireThisBaseX(this);
  return BaseXEncode(this, input);
}

export default encode;
