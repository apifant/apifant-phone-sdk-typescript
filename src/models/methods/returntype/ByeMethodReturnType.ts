import { ErrorManager } from "../../../managers/ErrorManager.js";
import { TTErrorCodes } from "../../enums/TTErrorCodes.js";
import logger from "../../../config/logger.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IByeMethodReturnType  {
    sessionDuration : number;
}



export class ByeMethodReturnType {

    /**
    * duration in seconds
    */
    private  _sessionDuration : number;

    constructor (params :IByeMethodReturnType) {
        ValidationManager.validateAttributes(params, ['sessionDuration'], ['sessionDuration']);


        this._sessionDuration = params.sessionDuration;



    }



    get sessionDuration(): number  {
        return this._sessionDuration;
    }

    set sessionDuration(sessionDuration: number) {

        this._sessionDuration = sessionDuration;
    }

    toJSON():  IByeMethodReturnType  {
        return {
            sessionDuration: this._sessionDuration
        };
    }


}

