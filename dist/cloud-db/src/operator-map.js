"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorToString = exports.OperatorMap = void 0;
const logic_1 = require("./commands/logic");
const query_1 = require("./commands/query");
const update_1 = require("./commands/update");
exports.OperatorMap = {};
for (const key in query_1.QUERY_COMMANDS_LITERAL) {
    if (Object.prototype.hasOwnProperty.call(query_1.QUERY_COMMANDS_LITERAL, key)) {
        exports.OperatorMap[key] = '$' + key;
    }
}
for (const key in logic_1.LOGIC_COMMANDS_LITERAL) {
    if (Object.prototype.hasOwnProperty.call(query_1.QUERY_COMMANDS_LITERAL, key)) {
        exports.OperatorMap[key] = '$' + key;
    }
}
for (const key in update_1.UPDATE_COMMANDS_LITERAL) {
    if (Object.prototype.hasOwnProperty.call(query_1.QUERY_COMMANDS_LITERAL, key)) {
        exports.OperatorMap[key] = '$' + key;
    }
}
// some exceptions
exports.OperatorMap[query_1.QUERY_COMMANDS_LITERAL.NEQ] = '$ne';
exports.OperatorMap[update_1.UPDATE_COMMANDS_LITERAL.REMOVE] = '$unset';
exports.OperatorMap[update_1.UPDATE_COMMANDS_LITERAL.SHIFT] = '$pop'; // same as POP
exports.OperatorMap[update_1.UPDATE_COMMANDS_LITERAL.UNSHIFT] = '$push'; // same as PUSH
function operatorToString(operator) {
    return exports.OperatorMap[operator] || '$' + operator;
}
exports.operatorToString = operatorToString;
//# sourceMappingURL=operator-map.js.map