import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IDeactivateGatewayMethodReturnType  {
    eventTime? : string;
    gatewayName? : string;
}



export class DeactivateGatewayMethodReturnType {

    /**
    * eventTime on Server
    */
    private  _eventTime? : string;
    /**
    * name of the gateway
    */
    private  _gatewayName? : string;

    constructor (params :IDeactivateGatewayMethodReturnType) {
        ValidationManager.validateAttributes(params, [], ['eventTime', 'gatewayName']);



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
        if (params.gatewayName !== undefined &&  !/^.*$/.test(params.gatewayName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'gatewayName',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._gatewayName = params.gatewayName;


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

    get gatewayName(): string  | undefined {
        return this._gatewayName;
    }

    set gatewayName(gatewayName: string) {
        if (gatewayName !== undefined &&  !/^.*$/.test(gatewayName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    gatewayName: 'gatewayName',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._gatewayName = gatewayName;
    }

    toJSON():  IDeactivateGatewayMethodReturnType  {
        return {
            eventTime: this._eventTime,
            gatewayName: this._gatewayName
        };
    }


}

