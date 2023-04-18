"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isComparisonCommand = exports.isQueryCommand = exports.QueryCommand = exports.QUERY_COMMANDS_LITERAL = exports.MOD = exports.SIZE = exports.EXISTS = exports.ELEM_MATCH = exports.ALL = exports.NIN = exports.IN = exports.LTE = exports.LT = exports.GTE = exports.GT = exports.NEQ = exports.EQ = void 0;
const Symbols_1 = require("../Symbols");
const logic_1 = require("./logic");
exports.EQ = 'eq';
exports.NEQ = 'neq';
exports.GT = 'gt';
exports.GTE = 'gte';
exports.LT = 'lt';
exports.LTE = 'lte';
exports.IN = 'in';
exports.NIN = 'nin';
exports.ALL = 'all';
exports.ELEM_MATCH = 'elemMatch';
exports.EXISTS = 'exists';
exports.SIZE = 'size';
exports.MOD = 'mod';
var QUERY_COMMANDS_LITERAL;
(function (QUERY_COMMANDS_LITERAL) {
    QUERY_COMMANDS_LITERAL["EQ"] = "eq";
    QUERY_COMMANDS_LITERAL["NEQ"] = "neq";
    QUERY_COMMANDS_LITERAL["GT"] = "gt";
    QUERY_COMMANDS_LITERAL["GTE"] = "gte";
    QUERY_COMMANDS_LITERAL["LT"] = "lt";
    QUERY_COMMANDS_LITERAL["LTE"] = "lte";
    QUERY_COMMANDS_LITERAL["IN"] = "in";
    QUERY_COMMANDS_LITERAL["NIN"] = "nin";
    QUERY_COMMANDS_LITERAL["ALL"] = "all";
    QUERY_COMMANDS_LITERAL["ELEM_MATCH"] = "elemMatch";
    QUERY_COMMANDS_LITERAL["EXISTS"] = "exists";
    QUERY_COMMANDS_LITERAL["SIZE"] = "size";
    QUERY_COMMANDS_LITERAL["MOD"] = "mod";
    QUERY_COMMANDS_LITERAL["GEO_NEAR"] = "geoNear";
    QUERY_COMMANDS_LITERAL["GEO_WITHIN"] = "geoWithin";
    QUERY_COMMANDS_LITERAL["GEO_INTERSECTS"] = "geoIntersects";
})(QUERY_COMMANDS_LITERAL = exports.QUERY_COMMANDS_LITERAL || (exports.QUERY_COMMANDS_LITERAL = {}));
class QueryCommand extends logic_1.LogicCommand {
    constructor(operator, operands, fieldName) {
        super(operator, operands, fieldName);
        this.operator = operator;
        this._internalType = Symbols_1.SYMBOL_QUERY_COMMAND;
    }
    toJSON() {
        switch (this.operator) {
            case QUERY_COMMANDS_LITERAL.IN:
            case QUERY_COMMANDS_LITERAL.NIN:
                return {
                    [`$${this.operator}`]: this.operands,
                };
            case QUERY_COMMANDS_LITERAL.NEQ:
                return {
                    $ne: this.operands[0],
                };
            default:
                return {
                    [`$${this.operator}`]: this.operands[0],
                };
        }
    }
    _setFieldName(fieldName) {
        const command = new QueryCommand(this.operator, this.operands, fieldName);
        return command;
    }
    eq(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.EQ, [val], this.fieldName);
        return this.and(command);
    }
    neq(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.NEQ, [val], this.fieldName);
        return this.and(command);
    }
    gt(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.GT, [val], this.fieldName);
        return this.and(command);
    }
    gte(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.GTE, [val], this.fieldName);
        return this.and(command);
    }
    lt(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.LT, [val], this.fieldName);
        return this.and(command);
    }
    lte(val) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.LTE, [val], this.fieldName);
        return this.and(command);
    }
    in(list) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.IN, list, this.fieldName);
        return this.and(command);
    }
    nin(list) {
        const command = new QueryCommand(QUERY_COMMANDS_LITERAL.NIN, list, this.fieldName);
        return this.and(command);
    }
}
exports.QueryCommand = QueryCommand;
function isQueryCommand(object) {
    return (object &&
        object instanceof QueryCommand &&
        object._internalType === Symbols_1.SYMBOL_QUERY_COMMAND);
}
exports.isQueryCommand = isQueryCommand;
function isComparisonCommand(object) {
    return isQueryCommand(object);
}
exports.isComparisonCommand = isComparisonCommand;
exports.default = QueryCommand;
