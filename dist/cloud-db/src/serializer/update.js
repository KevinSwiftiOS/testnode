"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSerializer = void 0;
const update_1 = require("../commands/update");
const operator_map_1 = require("../operator-map");
const util_1 = require("../util");
const common_1 = require("./common");
class UpdateSerializer {
    static encodeEJSON(query) {
        const stringifier = new UpdateSerializer();
        return (0, util_1.stringifyByEJSON)(stringifier.encodeUpdate(query));
    }
    encodeUpdate(query) {
        return this.encodeUpdateObject(query);
    }
    encodeUpdateObject(query) {
        // 设置key
        const flattened = (0, common_1.flattenQueryObject)(query);
        //  没转之前 {a.b: 生成一个command 操作 }
        for (const key in flattened) {
            if (/^\$/.test(key)) {
                continue;
            }
            let val = flattened[key];
            // 本期不支持更新command
            // $set
            val = (0, common_1.encodeInternalDataType)(val);
            flattened[key] = val;
            const $setCommand = new update_1.UpdateCommand(update_1.UPDATE_COMMANDS_LITERAL.SET, [val], key);
            // console.log('encodeUpdateObject', $setCommand);
            const condition = this.encodeUpdateCommand($setCommand);
            (0, common_1.mergeConditionAfterEncode)(flattened, condition, key);
        }
        /* 转换之后 {
        "$set": {
            "a.b": 111
        }
    }
      */
        return flattened;
    }
    encodeUpdateCommand(query) {
        return this.encodeFieldUpdateCommand(query);
    }
    encodeFieldUpdateCommand(query) {
        const $op = (0, operator_map_1.operatorToString)(query.operator);
        return {
            [$op]: {
                // 操作符
                [query.fieldName]: query.operands[0], // 操作的对象和值
            },
        };
    }
}
exports.UpdateSerializer = UpdateSerializer;
//# sourceMappingURL=update.js.map