import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface ISendRtpMethodParameter  {
    callId : string;
    ipv4 : string;
    leftChannel? : number;
    rightChannel? : number;
}



export class SendRtpMethodParameter {

    private  _callId : string;
    private  _ipv4 : string;
    /**
    * Port for readChannel, 0 if no stream is requested
    */
    private  _leftChannel? : number;
    /**
    * Port for writeChannel, 0 if no stream is requested
    */
    private  _rightChannel? : number;

    constructor (params :ISendRtpMethodParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'ipv4'], ['callId', 'ipv4', 'leftChannel', 'rightChannel']);


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
        if ( !/(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(params.ipv4)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'ipv4',
                    "$pattern": '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._ipv4 = params.ipv4;
        if ((params.leftChannel && params.leftChannel < 1000) || (params.leftChannel && params.leftChannel > 65535)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'leftChannel',
                    $minValue : 1000,
                    $maxValue : 65535
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._leftChannel = params.leftChannel;
        if ((params.rightChannel && params.rightChannel < 1000) || (params.rightChannel && params.rightChannel > 65535)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'rightChannel',
                    $minValue : 1000,
                    $maxValue : 65535
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._rightChannel = params.rightChannel;


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

    get ipv4(): string  {
        return this._ipv4;
    }

    set ipv4(ipv4: string) {
        if ( !/(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipv4)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    ipv4: 'ipv4',
                    "$pattern": '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._ipv4 = ipv4;
    }

    get leftChannel(): number  | undefined {
        return this._leftChannel;
    }

    set leftChannel(leftChannel: number) {

        if ((leftChannel && leftChannel < 1000) || (leftChannel && leftChannel > 65535)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'leftChannel',
                    $minValue : 1000,
                    $maxValue : 65535
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._leftChannel = leftChannel;
    }

    get rightChannel(): number  | undefined {
        return this._rightChannel;
    }

    set rightChannel(rightChannel: number) {

        if ((rightChannel && rightChannel < 1000) || (rightChannel && rightChannel > 65535)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'rightChannel',
                    $minValue : 1000,
                    $maxValue : 65535
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._rightChannel = rightChannel;
    }

    toJSON():  ISendRtpMethodParameter  {
        return {
            callId: this._callId,
            ipv4: this._ipv4,
            leftChannel: this._leftChannel,
            rightChannel: this._rightChannel
        };
    }


}

class Builder {

    private  _callId : string;
    private  _ipv4 : string;
    private  _leftChannel? : number;
    private  _rightChannel? : number;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    ipv4(ipv4: string) : this{
        this._ipv4 = ipv4;
        return this;
    }

    leftChannel(leftChannel: number) : this{
        this._leftChannel = leftChannel;
        return this;
    }

    rightChannel(rightChannel: number) : this{
        this._rightChannel = rightChannel;
        return this;
    }


    build() : SendRtpMethodParameter {
        return new SendRtpMethodParameter({

            callId: this._callId,
            ipv4: this._ipv4,
            leftChannel: this._leftChannel,
            rightChannel: this._rightChannel,
        });
    }
}