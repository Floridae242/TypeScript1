import { strict as assert } from 'node:assert';
import { Utils } from './Utils';

assert.equal(Utils.add(1, 2), 3);
assert.equal(Utils.add(-1, 1), 0);
console.log('All tests passed');
