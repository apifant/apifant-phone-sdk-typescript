import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IStopSendRtpMethodParameter  {
    callId : string;
    rtpId : string;
}



export class StopSendRtpMethodParameter {

    private  _callId : string;
    /**
    * ID of rtp session
    */
    private  _rtpId : string;

    constructor (params :IStopSendRtpMethodParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'rtpId'], ['callId', 'rtpId']);


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

    toJSON():  IStopSendRtpMethodParameter  {
        return {
            callId: this._callId,
            rtpId: this._rtpId
        };
    }


}

class Builder {

    private  _callId : string;
    private  _rtpId : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    rtpId(rtpId: string) : this{
        this._rtpId = rtpId;
        return this;
    }


    build() : StopSendRtpMethodParameter {
        return new StopSendRtpMethodParameter({

            callId: this._callId,
            rtpId: this._rtpId,
        });
    }
}