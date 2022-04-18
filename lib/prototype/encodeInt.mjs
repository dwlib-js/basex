import ToInteger from '#abstract/ToInteger';
import BaseXEncodeInt from '#abstract-functions/BaseXEncodeInt';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';

function encodeInt(integer) {
  RequireThisBaseX(this);
  const value = ToInteger(integer);
  return BaseXEncodeInt(this, value);
}

export default encodeInt;
