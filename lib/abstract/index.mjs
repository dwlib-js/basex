import HasIntrinsic from '#intrinsics/HasIntrinsic';
import BaseXAlphabet from './BaseXAlphabet.mjs';
import BaseXDecode from './BaseXDecode.mjs';
import BaseXDecodeInt from './BaseXDecodeInt.mjs';
import BaseXDecodeInto from './BaseXDecodeInto.mjs';
import BaseXEncode from './BaseXEncode.mjs';
import BaseXEncodeInt from './BaseXEncodeInt.mjs';
import BaseXErrorMode from './BaseXErrorMode.mjs';
import BaseXIsValid from './BaseXIsValid.mjs';
import BaseXNormalize from './BaseXNormalize.mjs';
import BaseXValidate from './BaseXValidate.mjs';
import DecodeBytes from './DecodeBytes.mjs';
import DecodeBytesBreak from './DecodeBytesBreak.mjs';
import DecodeBytesIgnore from './DecodeBytesIgnore.mjs';
import DecodeBytesStrict from './DecodeBytesStrict.mjs';
import DecodeBytesInto from './DecodeBytesInto.mjs';
import DecodeBytesIntoBreak from './DecodeBytesIntoBreak.mjs';
import DecodeBytesIntoIgnore from './DecodeBytesIntoIgnore.mjs';
import DecodeBytesIntoStrict from './DecodeBytesIntoStrict.mjs';
import DecodeInt from './DecodeInt.mjs';
import DecodeIntBreak from './DecodeIntBreak.mjs';
import DecodeIntIgnore from './DecodeIntIgnore.mjs';
import DecodeIntStrict from './DecodeIntStrict.mjs';
import EncodeBytes from './EncodeBytes.mjs';
import GetMaxByteCount from './GetMaxByteCount.mjs';
import GetMaxCharCount from './GetMaxCharCount.mjs';
import IsBaseX from './IsBaseX.mjs';
import NormalizeString from './NormalizeString.mjs';
import NormalizeStringBreak from './NormalizeStringBreak.mjs';
import NormalizeStringIgnore from './NormalizeStringIgnore.mjs';
import RequireThisBaseX from './RequireThisBaseX.mjs';
import ThrowInvalidCharacterError from './ThrowInvalidCharacterError.mjs';
import ToErrorMode from './ToErrorMode.mjs';

const ImportFunction = async name => {
  const module = await import(`./${name}.mjs`);
  return module.default;
}

const hasBigInt = HasIntrinsic('BigInt');

const BaseXDecodeBigInt = hasBigInt ? await ImportFunction('BaseXDecodeBigInt') : undefined;
const BaseXEncodeBigInt = hasBigInt ? await ImportFunction('BaseXEncodeBigInt') : undefined;
const DecodeBigInt = hasBigInt ? await ImportFunction('DecodeBigInt') : undefined;
const DecodeBigIntBreak = hasBigInt ? await ImportFunction('DecodeBigIntBreak') : undefined;
const DecodeBigIntIgnore = hasBigInt ? await ImportFunction('DecodeBigIntIgnore') : undefined;
const DecodeBigIntStrict = hasBigInt ? await ImportFunction('DecodeBigIntStrict') : undefined;

export {
  BaseXAlphabet,
  BaseXDecode,
  BaseXDecodeBigInt,
  BaseXDecodeInt,
  BaseXDecodeInto,
  BaseXEncode,
  BaseXEncodeBigInt,
  BaseXEncodeInt,
  BaseXErrorMode,
  BaseXIsValid,
  BaseXNormalize,
  BaseXValidate,
  DecodeBigInt,
  DecodeBigIntBreak,
  DecodeBigIntIgnore,
  DecodeBigIntStrict,
  DecodeBytes,
  DecodeBytesBreak,
  DecodeBytesIgnore,
  DecodeBytesStrict,
  DecodeBytesInto,
  DecodeBytesIntoBreak,
  DecodeBytesIntoIgnore,
  DecodeBytesIntoStrict,
  DecodeInt,
  DecodeIntBreak,
  DecodeIntIgnore,
  DecodeIntStrict,
  EncodeBytes,
  GetMaxByteCount,
  GetMaxCharCount,
  IsBaseX,
  NormalizeString,
  NormalizeStringBreak,
  NormalizeStringIgnore,
  RequireThisBaseX,
  ThrowInvalidCharacterError,
  ToErrorMode
};
