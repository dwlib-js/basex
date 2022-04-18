import DecodeBigIntBreak from './DecodeBigIntBreak.mjs';
import DecodeBigIntIgnore from './DecodeBigIntIgnore.mjs';
import DecodeBigIntStrict from './DecodeBigIntStrict.mjs';

const DecodeBigInt = (instance, string, errorMode) => {
  const decodeBigInt = (
    errorMode === 'strict' ? DecodeBigIntStrict :
    errorMode === 'ignore' ? DecodeBigIntIgnore : DecodeBigIntBreak
  );
  return decodeBigInt(instance, string);
}

export default DecodeBigInt;
