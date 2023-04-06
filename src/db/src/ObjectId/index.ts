import { InternalSymbol, SYMBOL_OBJECTID } from '../helper/symbol';

export class ObjectId {
  id: string;

  constructor({ id = '' } = {}) {
    this.id = id;
  }

  get _internalType(): InternalSymbol {
    return SYMBOL_OBJECTID;
  }

  parse(): Record<string, any> {
    return {
      $oid: this.id,
    };
  }
}

export function ObjectIdConstructor(opt): ObjectId {
  return new ObjectId(opt);
}
