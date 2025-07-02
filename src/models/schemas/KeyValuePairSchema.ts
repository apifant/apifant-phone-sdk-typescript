import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface IKeyValuePairSchema  {
    key : string;
    value : string;
}



export class KeyValuePairSchema {

    private  _key : string;
    private  _value : string;

    constructor (params :IKeyValuePairSchema) {
        ValidationManager.validateAttributes(params, ['key', 'value'], ['key', 'value']);


        if (params.key !== undefined &&  !/^.+$/.test(params.key)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'key',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._key = params.key;
        if (params.value !== undefined &&  !/^.*$/.test(params.value)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'value',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._value = params.value;



    }



    get key(): string  {
        return this._key;
    }

    set key(key: string) {
        if ( !/^.+$/.test(key)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    key: 'key',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._key = key;
    }

    get value(): string  {
        return this._value;
    }

    set value(value: string) {
        if ( !/^.*$/.test(value)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    value: 'value',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._value = value;
    }

    toJSON():  IKeyValuePairSchema  {
        return {
            key: this._key,
            value: this._value
        };
    }


}

