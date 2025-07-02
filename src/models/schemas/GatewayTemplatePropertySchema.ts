import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface IGatewayTemplatePropertySchema  {
    key : string;
    defaultValue? : string;
    isOptional : boolean;
    description? : string;
}



export class GatewayTemplatePropertySchema {

    /**
    * key of the configuration element
    */
    private  _key : string;
    /**
    * default value of the configuration element
    */
    private  _defaultValue? : string;
    /**
    * is this configuration element optional
    */
    private  _isOptional : boolean;
    /**
    * description of the configuration element
    */
    private  _description? : string;

    constructor (params :IGatewayTemplatePropertySchema) {
        ValidationManager.validateAttributes(params, ['key', 'isOptional'], ['key', 'isOptional', 'defaultValue', 'description']);


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
        this._isOptional = params.isOptional;
        if (params.defaultValue !== undefined &&  !/^.*$/.test(params.defaultValue)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'defaultValue',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._defaultValue = params.defaultValue;
        this._description = params.description;


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

    get defaultValue(): string  | undefined {
        return this._defaultValue;
    }

    set defaultValue(defaultValue: string) {
        if (defaultValue !== undefined &&  !/^.*$/.test(defaultValue)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    defaultValue: 'defaultValue',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._defaultValue = defaultValue;
    }

    get isOptional(): boolean  {
        return this._isOptional;
    }

    set isOptional(isOptional: boolean) {

        this._isOptional = isOptional;
    }

    get description(): string  | undefined {
        return this._description;
    }

    set description(description: string) {

        this._description = description;
    }

    toJSON():  IGatewayTemplatePropertySchema  {
        return {
            key: this._key,
            defaultValue: this._defaultValue,
            isOptional: this._isOptional,
            description: this._description
        };
    }


}

