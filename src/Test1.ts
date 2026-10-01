import { strict as assert } from 'node:assert';
import test from 'node:test';
import { Utils } from './Utils';

test('Test Case 1: add(2, 0) = 2', () => {
  assert.equal(Utils.add(2, 0), 2);
});

test('Test Case 2: add(2, 3) = 5', () => {
  assert.equal(Utils.add(2, 3), 5);
});
