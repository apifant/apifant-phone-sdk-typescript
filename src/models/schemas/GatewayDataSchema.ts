import { GatewayStateEnum } from "../enums/GatewayStateEnum.js";
import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface IGatewayDataSchema  {
    name : string;
    gatewayState : GatewayStateEnum;
}



export class GatewayDataSchema {

    /**
    * the gateway name
    */
    private  _name : string;
    /**
    * the gateway state.
    */
    private  _gatewayState : GatewayStateEnum;

    constructor (params :IGatewayDataSchema) {
        ValidationManager.validateAttributes(params, ['name', 'gatewayState'], ['name', 'gatewayState']);

        this._gatewayState = params.gatewayState;
        if (params.name !== undefined &&  !/^.*$/.test(params.name)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'name',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._name = params.name;



    }



    get name(): string  {
        return this._name;
    }

    set name(name: string) {
        if ( !/^.*$/.test(name)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                        name: 'name',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._name = name;
    }

    get gatewayState(): GatewayStateEnum  {
        return this._gatewayState;
    }

    set gatewayState(gatewayState: GatewayStateEnum) {

        this._gatewayState = gatewayState;
    }

    toJSON():  IGatewayDataSchema  {
        return {
                name: this._name,
            gatewayState: this._gatewayState
        };
    }


}

