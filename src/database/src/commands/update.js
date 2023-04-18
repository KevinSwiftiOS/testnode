"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommand = exports.UPDATE_COMMANDS_LITERAL = void 0;
const Symbols_1 = require("../Symbols");
var UPDATE_COMMANDS_LITERAL;
(function (UPDATE_COMMANDS_LITERAL) {
    UPDATE_COMMANDS_LITERAL["SET"] = "set";
    UPDATE_COMMANDS_LITERAL["REMOVE"] = "remove";
    UPDATE_COMMANDS_LITERAL["INC"] = "inc";
    UPDATE_COMMANDS_LITERAL["MUL"] = "mul";
    UPDATE_COMMANDS_LITERAL["PUSH"] = "push";
    UPDATE_COMMANDS_LITERAL["PULL"] = "pull";
    UPDATE_COMMANDS_LITERAL["PULL_ALL"] = "pullAll";
    UPDATE_COMMANDS_LITERAL["POP"] = "pop";
    UPDATE_COMMANDS_LITERAL["SHIFT"] = "shift";
    UPDATE_COMMANDS_LITERAL["UNSHIFT"] = "unshift";
    UPDATE_COMMANDS_LITERAL["ADD_TO_SET"] = "addToSet";
    UPDATE_COMMANDS_LITERAL["BIT"] = "bit";
    UPDATE_COMMANDS_LITERAL["RENAME"] = "rename";
    UPDATE_COMMANDS_LITERAL["MAX"] = "max";
    UPDATE_COMMANDS_LITERAL["MIN"] = "min";
})(UPDATE_COMMANDS_LITERAL = exports.UPDATE_COMMANDS_LITERAL || (exports.UPDATE_COMMANDS_LITERAL = {}));
class UpdateCommand {
    constructor(operator, operands, fieldName) {
        this._internalType = Symbols_1.SYMBOL_UPDATE_COMMAND;
        Object.defineProperties(this, {
            _internalType: {
                enumerable: false,
                configurable: false,
            },
        });
        this.operator = operator;
        this.operands = operands;
        this.fieldName = fieldName || Symbols_1.SYMBOL_UNSET_FIELD_NAME;
    }
}
exports.UpdateCommand = UpdateCommand;
exports.default = UpdateCommand;
