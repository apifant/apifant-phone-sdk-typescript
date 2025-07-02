import { RecordingStateEnum } from "../../enums/RecordingStateEnum.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IRecordingStateChangedEventParameter  {
    callId : string;
    recordingState : RecordingStateEnum;
    fileName : string;
    eventTime : string;
    hubEventTime? : string;
}



export class RecordingStateChangedEventParameter {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    /**
    * WAITING - wait for media, others self-explanatory
    */
    private  _recordingState : RecordingStateEnum;
    private  _fileName : string;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;
    /**
    * hubEventTime on Server
    */
    private  _hubEventTime? : string;

    constructor (params :IRecordingStateChangedEventParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'recordingState', 'fileName', 'eventTime'], ['callId', 'recordingState', 'fileName', 'eventTime', 'hubEventTime']);

        this._recordingState = params.recordingState;
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
        this._fileName = params.fileName;
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(params.eventTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'eventTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._eventTime = params.eventTime;
        if (params.hubEventTime !== undefined &&  !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(params.hubEventTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'hubEventTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._hubEventTime = params.hubEventTime;


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

    get recordingState(): RecordingStateEnum  {
        return this._recordingState;
    }

    set recordingState(recordingState: RecordingStateEnum) {

        this._recordingState = recordingState;
    }

    get fileName(): string  {
        return this._fileName;
    }

    set fileName(fileName: string) {

        this._fileName = fileName;
    }

    get eventTime(): string  {
        return this._eventTime;
    }

    set eventTime(eventTime: string) {
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(eventTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    eventTime: 'eventTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._eventTime = eventTime;
    }

    get hubEventTime(): string  | undefined {
        return this._hubEventTime;
    }

    set hubEventTime(hubEventTime: string) {
        if (hubEventTime !== undefined &&  !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(hubEventTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    hubEventTime: 'hubEventTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._hubEventTime = hubEventTime;
    }

    toJSON():  IRecordingStateChangedEventParameter  {
        return {
            callId: this._callId,
            recordingState: this._recordingState,
            fileName: this._fileName,
            eventTime: this._eventTime,
            hubEventTime: this._hubEventTime
        };
    }


}

class Builder {

    private  _callId : string;
    private  _recordingState : RecordingStateEnum;
    private  _fileName : string;
    private  _eventTime : string;
    private  _hubEventTime? : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    recordingState(recordingState: RecordingStateEnum) : this{
        this._recordingState = recordingState;
        return this;
    }

    fileName(fileName: string) : this{
        this._fileName = fileName;
        return this;
    }

    eventTime(eventTime: string) : this{
        this._eventTime = eventTime;
        return this;
    }

    hubEventTime(hubEventTime: string) : this{
        this._hubEventTime = hubEventTime;
        return this;
    }


    build() : RecordingStateChangedEventParameter {
        return new RecordingStateChangedEventParameter({

            callId: this._callId,
            recordingState: this._recordingState,
            fileName: this._fileName,
            eventTime: this._eventTime,
            hubEventTime: this._hubEventTime,
        });
    }
}