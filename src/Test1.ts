import { strict as assert } from 'node:assert';
import test from 'node:test';
import { Utils } from './Utils';

test('Unit test 1: add(2, 0) = 2', () => {
  assert.equal(Utils.add(2, 0), 2);
});

test('Unit test 2: add(2, 3) = 5', () => {
  assert.equal(Utils.add(2, 3), 5);
});
