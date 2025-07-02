import { RecordingModeEnum } from "../enums/RecordingModeEnum.js";
import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface IRecordingChannelDataSchema  {
    recordingMode : RecordingModeEnum;
}



export class RecordingChannelDataSchema {

    /**
    * The different recording modes for a recording channel.
    */
    private  _recordingMode : RecordingModeEnum;

    constructor (params :IRecordingChannelDataSchema) {
        ValidationManager.validateAttributes(params, ['recordingMode'], ['recordingMode']);

        this._recordingMode = params.recordingMode;




    }



    get recordingMode(): RecordingModeEnum  {
        return this._recordingMode;
    }

    set recordingMode(recordingMode: RecordingModeEnum) {

        this._recordingMode = recordingMode;
    }

    toJSON():  IRecordingChannelDataSchema  {
        return {
            recordingMode: this._recordingMode
        };
    }


}

