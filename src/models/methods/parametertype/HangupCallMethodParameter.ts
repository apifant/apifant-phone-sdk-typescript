import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IHangupCallMethodParameter  {
    callId : string;
    q850Cause? : number;
}



export class HangupCallMethodParameter {

    private  _callId : string;
    /**
    * hangup with given Q850 if possible
    */
    private  _q850Cause? : number;

    constructor (params :IHangupCallMethodParameter) {
        ValidationManager.validateAttributes(params, ['callId'], ['callId', 'q850Cause']);


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
        this._q850Cause = params.q850Cause;


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

    get q850Cause(): number  | undefined {
        return this._q850Cause;
    }

    set q850Cause(q850Cause: number) {

        this._q850Cause = q850Cause;
    }

    toJSON():  IHangupCallMethodParameter  {
        return {
            callId: this._callId,
            q850Cause: this._q850Cause
        };
    }


}

class Builder {

    private  _callId : string;
    private  _q850Cause? : number;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    q850Cause(q850Cause: number) : this{
        this._q850Cause = q850Cause;
        return this;
    }


    build() : HangupCallMethodParameter {
        return new HangupCallMethodParameter({

            callId: this._callId,
            q850Cause: this._q850Cause,
        });
    }
}