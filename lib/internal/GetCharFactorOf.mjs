import GetInternalSlotOrThrow from '#internal-slots/GetInternalSlotOrThrow';
import {
  $BaseXCharFactor
} from './index.mjs';

const GetCharFactorOf = instance => GetInternalSlotOrThrow(instance, $BaseXCharFactor);

export default GetCharFactorOf;
