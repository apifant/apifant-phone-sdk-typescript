import { PlayBackStateEnum } from "../../enums/PlayBackStateEnum.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IPlayBackStateChangedEventParameter  {
    callId : string;
    playBackState : PlayBackStateEnum;
    uri : string;
    eventTime : string;
}



export class PlayBackStateChangedEventParameter {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    /**
    * WAITING - wait for  permission to send media, others self-explanatory
    */
    private  _playBackState : PlayBackStateEnum;
    private  _uri : string;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;

    constructor (params :IPlayBackStateChangedEventParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'playBackState', 'uri', 'eventTime'], ['callId', 'playBackState', 'uri', 'eventTime']);

        this._playBackState = params.playBackState;
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
        this._uri = params.uri;
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

    get playBackState(): PlayBackStateEnum  {
        return this._playBackState;
    }

    set playBackState(playBackState: PlayBackStateEnum) {

        this._playBackState = playBackState;
    }

    get uri(): string  {
        return this._uri;
    }

    set uri(uri: string) {

        this._uri = uri;
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

    toJSON():  IPlayBackStateChangedEventParameter  {
        return {
            callId: this._callId,
            playBackState: this._playBackState,
            uri: this._uri,
            eventTime: this._eventTime
        };
    }


}

class Builder {

    private  _callId : string;
    private  _playBackState : PlayBackStateEnum;
    private  _uri : string;
    private  _eventTime : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    playBackState(playBackState: PlayBackStateEnum) : this{
        this._playBackState = playBackState;
        return this;
    }

    uri(uri: string) : this{
        this._uri = uri;
        return this;
    }

    eventTime(eventTime: string) : this{
        this._eventTime = eventTime;
        return this;
    }


    build() : PlayBackStateChangedEventParameter {
        return new PlayBackStateChangedEventParameter({

            callId: this._callId,
            playBackState: this._playBackState,
            uri: this._uri,
            eventTime: this._eventTime,
        });
    }
}