import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IStartRecordingMethodReturnType  {
    eventTime? : string;
    recordingFilename? : string;
}



export class StartRecordingMethodReturnType {

    /**
    * eventTime on Server
    */
    private  _eventTime? : string;
    /**
    * ID of recording. Actually the name of the file on the server, composed of the SUID of the call and the filename specified by the client.  With this name the file can be found in the file server.
    */
    private  _recordingFilename? : string;

    constructor (params :IStartRecordingMethodReturnType) {
        ValidationManager.validateAttributes(params, [], ['eventTime', 'recordingFilename']);



        if (params.eventTime !== undefined &&  !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(params.eventTime)) {
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
        if (params.recordingFilename !== undefined &&  !/^[a-zA-Z0-9_-]+\.wav$/.test(params.recordingFilename)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'recordingFilename',
                    "$pattern": '^[a-zA-Z0-9_-]+\.wav$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._recordingFilename = params.recordingFilename;


    }



    get eventTime(): string  | undefined {
        return this._eventTime;
    }

    set eventTime(eventTime: string) {
        if (eventTime !== undefined &&  !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(eventTime)) {
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

    get recordingFilename(): string  | undefined {
        return this._recordingFilename;
    }

    set recordingFilename(recordingFilename: string) {
        if (recordingFilename !== undefined &&  !/^[a-zA-Z0-9_-]+\.wav$/.test(recordingFilename)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    recordingFilename: 'recordingFilename',
                    "$pattern": '^[a-zA-Z0-9_-]+\.wav$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._recordingFilename = recordingFilename;
    }

    toJSON():  IStartRecordingMethodReturnType  {
        return {
            eventTime: this._eventTime,
            recordingFilename: this._recordingFilename
        };
    }


}

