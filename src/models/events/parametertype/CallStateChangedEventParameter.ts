import { CallStateEnum } from "../../enums/CallStateEnum.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface ICallStateChangedEventParameter  {
    callState : CallStateEnum;
    callId : string;
    serverCallId : string;
    eventTime : string;
    hubEventTime : string;
}



export class CallStateChangedEventParameter {

    private  _callState : CallStateEnum;
    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    /**
    * ServerCallID
    */
    private  _serverCallId : string;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;
    /**
    * hubEventTime on Server
    */
    private  _hubEventTime : string;

    constructor (params :ICallStateChangedEventParameter) {
        ValidationManager.validateAttributes(params, ['callState', 'callId', 'serverCallId', 'eventTime', 'hubEventTime'], ['callState', 'callId', 'serverCallId', 'eventTime', 'hubEventTime']);

        this._callState = params.callState;
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
        this._serverCallId = params.serverCallId;
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
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(params.hubEventTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'hubEventTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._hubEventTime = params.hubEventTime;



    }

    static builder(): Builder {
        return new Builder();
    }

    get callState(): CallStateEnum  {
        return this._callState;
    }

    set callState(callState: CallStateEnum) {

        this._callState = callState;
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

    get serverCallId(): string  {
        return this._serverCallId;
    }

    set serverCallId(serverCallId: string) {

        this._serverCallId = serverCallId;
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

    get hubEventTime(): string  {
        return this._hubEventTime;
    }

    set hubEventTime(hubEventTime: string) {
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(hubEventTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    hubEventTime: 'hubEventTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._hubEventTime = hubEventTime;
    }

    toJSON():  ICallStateChangedEventParameter  {
        return {
            callState: this._callState,
            callId: this._callId,
            serverCallId: this._serverCallId,
            eventTime: this._eventTime,
            hubEventTime: this._hubEventTime
        };
    }


}

class Builder {

    private  _callState : CallStateEnum;
    private  _callId : string;
    private  _serverCallId : string;
    private  _eventTime : string;
    private  _hubEventTime : string;


    callState(callState: CallStateEnum) : this{
        this._callState = callState;
        return this;
    }

    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    serverCallId(serverCallId: string) : this{
        this._serverCallId = serverCallId;
        return this;
    }

    eventTime(eventTime: string) : this{
        this._eventTime = eventTime;
        return this;
    }

    hubEventTime(hubEventTime: string) : this{
        this._hubEventTime = hubEventTime;
        return this;
    }


    build() : CallStateChangedEventParameter {
        return new CallStateChangedEventParameter({

            callState: this._callState,
            callId: this._callId,
            serverCallId: this._serverCallId,
            eventTime: this._eventTime,
            hubEventTime: this._hubEventTime,
        });
    }
}