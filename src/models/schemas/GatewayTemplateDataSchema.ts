import { GatewayTemplatePropertySchema, IGatewayTemplatePropertySchema } from "./GatewayTemplatePropertySchema.js";
import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface IGatewayTemplateDataSchema  {
    templateName : string;
    templateProperties? : IGatewayTemplatePropertySchema [];
}



export class GatewayTemplateDataSchema {

    /**
    * name of template to use
    */
    private  _templateName : string;
    private  _templateProperties? : GatewayTemplatePropertySchema [];

    constructor (params :IGatewayTemplateDataSchema) {
        ValidationManager.validateAttributes(params, ['templateName'], ['templateName', 'templateProperties']);


        if (params.templateName !== undefined &&  !/^[a-zA-Z0-9_-]+(\.xml)?$/.test(params.templateName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'templateName',
                    "$pattern": '^[a-zA-Z0-9_-]+(\.xml)?$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._templateName = params.templateName;

        if (params.templateProperties !== undefined) this._templateProperties = params.templateProperties.map((item: any) => new GatewayTemplatePropertySchema({ key : item.key, defaultValue : item.defaultValue, isOptional : item.isOptional, description : item.description}));

    }



    get templateName(): string  {
        return this._templateName;
    }

    set templateName(templateName: string) {
        if ( !/^[a-zA-Z0-9_-]+(\.xml)?$/.test(templateName)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    templateName: 'templateName',
                    "$pattern": '^[a-zA-Z0-9_-]+(\.xml)?$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._templateName = templateName;
    }

    get templateProperties(): GatewayTemplatePropertySchema[]  | undefined {
        return this._templateProperties;
    }

    set templateProperties(templateProperties: IGatewayTemplatePropertySchema[]) {

        if (templateProperties !== undefined) this._templateProperties = templateProperties.map((item: any) => new GatewayTemplatePropertySchema({ key : item.key, defaultValue : item.defaultValue, isOptional : item.isOptional, description : item.description}));
    }

    toJSON():  IGatewayTemplateDataSchema  {
        return {
            templateName: this._templateName,
            templateProperties: this._templateProperties?.map(item => item.toJSON())
        };
    }


}

