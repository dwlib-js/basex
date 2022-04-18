import BaseXValidate from './BaseXValidate.mjs';
import NormalizeStringBreak from './NormalizeStringBreak.mjs';
import NormalizeStringIgnore from './NormalizeStringIgnore.mjs';

const NormalizeString = (instance, string, errorMode) => {
  const normalize = (
    errorMode === 'strict' ? BaseXValidate :
    errorMode === 'ignore' ? NormalizeStringIgnore : NormalizeStringBreak
  );
  return normalize(instance, string);
}

export default NormalizeString;
