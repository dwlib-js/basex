import IsBufferSource from '#types/isBufferSource';
import BufferSourceAsUint8Array from '#abstract/BufferSourceAsUint8Array';
import ToString from '#abstract/ToString';
import UTF8EncodeString from '#utf8/EncodeString';
import EncodeBytes from './EncodeBytes.mjs';

const BaseXEncode = (instance, input) => {
  let buffer;
  if (IsBufferSource(input)) {
    buffer = BufferSourceAsUint8Array(input);
  } else {
    const string = ToString(input);
    buffer = UTF8EncodeString(string);
  }
  return EncodeBytes(instance, buffer);
}

export default BaseXEncode;
