import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface ISendRingingMethodParameter  {
    callId? : string;
}



export class SendRingingMethodParameter {

    private  _callId? : string;

    constructor (params :ISendRingingMethodParameter) {
        ValidationManager.validateAttributes(params, [], ['callId']);



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


    }

    static builder(): Builder {
        return new Builder();
    }

    get callId(): string  | undefined {
        return this._callId;
    }

    set callId(callId: string) {
        if (callId !== undefined &&  !/^[a-zA-Z0-9_-]+$/.test(callId)) {
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

    toJSON():  ISendRingingMethodParameter  {
        return {
            callId: this._callId
        };
    }


}

class Builder {

    private  _callId? : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }


    build() : SendRingingMethodParameter {
        return new SendRingingMethodParameter({

            callId: this._callId,
        });
    }
}