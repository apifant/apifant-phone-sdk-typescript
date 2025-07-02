import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IDeactivateGatewayMethodParameter  {
    gatewayName : string;
}



export class DeactivateGatewayMethodParameter {

    /**
    * name of the gateway. (See method return value addGatewayConfiguration.)
    */
    private  _gatewayName : string;

    constructor (params :IDeactivateGatewayMethodParameter) {
        ValidationManager.validateAttributes(params, ['gatewayName'], ['gatewayName']);


        if ( !/^.+$/.test(params.gatewayName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'gatewayName',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._gatewayName = params.gatewayName;



    }

    static builder(): Builder {
        return new Builder();
    }

    get gatewayName(): string  {
        return this._gatewayName;
    }

    set gatewayName(gatewayName: string) {
        if ( !/^.+$/.test(gatewayName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    gatewayName: 'gatewayName',
                    "$pattern": '^.+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._gatewayName = gatewayName;
    }

    toJSON():  IDeactivateGatewayMethodParameter  {
        return {
            gatewayName: this._gatewayName
        };
    }


}

class Builder {

    private  _gatewayName : string;


    gatewayName(gatewayName: string) : this{
        this._gatewayName = gatewayName;
        return this;
    }


    build() : DeactivateGatewayMethodParameter {
        return new DeactivateGatewayMethodParameter({

            gatewayName: this._gatewayName,
        });
    }
}