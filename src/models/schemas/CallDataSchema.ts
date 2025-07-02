import { CallDirectionEnum } from "../enums/CallDirectionEnum.js";
import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface ICallDataSchema  {
    callId : string;
    targetNumber : string;
    originatingNumber : string;
    serverCallId : string;
    callDirection? : CallDirectionEnum;
    sipCallId? : string;
    gatewayName? : string;
}



export class CallDataSchema {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    private  _targetNumber : string;
    private  _originatingNumber : string;
    /**
    * ServerCallID
    */
    private  _serverCallId : string;
    private  _callDirection? : CallDirectionEnum;
    private  _sipCallId? : string;
    /**
    * the gateway name for this call
    */
    private  _gatewayName? : string;

    constructor (params :ICallDataSchema) {
        ValidationManager.validateAttributes(params, ['callId', 'targetNumber', 'originatingNumber', 'serverCallId'], ['callId', 'targetNumber', 'originatingNumber', 'serverCallId', 'callDirection', 'sipCallId', 'gatewayName']);


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
        if (params.targetNumber !== undefined &&  !/^(\+{0,1}\d{4,}|anonymous)$/.test(params.targetNumber)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'targetNumber',
                    "$pattern": '^(\+{0,1}\d{4,}|anonymous)$',
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
        this._serverCallId = params.serverCallId;
        this._sipCallId = params.sipCallId;
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
        this._callDirection = params.callDirection;

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
        if ( !/^(\+{0,1}\d{4,}|anonymous)$/.test(targetNumber)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    targetNumber: 'targetNumber',
                    "$pattern": '^(\+{0,1}\d{4,}|anonymous)$',
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

    get serverCallId(): string  {
        return this._serverCallId;
    }

    set serverCallId(serverCallId: string) {

        this._serverCallId = serverCallId;
    }

    get callDirection(): CallDirectionEnum  | undefined {
        return this._callDirection;
    }

    set callDirection(callDirection: CallDirectionEnum) {

        this._callDirection = callDirection;
    }

    get sipCallId(): string  | undefined {
        return this._sipCallId;
    }

    set sipCallId(sipCallId: string) {

        this._sipCallId = sipCallId;
    }

    get gatewayName(): string  | undefined {
        return this._gatewayName;
    }

    set gatewayName(gatewayName: string) {
        if (gatewayName !== undefined &&  !/^.*$/.test(gatewayName)) {
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

    toJSON():  ICallDataSchema  {
        return {
            callId: this._callId,
            targetNumber: this._targetNumber,
            originatingNumber: this._originatingNumber,
            serverCallId: this._serverCallId,
            callDirection: this._callDirection,
            sipCallId: this._sipCallId,
            gatewayName: this._gatewayName
        };
    }


}

