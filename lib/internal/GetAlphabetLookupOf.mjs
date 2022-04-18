import GetInternalSlotOrThrow from '#internal-slots/GetInternalSlotOrThrow';
import {
  $BaseXAlphabetLookup
} from './index.mjs';

const GetAlphabetLookupOf = instance => GetInternalSlotOrThrow(instance, $BaseXAlphabetLookup);

export default GetAlphabetLookupOf;
