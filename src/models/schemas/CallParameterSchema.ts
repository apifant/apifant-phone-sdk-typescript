import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface ICallParameterSchema  {
    callId : string;
    targetNumber : string;
    originatingNumber : string;
    gatewayName : string;
    inviteTimeout? : number;
}



export class CallParameterSchema {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    private  _targetNumber : string;
    private  _originatingNumber : string;
    private  _gatewayName : string;
    /**
    * this integer defines how many seconds the system will wait for a response to the invitation message sent to the gateway, Default Value: 600
    */
    private  _inviteTimeout? : number = 600;

    constructor (params :ICallParameterSchema) {
        ValidationManager.validateAttributes(params, ['callId', 'targetNumber', 'originatingNumber', 'gatewayName'], ['callId', 'targetNumber', 'originatingNumber', 'gatewayName', 'inviteTimeout']);


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
        if (params.targetNumber !== undefined &&  !/^\+{0,1}\d{4,}$/.test(params.targetNumber)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'targetNumber',
                    "$pattern": '^\+{0,1}\d{4,}$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._targetNumber = params.targetNumber;
        if (params.originatingNumber !== undefined &&  !/^(\+{0,1}\d{4,}|anonymous)$/.test(params.originatingNumber)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'originatingNumber',
                    "$pattern": '^(\+{0,1}\d{4,}|anonymous)$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._originatingNumber = params.originatingNumber;
        if (params.gatewayName !== undefined &&  !/^.*$/.test(params.gatewayName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'gatewayName',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._gatewayName = params.gatewayName;
        if ((params.inviteTimeout && params.inviteTimeout < 1)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3025_FIELD_MIN_VALUE,
                data: {
                    $field: 'inviteTimeout',
                    $minValue : 1
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._inviteTimeout = params.inviteTimeout ?? 600;


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

    get targetNumber(): string  {
        return this._targetNumber;
    }

    set targetNumber(targetNumber: string) {
        if ( !/^\+{0,1}\d{4,}$/.test(targetNumber)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    targetNumber: 'targetNumber',
                    "$pattern": '^\+{0,1}\d{4,}$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._targetNumber = targetNumber;
    }

    get originatingNumber(): string  {
        return this._originatingNumber;
    }

    set originatingNumber(originatingNumber: string) {
        if ( !/^(\+{0,1}\d{4,}|anonymous)$/.test(originatingNumber)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    originatingNumber: 'originatingNumber',
                    "$pattern": '^(\+{0,1}\d{4,}|anonymous)$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._originatingNumber = originatingNumber;
    }

    get gatewayName(): string  {
        return this._gatewayName;
    }

    set gatewayName(gatewayName: string) {
        if ( !/^.*$/.test(gatewayName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    gatewayName: 'gatewayName',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._gatewayName = gatewayName;
    }

    get inviteTimeout(): number  | undefined {
        return this._inviteTimeout;
    }

    set inviteTimeout(inviteTimeout: number) {

        if ((inviteTimeout && inviteTimeout < 1)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3025_FIELD_MIN_VALUE,
                data: {
                    $field: 'inviteTimeout',
                    $minValue : 1
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._inviteTimeout = inviteTimeout;
    }

    toJSON():  ICallParameterSchema  {
        return {
            callId: this._callId,
            targetNumber: this._targetNumber,
            originatingNumber: this._originatingNumber,
            gatewayName: this._gatewayName,
            inviteTimeout: this._inviteTimeout
        };
    }


}

