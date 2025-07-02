import { GatewayTemplateDataSchema, IGatewayTemplateDataSchema } from "../../schemas/GatewayTemplateDataSchema.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IGetGatewayTemplatesMethodReturnType  {
    eventTime? : string;
    gatewayTemplates : IGatewayTemplateDataSchema [];
}



export class GetGatewayTemplatesMethodReturnType {

    /**
    * eventTime on Server
    */
    private  _eventTime? : string;
    private  _gatewayTemplates : GatewayTemplateDataSchema [];

    constructor (params :IGetGatewayTemplatesMethodReturnType) {
        ValidationManager.validateAttributes(params, ['gatewayTemplates'], ['gatewayTemplates', 'eventTime']);

        this._gatewayTemplates = params.gatewayTemplates.map((item: any) => new GatewayTemplateDataSchema({ templateName : item.templateName, templateProperties : item.templateProperties}));

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

    get gatewayTemplates(): GatewayTemplateDataSchema[]  {
        return this._gatewayTemplates;
    }

    set gatewayTemplates(gatewayTemplates: IGatewayTemplateDataSchema[]) {

        this._gatewayTemplates = gatewayTemplates.map((item: any) => new GatewayTemplateDataSchema({ templateName : item.templateName, templateProperties : item.templateProperties}));
    }

    toJSON():  IGetGatewayTemplatesMethodReturnType  {
        return {
            eventTime: this._eventTime,
            gatewayTemplates: this._gatewayTemplates.map(item => item.toJSON())
        };
    }


}

