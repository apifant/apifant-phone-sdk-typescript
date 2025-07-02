import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IFinishRecordingMethodParameter  {
    callId? : string;
    fileName? : string;
}



export class FinishRecordingMethodParameter {

    private  _callId? : string;
    /**
    * fileName of running recording
    */
    private  _fileName? : string;

    constructor (params :IFinishRecordingMethodParameter) {
        ValidationManager.validateAttributes(params, [], ['callId', 'fileName']);



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
        if (params.fileName !== undefined &&  !/^[a-zA-Z0-9_-]+\.wav$/.test(params.fileName)) {
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

    get fileName(): string  | undefined {
        return this._fileName;
    }

    set fileName(fileName: string) {
        if (fileName !== undefined &&  !/^[a-zA-Z0-9_-]+\.wav$/.test(fileName)) {
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

    toJSON():  IFinishRecordingMethodParameter  {
        return {
            callId: this._callId,
            fileName: this._fileName
        };
    }


}

class Builder {

    private  _callId? : string;
    private  _fileName? : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    fileName(fileName: string) : this{
        this._fileName = fileName;
        return this;
    }


    build() : FinishRecordingMethodParameter {
        return new FinishRecordingMethodParameter({

            callId: this._callId,
            fileName: this._fileName,
        });
    }
}