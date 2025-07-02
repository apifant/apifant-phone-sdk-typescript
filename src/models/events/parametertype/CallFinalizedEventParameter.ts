import { CallDataSchema, ICallDataSchema } from "../../schemas/CallDataSchema.js";
import { HangupSideEnum } from "../../enums/HangupSideEnum.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface ICallFinalizedEventParameter  {
    callId : string;
    callData : ICallDataSchema;
    eventTime : string;
    hubEventTime : string;
    connectDuration : number;
    hangupSide? : HangupSideEnum;
    hangupSipCause? : number;
    hangupSipPhrase? : string;
}



export class CallFinalizedEventParameter {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    private  _callData : CallDataSchema;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;
    /**
    * hubEventTime on Server
    */
    private  _hubEventTime : string;
    /**
    * duration in Milliseconds
    */
    private  _connectDuration : number;
    /**
    * who ended the call, the other side or our side
    */
    private  _hangupSide? : HangupSideEnum;
    /**
    * the sip response for a not connected outgoing call, empty for an incomming call or a connected call
    */
    private  _hangupSipCause? : number;
    /**
    * the sip response phrase from the remote party
    */
    private  _hangupSipPhrase? : string;

    constructor (params :ICallFinalizedEventParameter) {
        ValidationManager.validateAttributes(params, ['callId', 'callData', 'eventTime', 'hubEventTime', 'connectDuration'], ['callId', 'callData', 'eventTime', 'hubEventTime', 'connectDuration', 'hangupSide', 'hangupSipCause', 'hangupSipPhrase']);

        this._callData = new CallDataSchema(params.callData);
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
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(params.hubEventTime)) {
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
        this._connectDuration = params.connectDuration;
        if ((params.hangupSipCause && params.hangupSipCause < 100) || (params.hangupSipCause && params.hangupSipCause > 799)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'hangupSipCause',
                    $minValue : 100,
                    $maxValue : 799
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._hangupSipCause = params.hangupSipCause;
        this._hangupSipPhrase = params.hangupSipPhrase;
        this._hangupSide = params.hangupSide;

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

    get callData(): CallDataSchema  {
        return this._callData;
    }

    set callData(callData: CallDataSchema) {

        this._callData = callData;
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

    get hubEventTime(): string  {
        return this._hubEventTime;
    }

    set hubEventTime(hubEventTime: string) {
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(hubEventTime)) {
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

    get connectDuration(): number  {
        return this._connectDuration;
    }

    set connectDuration(connectDuration: number) {

        this._connectDuration = connectDuration;
    }

    get hangupSide(): HangupSideEnum  | undefined {
        return this._hangupSide;
    }

    set hangupSide(hangupSide: HangupSideEnum) {

        this._hangupSide = hangupSide;
    }

    get hangupSipCause(): number  | undefined {
        return this._hangupSipCause;
    }

    set hangupSipCause(hangupSipCause: number) {

        if ((hangupSipCause && hangupSipCause < 100) || (hangupSipCause && hangupSipCause > 799)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'hangupSipCause',
                    $minValue : 100,
                    $maxValue : 799
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._hangupSipCause = hangupSipCause;
    }

    get hangupSipPhrase(): string  | undefined {
        return this._hangupSipPhrase;
    }

    set hangupSipPhrase(hangupSipPhrase: string) {

        this._hangupSipPhrase = hangupSipPhrase;
    }

    toJSON():  ICallFinalizedEventParameter  {
        return {
            callId: this._callId,
            callData: this._callData.toJSON(),
            eventTime: this._eventTime,
            hubEventTime: this._hubEventTime,
            connectDuration: this._connectDuration,
            hangupSide: this._hangupSide,
            hangupSipCause: this._hangupSipCause,
            hangupSipPhrase: this._hangupSipPhrase
        };
    }


}

class Builder {

    private  _callId : string;
    private  _callData : CallDataSchema;
    private  _eventTime : string;
    private  _hubEventTime : string;
    private  _connectDuration : number;
    private  _hangupSide? : HangupSideEnum;
    private  _hangupSipCause? : number;
    private  _hangupSipPhrase? : string;


    callId(callId: string) : this{
        this._callId = callId;
        return this;
    }

    callData(param: ICallDataSchema) : this{
        this._callData = new CallDataSchema(param);
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

    connectDuration(connectDuration: number) : this{
        this._connectDuration = connectDuration;
        return this;
    }

    hangupSide(hangupSide: HangupSideEnum) : this{
        this._hangupSide = hangupSide;
        return this;
    }

    hangupSipCause(hangupSipCause: number) : this{
        this._hangupSipCause = hangupSipCause;
        return this;
    }

    hangupSipPhrase(hangupSipPhrase: string) : this{
        this._hangupSipPhrase = hangupSipPhrase;
        return this;
    }


    build() : CallFinalizedEventParameter {
        return new CallFinalizedEventParameter({

            callId: this._callId,
            callData: this._callData,
            eventTime: this._eventTime,
            hubEventTime: this._hubEventTime,
            connectDuration: this._connectDuration,
            hangupSide: this._hangupSide,
            hangupSipCause: this._hangupSipCause,
            hangupSipPhrase: this._hangupSipPhrase,
        });
    }
}