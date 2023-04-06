import { Db } from './index';
import { EJSON } from 'bson';
import { QuerySerializer } from './serializer/query';
import { stringifyByEJSON } from './utils/utils';
import { getType } from './utils/type';
import { Validate } from './validate';
import { Point } from './geo/point';
export default class Aggregation {
    constructor(db, collectionName, rawPipeline) {
        this._stages = [];
        if (db && collectionName) {
            this._db = db;
            this._request = new Db.reqClass(this._db.config);
            this._collectionName = collectionName;
            if (rawPipeline && rawPipeline.length > 0) {
                rawPipeline.forEach((stage) => {
                    Validate.isValidAggregation(stage);
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
                data: result.data.list.map(EJSON.parse)
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
        if (getType(param) === 'object') {
            transformParam = stringifyByEJSON(param);
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
            param.query = QuerySerializer.encode(param.query);
        }
        if (param.distanceMultiplier && typeof (param.distanceMultiplier) === 'number') {
            param.distanceMultiplier = param.distanceMultiplier;
        }
        if (param.near) {
            param.near = new Point(param.near.longitude, param.near.latitude).toJSON();
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
        return this._pipe('match', QuerySerializer.encode(param));
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
