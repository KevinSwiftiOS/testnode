import { SYMBOL_OBJECTID } from '../Symbols';

export class ObjectId {
  id: string;

  constructor({ id = '' } = {}) {
    this.id = id;
  }

  get _internalType() {
    return SYMBOL_OBJECTID;
  }

  parse() {
    return {
      $oid: this.id,
    };
  }
}

export function ObjectIdConstructor(opt: any) {
  return new ObjectId(opt);
}
