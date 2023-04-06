import { LOGIC_COMMANDS_LITERAL } from './commands/logic';
import { QUERY_COMMANDS_LITERAL } from './commands/query';
import { UPDATE_COMMANDS_LITERAL } from './commands/update';

export const OperatorMap: { [key: string]: string } = {};

// eslint-disable-next-line guard-for-in
for (const key in QUERY_COMMANDS_LITERAL) {
  OperatorMap[key] = '$' + key;
}

// eslint-disable-next-line guard-for-in
for (const key in LOGIC_COMMANDS_LITERAL) {
  OperatorMap[key] = '$' + key;
}

// eslint-disable-next-line guard-for-in
for (const key in UPDATE_COMMANDS_LITERAL) {
  OperatorMap[key] = '$' + key;
}

// some exceptions
OperatorMap[QUERY_COMMANDS_LITERAL.NEQ] = '$ne';
OperatorMap[UPDATE_COMMANDS_LITERAL.REMOVE] = '$unset';
OperatorMap[UPDATE_COMMANDS_LITERAL.SHIFT] = '$pop'; // same as POP
OperatorMap[UPDATE_COMMANDS_LITERAL.UNSHIFT] = '$push'; // same as PUSH

export function operatorToString(operator: string): string {
  return OperatorMap[operator] || '$' + operator;
}
