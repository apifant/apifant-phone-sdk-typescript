import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IRejectCallMethodParameter  {
    callId : string;
    sipCause : number;
    sipPhrase? : string;
}



export class RejectCallMethodParameter {

    private  _callId : string;
    private  _sipCause : number;
    private  _sipPhrase? : string;

    constructor (params :IRejectCallMethodParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'sipCause'], ['callId', 'sipCause', 'sipPhrase']);


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
        if ((params.sipCause && params.sipCause < 100) || (params.sipCause && params.sipCause > 799)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'sipCause',
                    $minValue : 100,
                    $maxValue : 799
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._sipCause = params.sipCause;
        this._sipPhrase = params.sipPhrase;


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

    get sipCause(): number  {
        return this._sipCause;
    }

    set sipCause(sipCause: number) {

        if ((sipCause && sipCause < 100) || (sipCause && sipCause > 799)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'sipCause',
                    $minValue : 100,
                    $maxValue : 799
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._sipCause = sipCause;
    }

    get sipPhrase(): string  | undefined {
        return this._sipPhrase;
    }

    set sipPhrase(sipPhrase: string) {

        this._sipPhrase = sipPhrase;
    }

    toJSON():  IRejectCallMethodParameter  {
        return {
            callId: this._callId,
            sipCause: this._sipCause,
            sipPhrase: this._sipPhrase
        };
    }


}

class Builder {

    private  _callId : string;
    private  _sipCause : number;
    private  _sipPhrase? : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    sipCause(sipCause: number) : this{
        this._sipCause = sipCause;
        return this;
    }

    sipPhrase(sipPhrase: string) : this{
        this._sipPhrase = sipPhrase;
        return this;
    }


    build() : RejectCallMethodParameter {
        return new RejectCallMethodParameter({

            callId: this._callId,
            sipCause: this._sipCause,
            sipPhrase: this._sipPhrase,
        });
    }
}