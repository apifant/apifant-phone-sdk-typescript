import { GatewayDataSchema, IGatewayDataSchema } from "../../schemas/GatewayDataSchema.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IGetGatewaysMethodReturnType  {
    eventTime? : string;
    gateways : IGatewayDataSchema [];
}



export class GetGatewaysMethodReturnType {

    /**
    * eventTime on Server
    */
    private  _eventTime? : string;
    private  _gateways : GatewayDataSchema [];

    constructor (params :IGetGatewaysMethodReturnType) {
        ValidationManager.validateAttributes(params, ['gateways'], ['gateways', 'eventTime']);

        this._gateways = params.gateways.map((item: any) => new GatewayDataSchema({ name : item.name, gatewayState : item.gatewayState}));

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

    get gateways(): GatewayDataSchema[]  {
        return this._gateways;
    }

    set gateways(gateways: IGatewayDataSchema[]) {

        this._gateways = gateways.map((item: any) => new GatewayDataSchema({ name : item.name, gatewayState : item.gatewayState}));
    }

    toJSON():  IGetGatewaysMethodReturnType  {
        return {
            eventTime: this._eventTime,
            gateways: this._gateways.map(item => item.toJSON())
        };
    }


}

