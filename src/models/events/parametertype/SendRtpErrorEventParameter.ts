import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface ISendRtpErrorEventParameter  {
    callId : string;
    errorMessage : string;
    rtpId : string;
    eventTime : string;
}



export class SendRtpErrorEventParameter {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    private  _errorMessage : string;
    private  _rtpId : string;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;

    constructor (params :ISendRtpErrorEventParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'errorMessage', 'rtpId', 'eventTime'], ['callId', 'errorMessage', 'rtpId', 'eventTime']);


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
        if ( !/^.+$/.test(params.errorMessage)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'errorMessage',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._errorMessage = params.errorMessage;
        if ( !/^.+$/.test(params.rtpId)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'rtpId',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._rtpId = params.rtpId;
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

    get errorMessage(): string  {
        return this._errorMessage;
    }

    set errorMessage(errorMessage: string) {
        if ( !/^.+$/.test(errorMessage)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    errorMessage: 'errorMessage',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._errorMessage = errorMessage;
    }

    get rtpId(): string  {
        return this._rtpId;
    }

    set rtpId(rtpId: string) {
        if ( !/^.+$/.test(rtpId)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    rtpId: 'rtpId',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._rtpId = rtpId;
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

    toJSON():  ISendRtpErrorEventParameter  {
        return {
            callId: this._callId,
            errorMessage: this._errorMessage,
            rtpId: this._rtpId,
            eventTime: this._eventTime
        };
    }


}

class Builder {

    private  _callId : string;
    private  _errorMessage : string;
    private  _rtpId : string;
    private  _eventTime : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    errorMessage(errorMessage: string) : this{
        this._errorMessage = errorMessage;
        return this;
    }

    rtpId(rtpId: string) : this{
        this._rtpId = rtpId;
        return this;
    }

    eventTime(eventTime: string) : this{
        this._eventTime = eventTime;
        return this;
    }


    build() : SendRtpErrorEventParameter {
        return new SendRtpErrorEventParameter({

            callId: this._callId,
            errorMessage: this._errorMessage,
            rtpId: this._rtpId,
            eventTime: this._eventTime,
        });
    }
}