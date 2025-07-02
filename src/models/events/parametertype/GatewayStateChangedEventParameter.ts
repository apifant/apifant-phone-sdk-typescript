import { GatewayDataSchema, IGatewayDataSchema } from "../../schemas/GatewayDataSchema.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IGatewayStateChangedEventParameter  {
    gateway : IGatewayDataSchema;
    eventTime : string;
    hubEventTime : string;
}



export class GatewayStateChangedEventParameter {

    private  _gateway : GatewayDataSchema;
    /**
    * eventTime on Server
    */
    private  _eventTime : string;
    /**
    * hubEventTime on Server
    */
    private  _hubEventTime : string;

    constructor (params :IGatewayStateChangedEventParameter) {
        ValidationManager.validateAttributes(params, ['gateway', 'eventTime', 'hubEventTime'], ['gateway', 'eventTime', 'hubEventTime']);

        this._gateway = new GatewayDataSchema(params.gateway);
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



    }

    static builder(): Builder {
        return new Builder();
    }

    get gateway(): GatewayDataSchema  {
        return this._gateway;
    }

    set gateway(gateway: GatewayDataSchema) {

        this._gateway = gateway;
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

    toJSON():  IGatewayStateChangedEventParameter  {
        return {
            gateway: this._gateway.toJSON(),
            eventTime: this._eventTime,
            hubEventTime: this._hubEventTime
        };
    }


}

class Builder {

    private  _gateway : GatewayDataSchema;
    private  _eventTime : string;
    private  _hubEventTime : string;


    gateway(param: IGatewayDataSchema) : this{
        this._gateway = new GatewayDataSchema(param);
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


    build() : GatewayStateChangedEventParameter {
        return new GatewayStateChangedEventParameter({

            gateway: this._gateway,
            eventTime: this._eventTime,
            hubEventTime: this._hubEventTime,
        });
    }
}