import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IConfigureGatewayMethodParameter  {
    username : string;
    password : string;
    templateName : string;
}



export class ConfigureGatewayMethodParameter {

    private  _username : string;
    private  _password : string;
    private  _templateName : string;

    constructor (params :IConfigureGatewayMethodParameter) {
        ValidationManager.validateAttributes(params, ['username', 'password', 'templateName'], ['username', 'password', 'templateName']);


        if ( !/^.*$/.test(params.username)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'username',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._username = params.username;
        if ( !/^.*$/.test(params.password)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'password',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._password = params.password;
        if ( !/^[a-zA-Z0-9_-]+(\.xml)?$/.test(params.templateName)) {
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



    }

    static builder(): Builder {
        return new Builder();
    }

    get username(): string  {
        return this._username;
    }

    set username(username: string) {
        if ( !/^.*$/.test(username)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    username: 'username',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._username = username;
    }

    get password(): string  {
        return this._password;
    }

    set password(password: string) {
        if ( !/^.*$/.test(password)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    password: 'password',
                    "$pattern": '^.*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._password = password;
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

    toJSON():  IConfigureGatewayMethodParameter  {
        return {
            username: this._username,
            password: this._password,
            templateName: this._templateName
        };
    }


}

class Builder {

    private  _username : string;
    private  _password : string;
    private  _templateName : string;


    username(username: string) : this{
        this._username = username;
        return this;
    }

    password(password: string) : this{
        this._password = password;
        return this;
    }

    templateName(templateName: string) : this{
        this._templateName = templateName;
        return this;
    }


    build() : ConfigureGatewayMethodParameter {
        return new ConfigureGatewayMethodParameter({

            username: this._username,
            password: this._password,
            templateName: this._templateName,
        });
    }
}