import { DtmfSourceEnum } from "../../enums/DtmfSourceEnum.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IDtmfSignalEventParameter  {
    dtmfDigit : string;
    dtmfSource : DtmfSourceEnum;
    dtmfDuration? : number;
    eventTime : string;
    callId : string;
}



export class DtmfSignalEventParameter {

    /**
    * detected digit
    */
    private  _dtmfDigit : string;
    /**
    * RTP: rtp-payload INBAND_AUDIO: tone detection  ENDPOINT: sip-info
    */
    private  _dtmfSource : DtmfSourceEnum;
    /**
    * duration (milliseconds)
    */
    private  _dtmfDuration? : number;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;
    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;

    constructor (params :IDtmfSignalEventParameter) {
        ValidationManager.validateAttributes(params, ['dtmfDigit', 'dtmfSource', 'eventTime', 'callId'], ['dtmfDigit', 'dtmfSource', 'eventTime', 'callId', 'dtmfDuration']);

        this._dtmfSource = params.dtmfSource;
        if ( !/^[1234567890ABCD#*]$/.test(params.dtmfDigit)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'dtmfDigit',
                    "$pattern": '^[1234567890ABCD#*]$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._dtmfDigit = params.dtmfDigit;
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
        if ((params.dtmfDuration && params.dtmfDuration < 0)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3025_FIELD_MIN_VALUE,
                data: {
                    $field: 'dtmfDuration',
                    $minValue : 0
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._dtmfDuration = params.dtmfDuration;


    }

    static builder(): Builder {
        return new Builder();
    }

    get dtmfDigit(): string  {
        return this._dtmfDigit;
    }

    set dtmfDigit(dtmfDigit: string) {
        if ( !/^[1234567890ABCD#*]$/.test(dtmfDigit)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    dtmfDigit: 'dtmfDigit',
                    "$pattern": '^[1234567890ABCD#*]$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._dtmfDigit = dtmfDigit;
    }

    get dtmfSource(): DtmfSourceEnum  {
        return this._dtmfSource;
    }

    set dtmfSource(dtmfSource: DtmfSourceEnum) {

        this._dtmfSource = dtmfSource;
    }

    get dtmfDuration(): number  | undefined {
        return this._dtmfDuration;
    }

    set dtmfDuration(dtmfDuration: number) {

        if ((dtmfDuration && dtmfDuration < 0)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3025_FIELD_MIN_VALUE,
                data: {
                    $field: 'dtmfDuration',
                    $minValue : 0
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._dtmfDuration = dtmfDuration;
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

    toJSON():  IDtmfSignalEventParameter  {
        return {
            dtmfDigit: this._dtmfDigit,
            dtmfSource: this._dtmfSource,
            dtmfDuration: this._dtmfDuration,
            eventTime: this._eventTime,
            callId: this._callId
        };
    }


}

class Builder {

    private  _dtmfDigit : string;
    private  _dtmfSource : DtmfSourceEnum;
    private  _dtmfDuration? : number;
    private  _eventTime : string;
    private  _callId : string;


    dtmfDigit(dtmfDigit: string) : this{
        this._dtmfDigit = dtmfDigit;
        return this;
    }

    dtmfSource(dtmfSource: DtmfSourceEnum) : this{
        this._dtmfSource = dtmfSource;
        return this;
    }

    dtmfDuration(dtmfDuration: number) : this{
        this._dtmfDuration = dtmfDuration;
        return this;
    }

    eventTime(eventTime: string) : this{
        this._eventTime = eventTime;
        return this;
    }

    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }


    build() : DtmfSignalEventParameter {
        return new DtmfSignalEventParameter({

            dtmfDigit: this._dtmfDigit,
            dtmfSource: this._dtmfSource,
            dtmfDuration: this._dtmfDuration,
            eventTime: this._eventTime,
            callId: this._callId,
        });
    }
}