"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbol_1 = require("../helper/symbol");
class RegExp {
    constructor({ regexp, options }) {
        if (!regexp) {
            throw new TypeError('regexp must be a string');
        }
        this.$regularExpression = {
            pattern: regexp || '',
            options: options || ''
        };
    }
    parse() {
        return {
            $regularExpression: {
                pattern: this.$regularExpression.pattern,
                options: this.$regularExpression.options
            }
        };
    }
    get _internalType() {
        return symbol_1.SYMBOL_REGEXP;
    }
}
exports.RegExp = RegExp;
function RegExpConstructor(param) {
    return new RegExp(param);
}
exports.RegExpConstructor = RegExpConstructor;