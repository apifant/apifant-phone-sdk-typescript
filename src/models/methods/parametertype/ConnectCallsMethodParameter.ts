import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IConnectCallsMethodParameter  {
    callId : string;
    destinationCallId : string;
}



export class ConnectCallsMethodParameter {

    /**
    * The call id from the call with callState ACTIVE.
    */
    private  _callId : string;
    /**
    * The call id from the destination.
    */
    private  _destinationCallId : string;

    constructor (params :IConnectCallsMethodParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'destinationCallId'], ['callId', 'destinationCallId']);


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
        if ( !/^[a-zA-Z0-9_-]+$/.test(params.destinationCallId)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'destinationCallId',
                    "$pattern": '^[a-zA-Z0-9_-]+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._destinationCallId = params.destinationCallId;



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

    get destinationCallId(): string  {
        return this._destinationCallId;
    }

    set destinationCallId(destinationCallId: string) {
        if ( !/^[a-zA-Z0-9_-]+$/.test(destinationCallId)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    destinationCallId: 'destinationCallId',
                    "$pattern": '^[a-zA-Z0-9_-]+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._destinationCallId = destinationCallId;
    }

    toJSON():  IConnectCallsMethodParameter  {
        return {
            callId: this._callId,
            destinationCallId: this._destinationCallId
        };
    }


}

class Builder {

    private  _callId : string;
    private  _destinationCallId : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    destinationCallId(destinationCallId: string) : this{
        this._destinationCallId = destinationCallId;
        return this;
    }


    build() : ConnectCallsMethodParameter {
        return new ConnectCallsMethodParameter({

            callId: this._callId,
            destinationCallId: this._destinationCallId,
        });
    }
}