import { KeyValuePairSchema, IKeyValuePairSchema } from "../../schemas/KeyValuePairSchema.js";
import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IAddGatewayConfigurationMethodParameter  {
    templateName? : string;
    properties? : IKeyValuePairSchema [];
}



export class AddGatewayConfigurationMethodParameter {

    /**
    * name of template to use
    */
    private  _templateName? : string;
    /**
    * an array of key value pairs
    */
    private  _properties? : KeyValuePairSchema [];

    constructor (params :IAddGatewayConfigurationMethodParameter) {
        ValidationManager.validateAttributes(params, [], ['templateName', 'properties']);



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
        if (params.properties !== undefined) this._properties = params.properties.map((item: any) => new KeyValuePairSchema({ key : item.key, value : item.value}));

    }

    static builder(): Builder {
        return new Builder();
    }

    get templateName(): string  | undefined {
        return this._templateName;
    }

    set templateName(templateName: string) {
        if (templateName !== undefined &&  !/^[a-zA-Z0-9_-]+(\.xml)?$/.test(templateName)) {
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

    get properties(): KeyValuePairSchema[]  | undefined {
        return this._properties;
    }

    set properties(properties: IKeyValuePairSchema[]) {

        if (properties !== undefined) this._properties = properties.map((item: any) => new KeyValuePairSchema({ key : item.key, value : item.value}));
    }

    toJSON():  IAddGatewayConfigurationMethodParameter  {
        return {
            templateName: this._templateName,
            properties: this._properties?.map(item => item.toJSON())
        };
    }


}

class Builder {

    private  _templateName? : string;
    private  _properties? : KeyValuePairSchema [];


    templateName(templateName: string) : this{
        this._templateName = templateName;
        return this;
    }

    propertiesItem(key : string,
    value : string,): this {
        if (!this._properties) {
            this._properties = [];
        }
        this._properties.push(new KeyValuePairSchema({ key : key, value : value }));
        return this;
    }properties(properties: {key : string,
    value : string,} [] ) : this{
        this._properties = properties.map(item => new KeyValuePairSchema({key: item.key,value: item.value,}));
        return this;
    }


    build() : AddGatewayConfigurationMethodParameter {
        return new AddGatewayConfigurationMethodParameter({

            templateName: this._templateName,
            properties: this._properties,
        });
    }
}