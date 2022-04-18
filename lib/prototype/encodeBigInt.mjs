import ToBigInt from '#abstract/ToBigInt';
import BaseXEncodeBigInt from '#abstract-functions/BaseXEncodeBigInt';
import RequireThisBaseX from '#abstract-functions/RequireThisBaseX';

function encodeBigInt(bigint) {
  RequireThisBaseX(this);
  const value = ToBigInt(bigint);
  return BaseXEncodeBigInt(this, value);
}

export default encodeBigInt;
