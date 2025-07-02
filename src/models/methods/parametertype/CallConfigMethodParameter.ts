import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface ICallConfigMethodParameter  {
    enableRecording : boolean;
    maxCallDuration? : number;
    fileName : string;
    targetNumber : string;
    originatingNumber : string;
    gatewayName : string;
}



export class CallConfigMethodParameter {

    private  _enableRecording : boolean;
    private  _maxCallDuration? : number = 1020;
    private  _fileName : string;
    private  _targetNumber : string;
    private  _originatingNumber : string;
    private  _gatewayName : string;

    constructor (params :ICallConfigMethodParameter) {
        ValidationManager.validateAttributes(params, ['enableRecording', 'fileName', 'targetNumber', 'originatingNumber', 'gatewayName'], ['enableRecording', 'fileName', 'targetNumber', 'originatingNumber', 'gatewayName', 'maxCallDuration']);


        this._enableRecording = params.enableRecording;
        if ( !/^[a-zA-Z0-9_-]+\.wav$/.test(params.fileName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'fileName',
                    "$pattern": '^[a-zA-Z0-9_-]+\.wav$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._fileName = params.fileName;
        if ( !/^\+{0,1}\d{4,}$/.test(params.targetNumber)) {
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
        if ( !/^(\+{0,1}\d{4,}|anonymous)$/.test(params.originatingNumber)) {
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
        if ( !/^.*$/.test(params.gatewayName)) {
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
        this._maxCallDuration = params.maxCallDuration ?? 1020;


    }

    static builder(): Builder {
        return new Builder();
    }

    get enableRecording(): boolean  {
        return this._enableRecording;
    }

    set enableRecording(enableRecording: boolean) {

        this._enableRecording = enableRecording;
    }

    get maxCallDuration(): number  | undefined {
        return this._maxCallDuration;
    }

    set maxCallDuration(maxCallDuration: number) {

        this._maxCallDuration = maxCallDuration;
    }

    get fileName(): string  {
        return this._fileName;
    }

    set fileName(fileName: string) {
        if ( !/^[a-zA-Z0-9_-]+\.wav$/.test(fileName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    fileName: 'fileName',
                    "$pattern": '^[a-zA-Z0-9_-]+\.wav$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._fileName = fileName;
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

    toJSON():  ICallConfigMethodParameter  {
        return {
            enableRecording: this._enableRecording,
            maxCallDuration: this._maxCallDuration,
            fileName: this._fileName,
            targetNumber: this._targetNumber,
            originatingNumber: this._originatingNumber,
            gatewayName: this._gatewayName
        };
    }


}

class Builder {

    private  _enableRecording : boolean;
    private  _maxCallDuration? : number = 1020;
    private  _fileName : string;
    private  _targetNumber : string;
    private  _originatingNumber : string;
    private  _gatewayName : string;


    enableRecording(enableRecording: boolean) : this{
        this._enableRecording = enableRecording;
        return this;
    }

    maxCallDuration(maxCallDuration: number) : this{
        this._maxCallDuration = maxCallDuration;
        return this;
    }

    fileName(fileName: string) : this{
        this._fileName = fileName;
        return this;
    }

    targetNumber(targetNumber: string) : this{
        this._targetNumber = targetNumber;
        return this;
    }

    originatingNumber(originatingNumber: string) : this{
        this._originatingNumber = originatingNumber;
        return this;
    }

    gatewayName(gatewayName: string) : this{
        this._gatewayName = gatewayName;
        return this;
    }


    build() : CallConfigMethodParameter {
        return new CallConfigMethodParameter({

            enableRecording: this._enableRecording,
            maxCallDuration: this._maxCallDuration,
            fileName: this._fileName,
            targetNumber: this._targetNumber,
            originatingNumber: this._originatingNumber,
            gatewayName: this._gatewayName,
        });
    }
}