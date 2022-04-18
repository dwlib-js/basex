import Map from '#primordials/Map';
import MapHas from '#primordials/MapHas';
import MapSet from '#primordials/MapSet';
import MathLog from '#primordials/MathLog';
import RangeError from '#primordials/RangeError';
import StringCharCodeAt from '#primordials/StringCharCodeAt';
import Symbol from '#primordials/Symbol';
import TypeError from '#primordials/TypeError';
import IsObject from '#types/isObject';
import ToString from '#abstract/ToString';
import SetInternalSlot from '#internal-slots/SetInternalSlot';
import ToErrorMode from '#abstract-functions/ToErrorMode';

const LN256 = MathLog(256);

const $BaseXAlphabet = Symbol('[[BaseXAlphabet]]');
const $BaseXAlphabetLookup = Symbol('[[BaseXAlphabetLookup]]');
const $BaseXByteFactor = Symbol('[[BaseXByteFactor]]');
const $BaseXCharFactor = Symbol('[[BaseXCharFactor]]');
const $BaseXErrorMode = Symbol('[[BaseXErrorMode]]');

class BaseX {
  constructor(alphabet, options) {
    const string = ToString(alphabet);
    const length = string.length;
    if (length < 2 || length > 78) {
      throw new RangeError('Alphabet length is not between 2 and 78');
    }
    const alphabetLookup = new Map();
    for (let i = 0; i < length; i++) {
      const char = string[i];
      if (MapHas(alphabetLookup, char)) {
        throw new RangeError(`Duplicate alphabet character at index ${i}`);
      }
      const charCode = StringCharCodeAt(string, i);
      if (charCode < 0x21 || charCode > 0x7e) {
        throw new RangeError(`Invalid alphabet character at index ${i}`);
      }
      MapSet(alphabetLookup, char, i);
    }
    let mode = 'break';
    if (options != null) {
      if (!IsObject(options)) {
        throw new TypeError('options is not an object');
      }
      const errorMode = options.errorMode;
      if (errorMode !== undefined) {
        mode = ToErrorMode(errorMode);
      }
    }
    const baseLog = MathLog(length);
    const byteFactor = baseLog / LN256;
    const charFactor = LN256 / baseLog;
    SetInternalSlot(this, $BaseXAlphabet, string);
    SetInternalSlot(this, $BaseXAlphabetLookup, alphabetLookup);
    SetInternalSlot(this, $BaseXByteFactor, byteFactor);
    SetInternalSlot(this, $BaseXCharFactor, charFactor);
    SetInternalSlot(this, $BaseXErrorMode, mode);
  }
}

const BaseXPrototype = BaseX.prototype;

export {
  $BaseXAlphabet,
  $BaseXAlphabetLookup,
  $BaseXByteFactor,
  $BaseXCharFactor,
  $BaseXErrorMode,
  BaseX,
  BaseXPrototype
};
