import {
  BigInt,
  Map,
  MapGet,
  MapHas,
  MapSet,
  MathCeil,
  MathFloor,
  MathLog,
  ObjectDefineProperties,
  RangeError,
  ReflectDefineProperty,
  StringFromCharCode,
  StringCharCodeAt,
  Symbol,
  SymbolHasInstance,
  SymbolToStringTag,
  TypeError,
  TypedArrayLength,
  Uint8Array
} from '@dwlib/primordials';
import IsObject from '@dwlib/abstract/IsObject';
import IsBuffer from '@dwlib/abstract/IsBuffer';
import IsUint8Array from '@dwlib/abstract/IsUint8Array';
import IsString from '@dwlib/abstract/IsString';
import ToString from '@dwlib/abstract/ToString';
import ToIntegerOrInfinity from '@dwlib/abstract/ToIntegerOrInfinity';
import ToBigInt from '@dwlib/abstract/ToBigInt';
import {
  DefineSlots,
  GetSlot,
  HasSlot
} from '@dwlib/internal-slots';
import {
  encode as UTF8Encode,
  decode as UTF8Decode
} from '@dwlib/utf8';

const LOG256 = MathLog(256);

const $Alphabet = Symbol('[[Alphabet]]');
const $AlphabetLookup = Symbol('[[AlphabetLookup]]');
const $BaseMap = Symbol('[[BaseMap]]');
const $BaseMapLookup = Symbol('[[BaseMapLookup]]');
const $Factor = Symbol('[[Factor]]');
const $InverseFactor = Symbol('[[InverseFactor]]');

const IsBaseX = argument => IsObject(argument) && HasSlot(argument, $Alphabet);

const RequireThis = argument => {
  if (!IsBaseX(argument)) {
    throw new TypeError('`this` is not an instance of BaseX');
  }
}

const RequireBuffer = argument => {
  if (!IsBuffer(argument)) {
    throw new TypeError('`buffer` is not an instance of ArrayBuffer or ArrayBufferView');
  }
}

const Encode = (target, string) => {
  const length = string.length;
  if (!length) {
    return '';
  }
  const alphabet = GetSlot(target, $Alphabet);
  const factor = GetSlot(target, $Factor);
  const alphabetLength = alphabet.length;
  let leadingZeros = 0;
  while (leadingZeros < length && string[leadingZeros] === '\0') {
    leadingZeros++;
  }
  const capacity = MathCeil((length - leadingZeros) * factor);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    let carry = StringCharCodeAt(string, i);
    if (carry > 0xff) {
      throw new RangeError('Invalid ASCII encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] << 8;
      bytes[index] = carry % alphabetLength;
      carry = (carry / alphabetLength) | 0;
      index--;
    }
    offset = ++index;
  }
  let result = '';
  if (leadingZeros) {
    const zeroChar = alphabet[0];
    while (--leadingZeros >= 0) {
      result += zeroChar;
    }
  }
  while (offset < capacity) {
    const charIndex = bytes[offset++];
    result += alphabet[charIndex];
  }
  return result;
}

const EncodeToBytes = (target, string) => {
  const length = string.length;
  if (!length) {
    return new Uint8Array(0);
  }
  const alphabet = GetSlot(target, $Alphabet);
  const baseMap = GetSlot(target, $BaseMap);
  const factor = GetSlot(target, $Factor);
  const alphabetLength = alphabet.length;
  let leadingZeros = 0;
  while (leadingZeros < length && string[leadingZeros] === '\0') {
    leadingZeros++;
  }
  const capacity = MathCeil((length - leadingZeros) * factor);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    let carry = StringCharCodeAt(string, i);
    if (carry > 0xff) {
      throw new RangeError('Invalid ASCII encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] << 8;
      bytes[index] = carry % alphabetLength;
      carry = (carry / alphabetLength) | 0;
      index--;
    }
    offset = ++index;
  }
  const size = capacity - offset + leadingZeros;
  const result = new Uint8Array(size);
  let index = 0;
  if (leadingZeros) {
    const zeroCharCode = MapGet(baseMap, 0);
    while (index < leadingZeros) {
      result[index++] = zeroCharCode;
    }
  }
  while (index < size) {
    const charIndex = bytes[offset++];
    result[index++] = MapGet(baseMap, charIndex);
  }
  return result;
}

const Decode = (target, encodedString) => {
  const length = encodedString.length;
  if (!length) {
    return '';
  }
  const alphabet = GetSlot(target, $Alphabet);
  const baseMapLookup = GetSlot(target, $BaseMapLookup);
  const factor = GetSlot(target, $InverseFactor);
  const alphabetLength = alphabet.length;
  const zeroChar = alphabet[0];
  let leadingZeros = 0;
  while (leadingZeros < length && encodedString[leadingZeros] === zeroChar) {
    leadingZeros++;
  }
  const capacity = MathCeil((length - leadingZeros) * factor);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    const charCode = StringCharCodeAt(encodedString, i);
    let carry = MapGet(baseMapLookup, charCode);
    if (carry === undefined) {
      throw new RangeError('Invalid BaseX encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] * alphabetLength;
      bytes[index] = carry & 0xff;
      carry >>= 8;
      index--;
    }
    offset = ++index;
  }
  let result = '';
  while (leadingZeros > 0) {
    result += '\0';
    leadingZeros--;
  }
  while (offset < capacity) {
    const charCode = bytes[offset++];
    result += StringFromCharCode(charCode);
  }
  return result;
}

const DecodeToBytes = (target, encodedString) => {
  const length = encodedString.length;
  if (!length) {
    return new Uint8Array(0);
  }
  const alphabet = GetSlot(target, $Alphabet);
  const baseMapLookup = GetSlot(target, $BaseMapLookup);
  const factor = GetSlot(target, $InverseFactor);
  const alphabetLength = alphabet.length;
  const zeroChar = alphabet[0];
  let leadingZeros = 0;
  while (leadingZeros < length && encodedString[leadingZeros] === zeroChar) {
    leadingZeros++;
  }
  const capacity = MathCeil((length - leadingZeros) * factor);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    const charCode = StringCharCodeAt(encodedString, i);
    let carry = MapGet(baseMapLookup, charCode);
    if (carry === undefined) {
      throw new RangeError('Invalid BaseX encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] * alphabetLength;
      bytes[index] = carry & 0xff;
      carry >>= 8;
      index--;
    }
    offset = ++index;
  }
  const size = capacity - offset + leadingZeros;
  const result = new Uint8Array(size);
  let index = leadingZeros;
  while (index < size) {
    result[index++] = bytes[offset++];
  }
  return result;
}

const EncodeBytes = (target, buffer) => {
  const source = IsUint8Array(buffer) ? buffer : new Uint8Array(buffer);
  const length = TypedArrayLength(source);
  if (!length) {
    return new Uint8Array(0);
  }
  const alphabet = GetSlot(target, $Alphabet);
  const baseMap = GetSlot(target, $BaseMap);
  const factor = GetSlot(target, $Factor);
  const alphabetLength = alphabet.length;
  let leadingZeros = 0;
  while (leadingZeros < length && source[leadingZeros] === 0) {
    leadingZeros++
  }
  const capacity = MathCeil((length - leadingZeros) * factor);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    let carry = source[i];
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] << 8;
      bytes[index] = carry % alphabetLength;
      carry = (carry / alphabetLength) | 0;
      index--;
    }
    offset = ++index;
  }
  const size = capacity - offset + leadingZeros;
  const result = new Uint8Array(size);
  let index = 0;
  if (leadingZeros) {
    const zeroCharCode = MapGet(baseMap, 0);
    while (index < leadingZeros) {
      result[index++] = zeroCharCode;
    }
  }
  while (index < size) {
    const charIndex = bytes[offset++];
    result[index++] = MapGet(baseMap, charIndex);
  }
  return result;
}

const EncodeBytesToString = (target, buffer) => {
  const source = IsUint8Array(buffer) ? buffer : new Uint8Array(buffer);
  const length = TypedArrayLength(source);
  if (!length) {
    return '';
  }
  const alphabet = GetSlot(target, $Alphabet);
  const factor = GetSlot(target, $Factor);
  const alphabetLength = alphabet.length;
  let leadingZeros = 0;
  while (leadingZeros < length && source[leadingZeros] === 0) {
    leadingZeros++
  }
  const capacity = MathCeil((length - leadingZeros) * factor);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    let carry = source[i];
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] << 8;
      bytes[index] = carry % alphabetLength;
      carry = (carry / alphabetLength) | 0;
      index--;
    }
    offset = ++index;
  }
  let result = '';
  if (leadingZeros) {
    const zeroChar = alphabet[0];
    while (--leadingZeros >= 0) {
      result += zeroChar;
    }
  }
  while (offset < capacity) {
    const charIndex = bytes[offset++];
    result += alphabet[charIndex];
  }
  return result;
}

const DecodeBytes = (target, buffer) => {
  const source = IsUint8Array(buffer) ? buffer : new Uint8Array(buffer);
  const length = TypedArrayLength(source);
  if (!length) {
    return new Uint8Array(0);
  }
  const alphabet = GetSlot(target, $Alphabet);
  const baseMapLookup = GetSlot(target, $BaseMapLookup);
  const factor = GetSlot(target, $InverseFactor);
  const alphabetLength = alphabet.length;
  const zeroCharCode = MapGet(baseMapLookup, 0);
  let leadingZeros = 0;
  while (leadingZeros < length && source[leadingZeros] === zeroCharCode) {
    leadingZeros++;
  }
  const capacity = MathCeil((length - leadingZeros) * factor);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    const charCode = source[i];
    let carry = MapGet(baseMapLookup, charCode);
    if (carry === undefined) {
      throw new RangeError('Invalid BaseX encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] * alphabetLength;
      bytes[index] = carry & 0xff;
      carry >>= 8;
      index--;
    }
    offset = ++index;
  }
  const size = capacity - offset + leadingZeros;
  const result = new Uint8Array(size);
  let index = leadingZeros;
  while (index < size) {
    result[index++] = bytes[offset++];
  }
  return result;
}

const DecodeBytesToString = (target, buffer) => {
  const source = IsUint8Array(buffer) ? buffer : new Uint8Array(buffer);
  const length = TypedArrayLength(source);
  if (!length) {
    return '';
  }
  const alphabet = GetSlot(target, $Alphabet);
  const baseMapLookup = GetSlot(target, $BaseMapLookup);
  const factor = GetSlot(target, $InverseFactor);
  const alphabetLength = alphabet.length;
  const zeroCharCode = MapGet(baseMapLookup, 0);
  let leadingZeros = 0;
  while (leadingZeros < length && source[leadingZeros] === zeroCharCode) {
    leadingZeros++;
  }
  const capacity = MathCeil((length - leadingZeros) * factor);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    const charCode = source[i];
    let carry = MapGet(baseMapLookup, charCode);
    if (carry === undefined) {
      throw new RangeError('Invalid BaseX encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] * alphabetLength;
      bytes[index] = carry & 0xff;
      carry >>= 8;
      index--;
    }
    offset = ++index;
  }
  let result = '';
  while (leadingZeros > 0) {
    result += '\0';
    leadingZeros--;
  }
  while (offset < capacity) {
    const charCode = bytes[offset++];
    result += StringFromCharCode(charCode);
  }
  return result;
}

const EncodeText = (target, text) => {
  const buffer = UTF8Encode(text);
  return EncodeBytesToString(target, buffer);
}

const EncodeTextToBytes = (target, text) => {
  const buffer = UTF8Encode(text);
  return EncodeBytes(target, buffer);
}

const DecodeText = (target, encodedString) => {
  const buffer = DecodeToBytes(target, encodedString);
  return UTF8Decode(buffer);
}

const DecodeBytesToText = (target, buffer) => {
  const bytes = DecodeBytes(target, buffer);
  return UTF8Decode(bytes);
}

const EncodeInt = (target, integer) => {
  const alphabet = GetSlot(target, $Alphabet);
  if (!integer) {
    return alphabet[0];
  }
  const alphabetLength = alphabet.length;
  let result = '';
  let carry = integer;
  while (carry) {
    const charIndex = carry % alphabetLength;
    const char = alphabet[charIndex];
    result = `${char}${result}`;
    carry = MathFloor(carry / alphabetLength);
  }
  return result;
}

const DecodeInt = (target, encodedInteger) => {
  const length = encodedInteger.length;
  if (!length) {
    return NaN;
  }
  const alphabet = GetSlot(target, $Alphabet);
  const alphabetLookup = GetSlot(target, $AlphabetLookup);
  const alphabetLength = alphabet.length;
  const zeroChar = alphabet[0];
  let leadingZeros = 0;
  while (leadingZeros < length && encodedInteger[leadingZeros] === zeroChar) {
    leadingZeros++;
  }
  let result = 0;
  for (let i = leadingZeros; i < length; i++) {
    const char = encodedInteger[i];
    const charIndex = MapGet(alphabetLookup, char);
    if (charIndex === undefined) {
      return NaN;
    }
    result = result * alphabetLength + charIndex;
  }
  return result;
}

export class BaseX {
  constructor(alphabet) {
    if (!IsString(alphabet)) {
      throw new TypeError('`alphabet` is not a string');
    }
    const length = alphabet.length;
    if (!length || length > 94) {
      throw new RangeError('Alphabet length out of range');
    }
    const alphabetLookup = new Map();
    const baseMap = new Map();
    const baseMapLookup = new Map();
    for (let i = 0; i < length; i++) {
      const char = alphabet[i];
      if (MapHas(alphabetLookup, char)) {
        throw new RangeError('Invalid alphabet');
      }
      const charCode = StringCharCodeAt(alphabet, i);
      if (charCode < 0x21 || charCode > 0x7e) {
        throw new RangeError('Invalid alphabet');
      }
      MapSet(alphabetLookup, char, i);
      MapSet(baseMap, i, charCode);
      MapSet(baseMapLookup, charCode, i);
    }
    const log = MathLog(length);
    const factor = LOG256 / log;
    const inverseFactor = log / LOG256;
    DefineSlots(this, {
      [$Alphabet]: alphabet,
      [$AlphabetLookup]: alphabetLookup,
      [$BaseMap]: baseMap,
      [$BaseMapLookup]: baseMapLookup,
      [$Factor]: factor,
      [$InverseFactor]: inverseFactor
    });
  }

  get alphabet() {
    RequireThis(this);
    return GetSlot(this, $Alphabet);
  }

  encode(string) {
    RequireThis(this);
    const $string = ToString(string);
    return Encode(this, $string);
  }

  encodeToBytes(string) {
    RequireThis(this);
    const $string = ToString(string);
    return EncodeToBytes(this, $string);
  }

  decode(encodedString) {
    RequireThis(this);
    const $encodedString = ToString(encodedString);
    return Decode(this, $encodedString);
  }

  decodeToBytes(encodedString) {
    RequireThis(this);
    const $encodedString = ToString(encodedString);
    return DecodeToBytes(this, $encodedString);
  }

  encodeBytes(buffer) {
    RequireThis(this);
    RequireBuffer(buffer);
    return EncodeBytes(this, buffer);
  }

  encodeBytesToString(buffer) {
    RequireThis(this);
    RequireBuffer(buffer);
    return EncodeBytesToString(this, buffer);
  }

  decodeBytes(buffer) {
    RequireThis(this);
    RequireBuffer(buffer);
    return DecodeBytes(this, buffer);
  }

  decodeBytesToString(buffer) {
    RequireThis(this);
    RequireBuffer(buffer);
    return DecodeBytesToString(this, buffer);
  }

  encodeText(text) {
    RequireThis(this);
    return EncodeText(this, text);
  }

  encodeTextToBytes(text) {
    RequireThis(this);
    return EncodeTextToBytes(this, text);
  }

  decodeText(encodedString) {
    RequireThis(this);
    const $encodedString = ToString(encodedString);
    return DecodeText(this, $encodedString);
  }

  decodeBytesToText(buffer) {
    RequireThis(this);
    RequireBuffer(buffer);
    return DecodeBytesToText(this, buffer);
  }

  encodeInt(integer) {
    RequireThis(this);
    const $integer = ToIntegerOrInfinity(integer);
    if ($integer < 0) {
      throw new RangeError('`integer` cannot be negative');
    }
    if ($integer === Infinity) {
      throw new RangeError('`integer` is not finite');
    }
    return EncodeInt(this, $integer);
  }

  decodeInt(encodedInteger) {
    RequireThis(this);
    const $encodedInteger = ToString(encodedInteger);
    return DecodeInt(this, $encodedInteger);
  }
}
export default BaseX;

ReflectDefineProperty(BaseX, SymbolHasInstance, {
  value: IsBaseX
});

const BaseXPrototype = BaseX.prototype;

ReflectDefineProperty(BaseXPrototype, SymbolToStringTag, {
  value: 'BaseX'
});

if (BigInt) {
  const BIGINT_ZERO = BigInt(0);

  const EncodeBigInt = (target, bigint) => {
    const alphabet = GetSlot(target, $Alphabet);
    if (!bigint) {
      return alphabet[0];
    }
    const alphabetLength = BigInt(alphabet.length);
    let result = '';
    let carry = bigint;
    while (carry) {
      const charIndex = carry % alphabetLength;
      const char = alphabet[charIndex];
      result = `${char}${result}`;
      carry /= alphabetLength;
    }
    return result;
  }

  const DecodeBigInt = (target, encodedInteger) => {
    const length = encodedInteger.length;
    if (!length) {
      throw new RangeError('Invalid BaseX encoded integer');
    }
    const alphabet = GetSlot(target, $Alphabet);
    const alphabetLookup = GetSlot(target, $AlphabetLookup);
    const alphabetLength = BigInt(alphabet.length);
    const zeroChar = alphabet[0];
    let leadingZeros = 0;
    while (leadingZeros < length && encodedInteger[leadingZeros] === zeroChar) {
      leadingZeros++;
    }
    let result = BIGINT_ZERO;
    for (let i = leadingZeros; i < length; i++) {
      const char = encodedInteger[i];
      const charIndex = MapGet(alphabetLookup, char);
      if (charIndex === undefined) {
        throw new RangeError('Invalid BaseX encoded integer');
      }
      result = result * alphabetLength + BigInt(charIndex);
    }
    return result;
  }

  ObjectDefineProperties(BaseXPrototype, {
    encodeBigInt: {
      value: function encodeBigInt(bigint) {
        RequireThis(this);
        const $bigint = ToBigInt(bigint);
        if ($bigint < BIGINT_ZERO) {
          throw new RangeError('`bigint` cannot be negative');
        }
        return EncodeBigInt(this, $bigint);
      }
    },
    decodeBigInt: {
      value: function decodeBigInt(encodedInteger) {
        RequireThis(this);
        const $encodedInteger = ToString(encodedInteger);
        return DecodeBigInt(this, $encodedInteger);
      }
    }
  });
}
