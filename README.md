# BaseX

## Install
`npm i --save @dwlib/basex`

## Usage
```javascript
// CJS
const baseX = require('@dwlib/basex');
// ESM
import BaseX from '@dwlib/basex';
import * as baseX from '@dwlib/basex';
// Module Exports
const {
  BaseX
} = baseX;

const Base58 = new BaseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

const text = 'Ave, Darkwolf!🐺🐺🐺';

const encodedString = Base58.encodeText(text); // => '31GEC6Z1ppWwvCikxA5J7EaPFzPWhoJejFpV'
const decodedText = Base58.decodeText(encodedString);
decodedText === text; // => true
```
