import { LogicCommand } from '../commands/logic';
import { UPDATE_COMMANDS_LITERAL, UpdateCommand } from '../commands/update';
import { operatorToString } from '../operator-map';
import { stringifyByEJSON } from '../util';
import {
  encodeInternalDataType,
  flattenQueryObject,
  mergeConditionAfterEncode,
} from './common';

export type IQueryCondition = Record<string, any> | LogicCommand;

export interface IUpdateCondition {
  [key: string]: any;
}

export class UpdateSerializer {
  static encodeEJSON(query: IQueryCondition | UpdateCommand): string {
    const stringifier = new UpdateSerializer();

    return stringifyByEJSON(stringifier.encodeUpdate(query));
  }

  encodeUpdate(query: IQueryCondition | UpdateCommand): IUpdateCondition {
    return this.encodeUpdateObject(query);
  }

  encodeUpdateObject(query: Record<string, any>): IQueryCondition {
    // 设置key
    const flattened = flattenQueryObject(query);
    for (const key in flattened) {
      if (/^\$/.test(key)) {
        continue;
      }

      let val = flattened[key];
      // 本期不支持更新command
      // $set
      val = encodeInternalDataType(val);
      flattened[key] = val;
      const $setCommand = new UpdateCommand(
        UPDATE_COMMANDS_LITERAL.SET,
        [val],
        key
      );
      const condition = this.encodeUpdateCommand($setCommand);
      mergeConditionAfterEncode(flattened, condition, key);
    }

    return flattened;
  }

  encodeUpdateCommand(query: UpdateCommand): IQueryCondition {
    return this.encodeFieldUpdateCommand(query);
  }

  encodeFieldUpdateCommand(query: UpdateCommand): IQueryCondition {
    const $op = operatorToString(query.operator);
    return {
      [$op]: {
        [query.fieldName as string]: query.operands[0],
      },
    };
  }
}
