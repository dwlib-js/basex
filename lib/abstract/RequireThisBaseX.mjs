import TypeError from '#primordials/TypeError';
import IsBaseX from './IsBaseX.mjs';

const RequireThisBaseX = argument => {
  if (!IsBaseX(argument)) {
    throw new TypeError(`'this' is not an instance of BaseX`);
  }
}

export default RequireThisBaseX;
