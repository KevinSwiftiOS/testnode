import { SYMBOL_OBJECTID } from '../helper/symbol';
export class ObjectId {
    constructor({ id = '' } = {}) {
        this.id = id;
    }
    get _internalType() {
        return SYMBOL_OBJECTID;
    }
    parse() {
        return {
            $oid: this.id
        };
    }
}
export function ObjectIdConstructor(opt) {
    return new ObjectId(opt);
}