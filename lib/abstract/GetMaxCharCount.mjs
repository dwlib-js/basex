import MathCeil from '#primordials/MathCeil';
import GetCharFactorOf from '#internal/GetCharFactorOf';

const GetMaxCharCount = (instance, byteCount) => {
  const factor = GetCharFactorOf(instance);
  return MathCeil(byteCount * factor);
}

export default GetMaxCharCount;
