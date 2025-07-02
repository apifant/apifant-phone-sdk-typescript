import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IPlayBackErrorEventParameter  {
    callId : string;
    uri : string;
    errorMessage : string;
    eventTime : string;
}



export class PlayBackErrorEventParameter {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    private  _uri : string;
    /**
    * detailed error description
    */
    private  _errorMessage : string;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;

    constructor (params :IPlayBackErrorEventParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'uri', 'errorMessage', 'eventTime'], ['callId', 'uri', 'errorMessage', 'eventTime']);


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
        this._uri = params.uri;
        this._errorMessage = params.errorMessage;
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(params.eventTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'eventTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._eventTime = params.eventTime;



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

        this._uri = uri;
    }

    get errorMessage(): string  {
        return this._errorMessage;
    }

    set errorMessage(errorMessage: string) {

        this._errorMessage = errorMessage;
    }

    get eventTime(): string  {
        return this._eventTime;
    }

    set eventTime(eventTime: string) {
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(eventTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    eventTime: 'eventTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._eventTime = eventTime;
    }

    toJSON():  IPlayBackErrorEventParameter  {
        return {
            callId: this._callId,
            uri: this._uri,
            errorMessage: this._errorMessage,
            eventTime: this._eventTime
        };
    }


}

class Builder {

    private  _callId : string;
    private  _uri : string;
    private  _errorMessage : string;
    private  _eventTime : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    uri(uri: string) : this{
        this._uri = uri;
        return this;
    }

    errorMessage(errorMessage: string) : this{
        this._errorMessage = errorMessage;
        return this;
    }

    eventTime(eventTime: string) : this{
        this._eventTime = eventTime;
        return this;
    }


    build() : PlayBackErrorEventParameter {
        return new PlayBackErrorEventParameter({

            callId: this._callId,
            uri: this._uri,
            errorMessage: this._errorMessage,
            eventTime: this._eventTime,
        });
    }
}