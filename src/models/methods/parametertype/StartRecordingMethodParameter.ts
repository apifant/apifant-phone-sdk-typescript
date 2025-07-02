import { RecordingChannelDataSchema, IRecordingChannelDataSchema } from "../../schemas/RecordingChannelDataSchema.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IStartRecordingMethodParameter  {
    callId : string;
    fileName : string;
    leftChannel : IRecordingChannelDataSchema;
    rightChannel : IRecordingChannelDataSchema;
}



export class StartRecordingMethodParameter {

    private  _callId : string;
    private  _fileName : string;
    /**
    * The recording mode for the left recording channel.
    */
    private  _leftChannel : RecordingChannelDataSchema;
    /**
    * The recording mode for the right recording channel.
    */
    private  _rightChannel : RecordingChannelDataSchema;

    constructor (params :IStartRecordingMethodParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'fileName', 'leftChannel', 'rightChannel'], ['callId', 'fileName', 'leftChannel', 'rightChannel']);

        this._leftChannel = new RecordingChannelDataSchema(params.leftChannel);
        this._rightChannel = new RecordingChannelDataSchema(params.rightChannel);
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

    get leftChannel(): RecordingChannelDataSchema  {
        return this._leftChannel;
    }

    set leftChannel(leftChannel: RecordingChannelDataSchema) {

        this._leftChannel = leftChannel;
    }

    get rightChannel(): RecordingChannelDataSchema  {
        return this._rightChannel;
    }

    set rightChannel(rightChannel: RecordingChannelDataSchema) {

        this._rightChannel = rightChannel;
    }

    toJSON():  IStartRecordingMethodParameter  {
        return {
            callId: this._callId,
            fileName: this._fileName,
            leftChannel: this._leftChannel.toJSON(),
            rightChannel: this._rightChannel.toJSON()
        };
    }


}

class Builder {

    private  _callId : string;
    private  _fileName : string;
    private  _leftChannel : RecordingChannelDataSchema;
    private  _rightChannel : RecordingChannelDataSchema;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    fileName(fileName: string) : this{
        this._fileName = fileName;
        return this;
    }

    leftChannel(param: IRecordingChannelDataSchema) : this{
        this._leftChannel = new RecordingChannelDataSchema(param);
        return this;
    }

    rightChannel(param: IRecordingChannelDataSchema) : this{
        this._rightChannel = new RecordingChannelDataSchema(param);
        return this;
    }


    build() : StartRecordingMethodParameter {
        return new StartRecordingMethodParameter({

            callId: this._callId,
            fileName: this._fileName,
            leftChannel: this._leftChannel,
            rightChannel: this._rightChannel,
        });
    }
}