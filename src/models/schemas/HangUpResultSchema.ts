import { HangupResultEnum } from "../enums/HangupResultEnum.js";
import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface IHangUpResultSchema  {
    callId : string;
    hangupResult : HangupResultEnum;
    sipResult : string;
    q850Result? : string;
    resultTime : string;
}



export class HangUpResultSchema {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    /**
    * Result for this hangup operation JOB_CANCELED means an outbound call was never in Dialing, XXXXXXX_SIP_CANCELED means a non connected call canceled by sip command LOCAL_HANGUP means the call was was terminated by the webApi server, REMOTE_HANGUP means the call was terminated by the remote side (may occur in case of command overlap),
    */
    private  _hangupResult : HangupResultEnum;
    /**
    * todo
    */
    private  _sipResult : string;
    /**
    * todo
    */
    private  _q850Result? : string;
    /**
    * ResultTime on Server
    */
    private  _resultTime : string;

    constructor (params :IHangUpResultSchema) {
        ValidationManager.validateAttributes(params, ['callId', 'hangupResult', 'sipResult', 'resultTime'], ['callId', 'hangupResult', 'sipResult', 'resultTime', 'q850Result']);

        this._hangupResult = params.hangupResult;
        if (params.callId !== undefined &&  !/^[a-zA-Z0-9_-]+$/.test(params.callId)) {
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
        this._sipResult = params.sipResult;
        if (params.resultTime !== undefined &&  !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(params.resultTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'resultTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._resultTime = params.resultTime;
        this._q850Result = params.q850Result;


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

    get hangupResult(): HangupResultEnum  {
        return this._hangupResult;
    }

    set hangupResult(hangupResult: HangupResultEnum) {

        this._hangupResult = hangupResult;
    }

    get sipResult(): string  {
        return this._sipResult;
    }

    set sipResult(sipResult: string) {

        this._sipResult = sipResult;
    }

    get q850Result(): string  | undefined {
        return this._q850Result;
    }

    set q850Result(q850Result: string) {

        this._q850Result = q850Result;
    }

    get resultTime(): string  {
        return this._resultTime;
    }

    set resultTime(resultTime: string) {
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(resultTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    resultTime: 'resultTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._resultTime = resultTime;
    }

    toJSON():  IHangUpResultSchema  {
        return {
            callId: this._callId,
            hangupResult: this._hangupResult,
            sipResult: this._sipResult,
            q850Result: this._q850Result,
            resultTime: this._resultTime
        };
    }


}

