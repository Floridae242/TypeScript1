"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
const Utils_1 = require("./Utils");
node_assert_1.strict.equal(Utils_1.Utils.add(1, 2), 3);
node_assert_1.strict.equal(Utils_1.Utils.add(-1, 1), 0);
console.log('All tests passed');
