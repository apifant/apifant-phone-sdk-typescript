import { SendRtpStateEnum } from "../../enums/SendRtpStateEnum.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface ISendRtpStateChangedEventParameter  {
    callId : string;
    sendRtpState : SendRtpStateEnum;
    rtpId : string;
    eventTime : string;
}



export class SendRtpStateChangedEventParameter {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    /**
    * WAITING - wait for media, others self-explanatory
    */
    private  _sendRtpState : SendRtpStateEnum;
    private  _rtpId : string;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;

    constructor (params :ISendRtpStateChangedEventParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'sendRtpState', 'rtpId', 'eventTime'], ['callId', 'sendRtpState', 'rtpId', 'eventTime']);

        this._sendRtpState = params.sendRtpState;
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

    get sendRtpState(): SendRtpStateEnum  {
        return this._sendRtpState;
    }

    set sendRtpState(sendRtpState: SendRtpStateEnum) {

        this._sendRtpState = sendRtpState;
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

    toJSON():  ISendRtpStateChangedEventParameter  {
        return {
            callId: this._callId,
            sendRtpState: this._sendRtpState,
            rtpId: this._rtpId,
            eventTime: this._eventTime
        };
    }


}

class Builder {

    private  _callId : string;
    private  _sendRtpState : SendRtpStateEnum;
    private  _rtpId : string;
    private  _eventTime : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    sendRtpState(sendRtpState: SendRtpStateEnum) : this{
        this._sendRtpState = sendRtpState;
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


    build() : SendRtpStateChangedEventParameter {
        return new SendRtpStateChangedEventParameter({

            callId: this._callId,
            sendRtpState: this._sendRtpState,
            rtpId: this._rtpId,
            eventTime: this._eventTime,
        });
    }
}