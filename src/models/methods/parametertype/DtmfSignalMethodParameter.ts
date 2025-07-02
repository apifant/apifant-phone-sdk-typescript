import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IDtmfSignalMethodParameter  {
    timeout? : number;
    callId : string;
}



export class DtmfSignalMethodParameter {

    private readonly  _timeout? : number = 10;
    private readonly  _callId : string;

    constructor (params :IDtmfSignalMethodParameter) {
        ValidationManager.validateAttributes(params, ['callId'], ['callId', 'timeout']);


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
        this._timeout = params.timeout ?? 10;


    }

    static builder(): Builder {
        return new Builder();
    }

    get timeout(): number  | undefined {
        return this._timeout;
    }

    get callId(): string  {
        return this._callId;
    }

    toJSON():  IDtmfSignalMethodParameter  {
        return {
            timeout: this._timeout,
            callId: this._callId
        };
    }


}

class Builder {

    private readonly  _timeout? : number = 10;
    private readonly  _callId : string;





    build() : DtmfSignalMethodParameter {
        return new DtmfSignalMethodParameter({

            timeout: this._timeout,
            callId: this._callId,
        });
    }
}