"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
const node_test_1 = __importDefault(require("node:test"));
const Utils_1 = require("./Utils");
(0, node_test_1.default)('Unit test 1: add(2, 0) = 2', () => {
    node_assert_1.strict.equal(Utils_1.Utils.add(2, 0), 2);
});
(0, node_test_1.default)('Unit test 2: add(2, 3) = 5', () => {
    node_assert_1.strict.equal(Utils_1.Utils.add(2, 3), 5);
});
