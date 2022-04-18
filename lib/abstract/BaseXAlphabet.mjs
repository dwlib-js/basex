import GetInternalSlotOrThrow from '#internal-slots/GetInternalSlotOrThrow';
import {
  $BaseXAlphabet
} from '#internal';

const BaseXAlphabet = instance => GetInternalSlotOrThrow(instance, $BaseXAlphabet);

export default BaseXAlphabet;
