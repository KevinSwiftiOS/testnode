"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Geo = require("./geo/index");
const collection_1 = require("./collection");
const command_1 = require("./command");
const index_1 = require("./serverDate/index");
const index_2 = require("./regexp/index");
const index_3 = require("./transaction/index");
const index_4 = require("./ObjectId/index");
var query_1 = require("./query");
exports.Query = query_1.Query;
var collection_2 = require("./collection");
exports.CollectionReference = collection_2.CollectionReference;
var document_1 = require("./document");
exports.DocumentReference = document_1.DocumentReference;
class Db {
    constructor(config) {
        this.config = config;
        this.Geo = Geo;
        this.serverDate = index_1.ServerDateConstructor;
        this.command = command_1.Command;
        this.RegExp = index_2.RegExpConstructor;
        this.ObjectId = index_4.ObjectIdConstructor;
        this.startTransaction = index_3.startTransaction;
        this.runTransaction = index_3.runTransaction;
    }
    collection(collName) {
        if (!collName) {
            throw new Error('Collection name is required');
        }
        return new collection_1.CollectionReference(this, collName);
    }
    createCollection(collName) {
        let request = new Db.reqClass(this.config);
        const params = {
            collectionName: collName
        };
        return request.send('database.addCollection', params);
    }
}
exports.Db = Db;
