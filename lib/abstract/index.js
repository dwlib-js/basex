'use strict';

const HasIntrinsic = require('#intrinsics/HasIntrinsic');

const hasBigInt = HasIntrinsic('BigInt');

const BaseXAlphabet = require('./BaseXAlphabet');
const BaseXDecode = require('./BaseXDecode');
const BaseXDecodeBigInt = hasBigInt ? require('./BaseXDecodeBigInt') : undefined;
const BaseXDecodeInt = require('./BaseXDecodeInt');
const BaseXDecodeInto = require('./BaseXDecodeInto');
const BaseXEncode = require('./BaseXEncode');
const BaseXEncodeBigInt = hasBigInt ? require('./BaseXEncodeBigInt') : undefined;
const BaseXEncodeInt = require('./BaseXEncodeInt');
const BaseXErrorMode = require('./BaseXErrorMode');
const BaseXIsValid = require('./BaseXIsValid');
const BaseXNormalize = require('./BaseXNormalize');
const BaseXValidate = require('./BaseXValidate');
const DecodeBigInt = hasBigInt ? require('./DecodeBigInt') : undefined;
const DecodeBigIntBreak = hasBigInt ? require('./DecodeBigIntBreak') : undefined;
const DecodeBigIntIgnore = hasBigInt ? require('./DecodeBigIntIgnore') : undefined;
const DecodeBigIntStrict = hasBigInt ? require('./DecodeBigIntStrict') : undefined;
const DecodeBytes = require('./DecodeBytes');
const DecodeBytesBreak = require('./DecodeBytesBreak');
const DecodeBytesIgnore = require('./DecodeBytesIgnore');
const DecodeBytesStrict = require('./DecodeBytesStrict');
const DecodeBytesInto = require('./DecodeBytesInto');
const DecodeBytesIntoBreak = require('./DecodeBytesIntoBreak');
const DecodeBytesIntoIgnore = require('./DecodeBytesIntoIgnore');
const DecodeBytesIntoStrict = require('./DecodeBytesIntoStrict');
const DecodeInt = require('./DecodeInt');
const DecodeIntBreak = require('./DecodeIntBreak');
const DecodeIntIgnore = require('./DecodeIntIgnore');
const DecodeIntStrict = require('./DecodeIntStrict');
const EncodeBytes = require('./EncodeBytes');
const GetMaxByteCount = require('./GetMaxByteCount');
const GetMaxCharCount = require('./GetMaxCharCount');
const IsBaseX = require('./IsBaseX');
const NormalizeString = require('./NormalizeString');
const NormalizeStringBreak = require('./NormalizeStringBreak');
const NormalizeStringIgnore = require('./NormalizeStringIgnore');
const RequireThisBaseX = require('./RequireThisBaseX');
const ThrowInvalidCharacterError = require('./ThrowInvalidCharacterError');
const ToErrorMode = require('./ToErrorMode');

module.exports = {
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
