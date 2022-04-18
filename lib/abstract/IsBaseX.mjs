import HasInternalSlot from '#internal-slots/HasInternalSlot';
import {
  $BaseXAlphabet
} from '#internal';

const IsBaseX = argument => HasInternalSlot(argument, $BaseXAlphabet);

export default IsBaseX;
