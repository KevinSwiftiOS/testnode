import { LogicCommand } from '../commands/logic';
import {
  isUpdateCommand,
  UPDATE_COMMANDS_LITERAL,
  UpdateCommand,
} from '../commands/update';
import { SYMBOL_UNSET_FIELD_NAME } from '../helper/symbol';
import { operatorToString } from '../operator-map';
import { getType, isArray } from '../utils/type';
import { stringifyByEJSON } from '../utils/utils';
import {
  encodeInternalDataType,
  flattenQueryObject,
  mergeConditionAfterEncode,
} from './common';

export type IQueryCondition = Record<string, any> | LogicCommand;

export interface IUpdateCondition {
  [key: string]: any;
}

interface IPushModifiers {
  $each?: any[];
  $position?: number;
}

export class UpdateSerializer {
  static encode(query: IQueryCondition | UpdateCommand): IUpdateCondition {
    const stringifier = new UpdateSerializer();
    return stringifier.encodeUpdate(query);
  }

  static encodeEJSON(
    query: IQueryCondition | UpdateCommand,
    raw: boolean
  ): string {
    const stringifier = new UpdateSerializer();

    return stringifyByEJSON(raw ? query : stringifier.encodeUpdate(query));
  }

  encodeUpdate(query: IQueryCondition | UpdateCommand): IUpdateCondition {
    if (isUpdateCommand(query)) {
      return this.encodeUpdateCommand(query);
    }

    return getType(query) === 'object' ? this.encodeUpdateObject(query) : query;
  }

  encodeUpdateCommand(query: UpdateCommand): IQueryCondition {
    if (query.fieldName === SYMBOL_UNSET_FIELD_NAME) {
      throw new Error(
        'Cannot encode a comparison command with unset field name'
      );
    }

    switch (query.operator) {
      case UPDATE_COMMANDS_LITERAL.PUSH:
      case UPDATE_COMMANDS_LITERAL.PULL:
      case UPDATE_COMMANDS_LITERAL.PULL_ALL:
      case UPDATE_COMMANDS_LITERAL.POP:
      case UPDATE_COMMANDS_LITERAL.SHIFT:
      case UPDATE_COMMANDS_LITERAL.UNSHIFT:
      case UPDATE_COMMANDS_LITERAL.ADD_TO_SET: {
        return this.encodeArrayUpdateCommand(query);
      }

      default: {
        return this.encodeFieldUpdateCommand(query);
      }
    }
  }

  encodeFieldUpdateCommand(query: UpdateCommand): IQueryCondition {
    const $op = operatorToString(query.operator);

    switch (query.operator) {
      case UPDATE_COMMANDS_LITERAL.REMOVE: {
        return {
          [$op]: {
            [query.fieldName as string]: '',
          },
        };
      }

      default: {
        return {
          [$op]: {
            [query.fieldName as string]: query.operands[0],
          },
        };
      }
    }
  }

  encodeArrayUpdateCommand(query: UpdateCommand): IQueryCondition {
    const $op = operatorToString(query.operator);

    switch (query.operator) {
      case UPDATE_COMMANDS_LITERAL.PUSH: {
        const modifiers = isArray(query.operands)
          ? {
              $each: query.operands.map((element: any) =>
                encodeInternalDataType(element)
              ),
            }
          : query.operands;

        return {
          [$op]: {
            [query.fieldName as string]: modifiers,
          },
        };
      }

      case UPDATE_COMMANDS_LITERAL.UNSHIFT: {
        const modifiers: IPushModifiers = {
          $each: query.operands.map((element) =>
            encodeInternalDataType(element)
          ),
          $position: 0,
        };

        return {
          [$op]: {
            [query.fieldName as string]: modifiers,
          },
        };
      }

      case UPDATE_COMMANDS_LITERAL.POP: {
        return {
          [$op]: {
            [query.fieldName as string]: 1,
          },
        };
      }

      case UPDATE_COMMANDS_LITERAL.SHIFT: {
        return {
          [$op]: {
            [query.fieldName as string]: -1,
          },
        };
      }

      default: {
        return {
          [$op]: {
            [query.fieldName as string]: encodeInternalDataType(query.operands),
          },
        };
      }
    }
  }

  encodeUpdateObject(query: Record<string, any>): IQueryCondition {
    const flattened = flattenQueryObject(query);
    for (const key in flattened) {
      if (/^\$/.test(key)) {
        continue;
      }

      let val = flattened[key];
      if (isUpdateCommand(val)) {
        flattened[key] = val._setFieldName(key);
        const condition = this.encodeUpdateCommand(flattened[key]);
        mergeConditionAfterEncode(flattened, condition, key);
      } else {
        // $set
        // eslint-disable-next-line no-multi-assign
        flattened[key] = val = encodeInternalDataType(val);
        const $setCommand = new UpdateCommand(
          UPDATE_COMMANDS_LITERAL.SET,
          [val],
          key
        );
        const condition = this.encodeUpdateCommand($setCommand);
        mergeConditionAfterEncode(flattened, condition, key);
      }
    }

    return flattened;
  }
}
