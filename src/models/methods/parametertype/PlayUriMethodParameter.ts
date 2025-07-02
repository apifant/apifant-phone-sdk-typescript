import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IPlayUriMethodParameter  {
    uri : string;
    callId : string;
}



export class PlayUriMethodParameter {

    /**
    * uri (sample: http://freeswitch04.ttdev.local:8000/bittewartenbisVerbunden.wav)
    */
    private  _uri : string;
    private  _callId : string;

    constructor (params :IPlayUriMethodParameter) {
        ValidationManager.validateAttributes(params, ['uri', 'callId'], ['uri', 'callId']);


        if ( !/https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\/[a-zA-Z0-9()]+\b(?:[a-zA-Z0-9:_\-\+\/=]*).wav$/.test(params.uri)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'uri',
                    "$pattern": 'https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\/[a-zA-Z0-9()]+\b(?:[a-zA-Z0-9:_\-\+\/=]*).wav$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._uri = params.uri;
        if ( !/^[a-zA-Z0-9_-]+$/.test(params.callId)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'callId',
                    "$pattern": '^[a-zA-Z0-9_-]+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._callId = params.callId;



    }

    static builder(): Builder {
        return new Builder();
    }

    get uri(): string  {
        return this._uri;
    }

    set uri(uri: string) {
        if ( !/https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\/[a-zA-Z0-9()]+\b(?:[a-zA-Z0-9:_\-\+\/=]*).wav$/.test(uri)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    uri: 'uri',
                    "$pattern": 'https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\/[a-zA-Z0-9()]+\b(?:[a-zA-Z0-9:_\-\+\/=]*).wav$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._uri = uri;
    }

    get callId(): string  {
        return this._callId;
    }

    set callId(callId: string) {
        if ( !/^[a-zA-Z0-9_-]+$/.test(callId)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    callId: 'callId',
                    "$pattern": '^[a-zA-Z0-9_-]+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._callId = callId;
    }

    toJSON():  IPlayUriMethodParameter  {
        return {
            uri: this._uri,
            callId: this._callId
        };
    }


}

class Builder {

    private  _uri : string;
    private  _callId : string;


    uri(uri: string) : this{
        this._uri = uri;
        return this;
    }

    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }


    build() : PlayUriMethodParameter {
        return new PlayUriMethodParameter({

            uri: this._uri,
            callId: this._callId,
        });
    }
}