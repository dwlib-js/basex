import GetIntrinsicOrThrow from '#intrinsics/GetIntrinsicOrThrow';
import HasIntrinsic from '#intrinsics/HasIntrinsic';
import ObjectDefineProperties from '#primordials/ObjectDefineProperties';
import ReflectDefineProperty from '#primordials/ReflectDefineProperty';
import {
  BaseXPrototype
} from '#internal';
import BaseXPrototypeAlphabet from './alphabet.mjs';
import BaseXPrototypeDecode from './decode.mjs';
import BaseXPrototypeDecodeInt from './decodeInt.mjs';
import BaseXPrototypeDecodeInto from './decodeInto.mjs';
import BaseXPrototypeEncode from './encode.mjs';
import BaseXPrototypeEncodeInt from './encodeInt.mjs';
import BaseXPrototypeErrorMode from './errorMode.mjs';
import BaseXPrototypeIsValid from './isValid.mjs';
import BaseXPrototypeNormalize from './normalize.mjs';
import BaseXPrototypeValidate from './validate.mjs';

const ImportFunction = async name => {
  const module = await import(`./${name}.mjs`);
  return module.default;
}

const hasBigInt = HasIntrinsic('BigInt');

const BaseXPrototypeDecodeBigInt = hasBigInt ? await ImportFunction('decodeBigInt') : undefined;
const BaseXPrototypeEncodeBigInt = hasBigInt ? await ImportFunction('encodeBigInt') : undefined;

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

export default BaseXPrototype;
