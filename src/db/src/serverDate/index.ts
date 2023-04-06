import { InternalSymbol, SYMBOL_SERVER_DATE } from '../helper/symbol';

export class ServerDate {
  readonly offset: number;

  constructor({ offset = 0 } = {}) {
    this.offset = offset;
  }

  get _internalType(): InternalSymbol {
    return SYMBOL_SERVER_DATE;
  }

  parse(): Record<string, any> {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      $tcb_server_date: {
        offset: this.offset,
      },
    };
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function ServerDateConstructor(opt) {
  return new ServerDate(opt);
}
