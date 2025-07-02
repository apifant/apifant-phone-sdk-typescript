import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IPlayBackSeekMethodParameter  {
    callId : string;
    uri : string;
    seek : string;
}



export class PlayBackSeekMethodParameter {

    private  _callId : string;
    /**
    * uri (sample: http://freeswitch04.ttdev.local:8000/bittewartenbisVerbunden.wav)
    */
    private  _uri : string;
    /**
    * seek forwards or backwards in Milliseconds
    */
    private  _seek : string;

    constructor (params :IPlayBackSeekMethodParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'uri', 'seek'], ['callId', 'uri', 'seek']);


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
        if ( !/https?:\/\/(?:w{1,3}\.)?[^\s.]*(?:\.[a-z]+)+(?::\d+)?(\/[a-zA-Z0-9#]+\/?)*\.wav$/.test(params.uri)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'uri',
                    "$pattern": 'https?:\/\/(?:w{1,3}\.)?[^\s.]*(?:\.[a-z]+)+(?::\d+)?(\/[a-zA-Z0-9#]+\/?)*\.wav$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._uri = params.uri;
        if ( !/^[+-][1-9]\d+$/.test(params.seek)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'seek',
                    "$pattern": '^[+-][1-9]\d+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._seek = params.seek;



    }

    static builder(): Builder {
        return new Builder();
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

    get uri(): string  {
        return this._uri;
    }

    set uri(uri: string) {
        if ( !/https?:\/\/(?:w{1,3}\.)?[^\s.]*(?:\.[a-z]+)+(?::\d+)?(\/[a-zA-Z0-9#]+\/?)*\.wav$/.test(uri)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    uri: 'uri',
                    "$pattern": 'https?:\/\/(?:w{1,3}\.)?[^\s.]*(?:\.[a-z]+)+(?::\d+)?(\/[a-zA-Z0-9#]+\/?)*\.wav$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._uri = uri;
    }

    get seek(): string  {
        return this._seek;
    }

    set seek(seek: string) {
        if ( !/^[+-][1-9]\d+$/.test(seek)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    seek: 'seek',
                    "$pattern": '^[+-][1-9]\d+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._seek = seek;
    }

    toJSON():  IPlayBackSeekMethodParameter  {
        return {
            callId: this._callId,
            uri: this._uri,
            seek: this._seek
        };
    }


}

class Builder {

    private  _callId : string;
    private  _uri : string;
    private  _seek : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    uri(uri: string) : this{
        this._uri = uri;
        return this;
    }

    seek(seek: string) : this{
        this._seek = seek;
        return this;
    }


    build() : PlayBackSeekMethodParameter {
        return new PlayBackSeekMethodParameter({

            callId: this._callId,
            uri: this._uri,
            seek: this._seek,
        });
    }
}