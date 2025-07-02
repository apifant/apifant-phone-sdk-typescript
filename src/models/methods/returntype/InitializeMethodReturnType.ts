import { TimeZoneInformationSchema, ITimeZoneInformationSchema } from "../../schemas/TimeZoneInformationSchema.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IInitializeMethodReturnType  {
    sessionID? : string;
    apiVersion? : string;
    serverVersion? : string;
    greetings? : string;
    timezoneInformation? : ITimeZoneInformationSchema;
}



export class InitializeMethodReturnType {

    private  _sessionID? : string;
    private  _apiVersion? : string;
    private  _serverVersion? : string;
    private  _greetings? : string;
    private  _timezoneInformation? : TimeZoneInformationSchema;

    constructor (params :IInitializeMethodReturnType) {
        ValidationManager.validateAttributes(params, [], ['sessionID', 'apiVersion', 'serverVersion', 'greetings', 'timezoneInformation']);



        if (params.sessionID !== undefined &&  !/^\S+$/.test(params.sessionID)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'sessionID',
                    "$pattern": '^\S+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._sessionID = params.sessionID;
        if (params.apiVersion !== undefined &&  !/^\S+$/.test(params.apiVersion)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'apiVersion',
                    "$pattern": '^\S+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._apiVersion = params.apiVersion;
        if (params.serverVersion !== undefined &&  !/^\S+$/.test(params.serverVersion)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'serverVersion',
                    "$pattern": '^\S+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._serverVersion = params.serverVersion;
        this._greetings = params.greetings;
        if (params.timezoneInformation !== undefined) { this._timezoneInformation = new TimeZoneInformationSchema(params.timezoneInformation); }

    }



    get sessionID(): string  | undefined {
        return this._sessionID;
    }

    set sessionID(sessionID: string) {
        if (sessionID !== undefined &&  !/^\S+$/.test(sessionID)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    sessionID: 'sessionID',
                    "$pattern": '^\S+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._sessionID = sessionID;
    }

    get apiVersion(): string  | undefined {
        return this._apiVersion;
    }

    set apiVersion(apiVersion: string) {
        if (apiVersion !== undefined &&  !/^\S+$/.test(apiVersion)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    apiVersion: 'apiVersion',
                    "$pattern": '^\S+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._apiVersion = apiVersion;
    }

    get serverVersion(): string  | undefined {
        return this._serverVersion;
    }

    set serverVersion(serverVersion: string) {
        if (serverVersion !== undefined &&  !/^\S+$/.test(serverVersion)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    serverVersion: 'serverVersion',
                    "$pattern": '^\S+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._serverVersion = serverVersion;
    }

    get greetings(): string  | undefined {
        return this._greetings;
    }

    set greetings(greetings: string) {

        this._greetings = greetings;
    }

    get timezoneInformation(): TimeZoneInformationSchema  | undefined {
        return this._timezoneInformation;
    }

    set timezoneInformation(timezoneInformation: TimeZoneInformationSchema) {

        this._timezoneInformation = timezoneInformation;
    }

    toJSON():  IInitializeMethodReturnType  {
        return {
            sessionID: this._sessionID,
            apiVersion: this._apiVersion,
            serverVersion: this._serverVersion,
            greetings: this._greetings,
            timezoneInformation: this._timezoneInformation?.toJSON()
        };
    }


}

