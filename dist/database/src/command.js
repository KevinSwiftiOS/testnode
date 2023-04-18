"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const logic_1 = require("./commands/logic");
const query_1 = require("./commands/query");
const typings_1 = require("./typings");
exports.Command = {
    eq(val) {
        return new query_1.QueryCommand(query_1.QUERY_COMMANDS_LITERAL.EQ, [val]);
    },
    neq(val) {
        return new query_1.QueryCommand(query_1.QUERY_COMMANDS_LITERAL.NEQ, [val]);
    },
    lt(val) {
        return new query_1.QueryCommand(query_1.QUERY_COMMANDS_LITERAL.LT, [val]);
    },
    lte(val) {
        return new query_1.QueryCommand(query_1.QUERY_COMMANDS_LITERAL.LTE, [val]);
    },
    gt(val) {
        return new query_1.QueryCommand(query_1.QUERY_COMMANDS_LITERAL.GT, [val]);
    },
    gte(val) {
        return new query_1.QueryCommand(query_1.QUERY_COMMANDS_LITERAL.GTE, [val]);
    },
    in(val) {
        return new query_1.QueryCommand(query_1.QUERY_COMMANDS_LITERAL.IN, val);
    },
    nin(val) {
        return new query_1.QueryCommand(query_1.QUERY_COMMANDS_LITERAL.NIN, val);
    },
    and(...args) {
        const expressions = (0, typings_1.isArray)(args[0]) ? args[0] : args;
        return new logic_1.LogicCommand(logic_1.LOGIC_COMMANDS_LITERAL.AND, expressions);
    },
    nor(...args) {
        const expressions = (0, typings_1.isArray)(args[0]) ? args[0] : args;
        return new logic_1.LogicCommand(logic_1.LOGIC_COMMANDS_LITERAL.NOR, expressions);
    },
    or(...args) {
        const expressions = (0, typings_1.isArray)(args[0]) ? args[0] : args;
        return new logic_1.LogicCommand(logic_1.LOGIC_COMMANDS_LITERAL.OR, expressions);
    },
};
exports.default = exports.Command;
//# sourceMappingURL=command.js.map