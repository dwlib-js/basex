import GetInternalSlotOrThrow from '#internal-slots/GetInternalSlotOrThrow';
import {
  $BaseXErrorMode
} from '#internal';

const BaseXErrorMode = instance => GetInternalSlotOrThrow(instance, $BaseXErrorMode);

export default BaseXErrorMode;
