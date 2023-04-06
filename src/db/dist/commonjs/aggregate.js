"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const bson_1 = require("bson");
const query_1 = require("./serializer/query");
const utils_1 = require("./utils/utils");
const type_1 = require("./utils/type");
const validate_1 = require("./validate");
const point_1 = require("./geo/point");
class Aggregation {
    constructor(db, collectionName, rawPipeline) {
        this._stages = [];
        if (db && collectionName) {
            this._db = db;
            this._request = new index_1.Db.reqClass(this._db.config);
            this._collectionName = collectionName;
            if (rawPipeline && rawPipeline.length > 0) {
                rawPipeline.forEach((stage) => {
                    validate_1.Validate.isValidAggregation(stage);
                    const stageName = Object.keys(stage)[0];
                    this._pipe(stageName, stage[stageName], true);
                });
            }
        }
    }
    async end() {
        if (!this._collectionName || !this._db) {
            throw new Error('Aggregation pipeline cannot send request');
        }
        const result = await this._request.send('database.aggregateDocuments', {
            collectionName: this._collectionName,
            stages: this._stages
        });
        if (result && result.data && result.data.list) {
            return {
                requestId: result.requestId,
                data: result.data.list.map(bson_1.EJSON.parse)
            };
        }
        return result;
    }
    unwrap() {
        return this._stages;
    }
    done() {
        return this._stages.map(({ stageKey, stageValue }) => {
            return {
                [stageKey]: JSON.parse(stageValue)
            };
        });
    }
    _pipe(stage, param, raw = false) {
        let transformParam = '';
        if (type_1.getType(param) === 'object') {
            transformParam = utils_1.stringifyByEJSON(param);
        }
        else {
            transformParam = JSON.stringify(param);
        }
        this._stages.push({
            stageKey: raw ? stage : `$${stage}`,
            stageValue: transformParam
        });
        return this;
    }
    addFields(param) {
        return this._pipe('addFields', param);
    }
    bucket(param) {
        return this._pipe('bucket', param);
    }
    bucketAuto(param) {
        return this._pipe('bucketAuto', param);
    }
    count(param) {
        return this._pipe('count', param);
    }
    geoNear(param) {
        if (param.query) {
            param.query = query_1.QuerySerializer.encode(param.query);
        }
        if (param.distanceMultiplier && typeof (param.distanceMultiplier) === 'number') {
            param.distanceMultiplier = param.distanceMultiplier;
        }
        if (param.near) {
            param.near = new point_1.Point(param.near.longitude, param.near.latitude).toJSON();
        }
        return this._pipe('geoNear', param);
    }
    group(param) {
        return this._pipe('group', param);
    }
    limit(param) {
        return this._pipe('limit', param);
    }
    match(param) {
        return this._pipe('match', query_1.QuerySerializer.encode(param));
    }
    project(param) {
        return this._pipe('project', param);
    }
    lookup(param) {
        return this._pipe('lookup', param);
    }
    replaceRoot(param) {
        return this._pipe('replaceRoot', param);
    }
    sample(param) {
        return this._pipe('sample', param);
    }
    skip(param) {
        return this._pipe('skip', param);
    }
    sort(param) {
        return this._pipe('sort', param);
    }
    sortByCount(param) {
        return this._pipe('sortByCount', param);
    }
    unwind(param) {
        return this._pipe('unwind', param);
    }
}
exports.default = Aggregation;