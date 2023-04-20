"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogicCommand = exports.LogicCommand = exports.LOGIC_COMMANDS_LITERAL = exports.NOR = exports.OR = exports.AND = void 0;
const Symbols_1 = require("../Symbols");
exports.AND = 'and';
exports.OR = 'or';
exports.NOR = 'nor';
var LOGIC_COMMANDS_LITERAL;
(function (LOGIC_COMMANDS_LITERAL) {
    LOGIC_COMMANDS_LITERAL["AND"] = "and";
    LOGIC_COMMANDS_LITERAL["OR"] = "or";
    LOGIC_COMMANDS_LITERAL["NOR"] = "nor";
})(LOGIC_COMMANDS_LITERAL = exports.LOGIC_COMMANDS_LITERAL || (exports.LOGIC_COMMANDS_LITERAL = {}));
class LogicCommand {
    constructor(operator, operands, fieldName) {
        this._internalType = Symbols_1.SYMBOL_LOGIC_COMMAND;
        Object.defineProperties(this, {
            _internalType: {
                enumerable: false,
                configurable: false,
            },
        });
        // a: db.command.and([10,10]);
        this.operator = operator;
        this.operands = operands;
        this.fieldName = fieldName || Symbols_1.SYMBOL_UNSET_FIELD_NAME;
        if (this.fieldName !== Symbols_1.SYMBOL_UNSET_FIELD_NAME) {
            if (Array.isArray(operands)) {
                operands = [...operands];
                this.operands = operands;
                for (let i = 0, len = operands.length; i < len; i++) {
                    const query = operands[i];
                    if (isLogicCommand(query) || isQueryCommand(query)) {
                        operands[i] = query._setFieldName(this.fieldName);
                    }
                }
            }
            else {
                const query = operands;
                if (isLogicCommand(query) || isQueryCommand(query)) {
                    operands = query._setFieldName(this.fieldName);
                }
            }
        }
    }
    _setFieldName(fieldName) {
        const operands = this.operands.map((operand) => {
            if (operand instanceof LogicCommand) {
                return operand._setFieldName(fieldName);
            }
            return operand;
        });
        const command = new LogicCommand(this.operator, operands, fieldName);
        return command;
    }
    and(...args) {
        const expressions = Array.isArray(args[0]) ? args[0] : args;
        expressions.unshift(this);
        return new LogicCommand(LOGIC_COMMANDS_LITERAL.AND, expressions, this.fieldName);
    }
    or(...args) {
        const expressions = Array.isArray(args[0]) ? args[0] : args;
        expressions.unshift(this);
        return new LogicCommand(LOGIC_COMMANDS_LITERAL.OR, expressions, this.fieldName);
    }
}
exports.LogicCommand = LogicCommand;
function isLogicCommand(object) {
    return (object &&
        object instanceof LogicCommand &&
        object._internalType === Symbols_1.SYMBOL_LOGIC_COMMAND);
}
exports.isLogicCommand = isLogicCommand;
// 如果是queryCommand 肯定继承自 LoginCommand
function isQueryCommand(object) {
    return (object &&
        object instanceof LogicCommand &&
        object._internalType === Symbols_1.SYMBOL_QUERY_COMMAND);
}
exports.default = LogicCommand;
//# sourceMappingURL=logic.js.map