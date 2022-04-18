import GetInternalSlotOrThrow from '#internal-slots/GetInternalSlotOrThrow';
import {
  $BaseXByteFactor
} from './index.mjs';

const GetByteFactorOf = instance => GetInternalSlotOrThrow(instance, $BaseXByteFactor);

export default GetByteFactorOf;
