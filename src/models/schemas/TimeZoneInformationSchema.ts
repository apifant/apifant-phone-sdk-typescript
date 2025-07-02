import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface ITimeZoneInformationSchema  {
    displayname : string;
    timezoneidentifier : string;
    supportsdaylightsavingtime : boolean;
    baseUtcOffset : string;
}



export class TimeZoneInformationSchema {

    /**
    * general display name that represents the time zone
    */
    private  _displayname : string;
    /**
    * time zone identifier
    */
    private  _timezoneidentifier : string;
    /**
    * indicating whether the time zone has any daylight saving time rules
    */
    private  _supportsdaylightsavingtime : boolean;
    /**
    * time difference between the current servers time zone's standard time and Coordinated Universal Time (UTC)
    */
    private  _baseUtcOffset : string;

    constructor (params :ITimeZoneInformationSchema) {
        ValidationManager.validateAttributes(params, ['displayname', 'timezoneidentifier', 'supportsdaylightsavingtime', 'baseUtcOffset'], ['displayname', 'timezoneidentifier', 'supportsdaylightsavingtime', 'baseUtcOffset']);


        this._displayname = params.displayname;
        this._timezoneidentifier = params.timezoneidentifier;
        this._supportsdaylightsavingtime = params.supportsdaylightsavingtime;
        this._baseUtcOffset = params.baseUtcOffset;



    }



    get displayname(): string  {
        return this._displayname;
    }

    set displayname(displayname: string) {

        this._displayname = displayname;
    }

    get timezoneidentifier(): string  {
        return this._timezoneidentifier;
    }

    set timezoneidentifier(timezoneidentifier: string) {

        this._timezoneidentifier = timezoneidentifier;
    }

    get supportsdaylightsavingtime(): boolean  {
        return this._supportsdaylightsavingtime;
    }

    set supportsdaylightsavingtime(supportsdaylightsavingtime: boolean) {

        this._supportsdaylightsavingtime = supportsdaylightsavingtime;
    }

    get baseUtcOffset(): string  {
        return this._baseUtcOffset;
    }

    set baseUtcOffset(baseUtcOffset: string) {

        this._baseUtcOffset = baseUtcOffset;
    }

    toJSON():  ITimeZoneInformationSchema  {
        return {
            displayname: this._displayname,
            timezoneidentifier: this._timezoneidentifier,
            supportsdaylightsavingtime: this._supportsdaylightsavingtime,
            baseUtcOffset: this._baseUtcOffset
        };
    }


}

