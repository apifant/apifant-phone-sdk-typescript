import { DtmfSourceEnum } from "../../enums/DtmfSourceEnum.js";
import { ValidationManager } from "../../../managers/ValidationManager.js";



export interface IDtmfSignalMethodReturnType  {
    dtmfDigit : string;
    dtmfSource : DtmfSourceEnum;
    dtmfDuration : number;
    eventTime : string;
    callId : string;
}



export class DtmfSignalMethodReturnType {

    private  _dtmfDigit : string;
    private  _dtmfSource : DtmfSourceEnum;
    private  _dtmfDuration : number;
    private  _eventTime : string;
    private  _callId : string;

    constructor (params :IDtmfSignalMethodReturnType) {
        ValidationManager.validateAttributes(params, ['dtmfDigit', 'dtmfSource', 'dtmfDuration', 'eventTime', 'callId'], ['dtmfDigit', 'dtmfSource', 'dtmfDuration', 'eventTime', 'callId']);

        this._dtmfSource = params.dtmfSource;
        this._dtmfDigit = params.dtmfDigit;
        this._dtmfDuration = params.dtmfDuration;
        this._eventTime = params.eventTime;
        this._callId = params.callId;



    }



    get dtmfDigit(): string  {
        return this._dtmfDigit;
    }

    set dtmfDigit(dtmfDigit: string) {

        this._dtmfDigit = dtmfDigit;
    }

    get dtmfSource(): DtmfSourceEnum  {
        return this._dtmfSource;
    }

    set dtmfSource(dtmfSource: DtmfSourceEnum) {

        this._dtmfSource = dtmfSource;
    }

    get dtmfDuration(): number  {
        return this._dtmfDuration;
    }

    set dtmfDuration(dtmfDuration: number) {

        this._dtmfDuration = dtmfDuration;
    }

    get eventTime(): string  {
        return this._eventTime;
    }

    set eventTime(eventTime: string) {

        this._eventTime = eventTime;
    }

    get callId(): string  {
        return this._callId;
    }

    set callId(callId: string) {

        this._callId = callId;
    }

    toJSON():  IDtmfSignalMethodReturnType  {
        return {
            dtmfDigit: this._dtmfDigit,
            dtmfSource: this._dtmfSource,
            dtmfDuration: this._dtmfDuration,
            eventTime: this._eventTime,
            callId: this._callId
        };
    }


}

