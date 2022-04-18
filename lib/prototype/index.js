'use strict';

const GetIntrinsicOrThrow = require('#intrinsics/GetIntrinsicOrThrow');
const HasIntrinsic = require('#intrinsics/HasIntrinsic');
const ObjectDefineProperties = require('#primordials/ObjectDefineProperties');
const ReflectDefineProperty = require('#primordials/ReflectDefineProperty');
const {
  BaseXPrototype
} = require('#internal');
const BaseXPrototypeAlphabet = require('./alphabet');
const BaseXPrototypeDecode = require('./decode');
const BaseXPrototypeDecodeInt = require('./decodeInt');
const BaseXPrototypeDecodeInto = require('./decodeInto');
const BaseXPrototypeEncode = require('./encode');
const BaseXPrototypeEncodeInt = require('./encodeInt');
const BaseXPrototypeErrorMode = require('./errorMode');
const BaseXPrototypeIsValid = require('./isValid');
const BaseXPrototypeNormalize = require('./normalize');
const BaseXPrototypeValidate = require('./validate');

const hasBigInt = HasIntrinsic('BigInt');

const BaseXPrototypeDecodeBigInt = hasBigInt ? require('./decodeBigInt') : undefined;
const BaseXPrototypeEncodeBigInt = hasBigInt ? require('./encodeBigInt') : undefined;

const SymbolToStringTag = GetIntrinsicOrThrow('@@toStringTag');

ObjectDefineProperties(BaseXPrototype, {
  alphabet: {
    get: BaseXPrototypeAlphabet,
  },
  decode: {
    value: BaseXPrototypeDecode
  },
  decodeBigInt: {
    value: BaseXPrototypeDecodeBigInt
  },
  decodeInt: {
    value: BaseXPrototypeDecodeInt
  },
  decodeInto: {
    value: BaseXPrototypeDecodeInto
  },
  encode: {
    value: BaseXPrototypeEncode
  },
  encodeBigInt: {
    value: BaseXPrototypeEncodeBigInt
  },
  encodeInt: {
    value: BaseXPrototypeEncodeInt
  },
  errorMode: {
    get: BaseXPrototypeErrorMode
  },
  isValid: {
    value: BaseXPrototypeIsValid
  },
  normalize: {
    value: BaseXPrototypeNormalize
  },
  validate: {
    value: BaseXPrototypeValidate
  }
});
ReflectDefineProperty(BaseXPrototype, SymbolToStringTag, {
  value: 'BaseX'
});

module.exports = BaseXPrototype;
