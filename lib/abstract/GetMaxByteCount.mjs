import MathCeil from '#primordials/MathCeil';
import GetByteFactorOf from '#internal/GetByteFactorOf';

const GetMaxByteCount = (instance, charCount) => {
  const factor = GetByteFactorOf(instance);
  return MathCeil(charCount * factor);
}

export default GetMaxByteCount;
