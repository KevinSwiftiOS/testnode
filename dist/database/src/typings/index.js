"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInternalObject = exports.isRegExp = exports.isDate = exports.isArray = exports.isString = exports.isObject = exports.getType = void 0;
const Symbols_1 = require("../Symbols");
const getType = (x) => Object.prototype.toString.call(x).slice(8, -1).toLowerCase();
exports.getType = getType;
const isObject = (x) => (0, exports.getType)(x) === 'object';
exports.isObject = isObject;
const isString = (x) => (0, exports.getType)(x) === 'string';
exports.isString = isString;
const isArray = (x) => Array.isArray(x);
exports.isArray = isArray;
const isDate = (x) => (0, exports.getType)(x) === 'date';
exports.isDate = isDate;
const isRegExp = (x) => (0, exports.getType)(x) === 'regexp';
exports.isRegExp = isRegExp;
const isInternalObject = (x) => x && x._internalType instanceof Symbols_1.InternalSymbol;
exports.isInternalObject = isInternalObject;
//# sourceMappingURL=index.js.map