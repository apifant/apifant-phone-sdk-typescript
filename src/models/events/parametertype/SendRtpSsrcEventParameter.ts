import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface ISendRtpSsrcEventParameter  {
    callId : string;
    rightSsrc? : string;
    leftSsrc? : string;
    rtpId : string;
    payloadNumber : string;
    payloadName : string;
    millisecondsPerPacket : number;
    samplesPerSecond : number;
    eventTime : string;
}



export class SendRtpSsrcEventParameter {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    private  _rightSsrc? : string;
    private  _leftSsrc? : string;
    private  _rtpId : string;
    private  _payloadNumber : string;
    private  _payloadName : string;
    private  _millisecondsPerPacket : number;
    private  _samplesPerSecond : number;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;

    constructor (params :ISendRtpSsrcEventParameter) {
        ValidationManager.validateAttributes(params, ['eventTime', 'samplesPerSecond', 'callId', 'rtpId', 'payloadNumber', 'payloadName', 'millisecondsPerPacket'], ['eventTime', 'samplesPerSecond', 'callId', 'rtpId', 'payloadNumber', 'payloadName', 'millisecondsPerPacket', 'rightSsrc', 'leftSsrc']);


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
        this._rtpId = params.rtpId;
        if ( !/^\d+$/.test(params.payloadNumber)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'payloadNumber',
                    "$pattern": '^\d+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._payloadNumber = params.payloadNumber;
        if ( !/^.+$/.test(params.payloadName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'payloadName',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._payloadName = params.payloadName;
        if ((params.millisecondsPerPacket && params.millisecondsPerPacket < 0)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3025_FIELD_MIN_VALUE,
                data: {
                    $field: 'millisecondsPerPacket',
                    $minValue : 0
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._millisecondsPerPacket = params.millisecondsPerPacket;
        if ((params.samplesPerSecond && params.samplesPerSecond < 0)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3025_FIELD_MIN_VALUE,
                data: {
                    $field: 'samplesPerSecond',
                    $minValue : 0
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._samplesPerSecond = params.samplesPerSecond;
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
        if (params.rightSsrc !== undefined &&  !/^.+$/.test(params.rightSsrc)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'rightSsrc',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._rightSsrc = params.rightSsrc;
        if (params.leftSsrc !== undefined &&  !/^.+$/.test(params.leftSsrc)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'leftSsrc',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._leftSsrc = params.leftSsrc;


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

    get rightSsrc(): string  | undefined {
        return this._rightSsrc;
    }

    set rightSsrc(rightSsrc: string) {
        if (rightSsrc !== undefined &&  !/^.+$/.test(rightSsrc)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    rightSsrc: 'rightSsrc',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._rightSsrc = rightSsrc;
    }

    get leftSsrc(): string  | undefined {
        return this._leftSsrc;
    }

    set leftSsrc(leftSsrc: string) {
        if (leftSsrc !== undefined &&  !/^.+$/.test(leftSsrc)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    leftSsrc: 'leftSsrc',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._leftSsrc = leftSsrc;
    }

    get rtpId(): string  {
        return this._rtpId;
    }

    set rtpId(rtpId: string) {

        this._rtpId = rtpId;
    }

    get payloadNumber(): string  {
        return this._payloadNumber;
    }

    set payloadNumber(payloadNumber: string) {
        if ( !/^\d+$/.test(payloadNumber)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    payloadNumber: 'payloadNumber',
                    "$pattern": '^\d+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._payloadNumber = payloadNumber;
    }

    get payloadName(): string  {
        return this._payloadName;
    }

    set payloadName(payloadName: string) {
        if ( !/^.+$/.test(payloadName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    payloadName: 'payloadName',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._payloadName = payloadName;
    }

    get millisecondsPerPacket(): number  {
        return this._millisecondsPerPacket;
    }

    set millisecondsPerPacket(millisecondsPerPacket: number) {

        if ((millisecondsPerPacket && millisecondsPerPacket < 0)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3025_FIELD_MIN_VALUE,
                data: {
                    $field: 'millisecondsPerPacket',
                    $minValue : 0
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._millisecondsPerPacket = millisecondsPerPacket;
    }

    get samplesPerSecond(): number  {
        return this._samplesPerSecond;
    }

    set samplesPerSecond(samplesPerSecond: number) {

        if ((samplesPerSecond && samplesPerSecond < 0)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3025_FIELD_MIN_VALUE,
                data: {
                    $field: 'samplesPerSecond',
                    $minValue : 0
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._samplesPerSecond = samplesPerSecond;
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

    toJSON():  ISendRtpSsrcEventParameter  {
        return {
            callId: this._callId,
            rightSsrc: this._rightSsrc,
            leftSsrc: this._leftSsrc,
            rtpId: this._rtpId,
            payloadNumber: this._payloadNumber,
            payloadName: this._payloadName,
            millisecondsPerPacket: this._millisecondsPerPacket,
            samplesPerSecond: this._samplesPerSecond,
            eventTime: this._eventTime
        };
    }


}

class Builder {

    private  _callId : string;
    private  _rightSsrc? : string;
    private  _leftSsrc? : string;
    private  _rtpId : string;
    private  _payloadNumber : string;
    private  _payloadName : string;
    private  _millisecondsPerPacket : number;
    private  _samplesPerSecond : number;
    private  _eventTime : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    rightSsrc(rightSsrc: string) : this{
        this._rightSsrc = rightSsrc;
        return this;
    }

    leftSsrc(leftSsrc: string) : this{
        this._leftSsrc = leftSsrc;
        return this;
    }

    rtpId(rtpId: string) : this{
        this._rtpId = rtpId;
        return this;
    }

    payloadNumber(payloadNumber: string) : this{
        this._payloadNumber = payloadNumber;
        return this;
    }

    payloadName(payloadName: string) : this{
        this._payloadName = payloadName;
        return this;
    }

    millisecondsPerPacket(millisecondsPerPacket: number) : this{
        this._millisecondsPerPacket = millisecondsPerPacket;
        return this;
    }

    samplesPerSecond(samplesPerSecond: number) : this{
        this._samplesPerSecond = samplesPerSecond;
        return this;
    }

    eventTime(eventTime: string) : this{
        this._eventTime = eventTime;
        return this;
    }


    build() : SendRtpSsrcEventParameter {
        return new SendRtpSsrcEventParameter({

            callId: this._callId,
            rightSsrc: this._rightSsrc,
            leftSsrc: this._leftSsrc,
            rtpId: this._rtpId,
            payloadNumber: this._payloadNumber,
            payloadName: this._payloadName,
            millisecondsPerPacket: this._millisecondsPerPacket,
            samplesPerSecond: this._samplesPerSecond,
            eventTime: this._eventTime,
        });
    }
}