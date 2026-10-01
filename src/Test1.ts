import { Utils } from './Utils';

function check(name: string, actual: number, expected: number): void {
  if (actual === expected) {
    console.log(`✔ ${name}`);
    return;
  }

  console.error(`✖ ${name}: expected ${expected}, got ${actual}`);
  process.exitCode = 1;
}

check('Unit test 1: add(2, 0)', Utils.add(2, 0), 2);
check('Unit test 2: add(2, 3)', Utils.add(2, 3), 5);
