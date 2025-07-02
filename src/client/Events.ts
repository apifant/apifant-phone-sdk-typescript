import {  HubConnection  } from "@microsoft/signalr";
import { NewCallEventParameter, INewCallEventParameter } from "../models/events/parametertype/NewCallEventParameter.js";
import { CallStateChangedEventParameter, ICallStateChangedEventParameter } from "../models/events/parametertype/CallStateChangedEventParameter.js";
import { CallFinalizedEventParameter, ICallFinalizedEventParameter } from "../models/events/parametertype/CallFinalizedEventParameter.js";
import { RecordingStateChangedEventParameter, IRecordingStateChangedEventParameter } from "../models/events/parametertype/RecordingStateChangedEventParameter.js";
import { RecordingFinalizedEventParameter, IRecordingFinalizedEventParameter } from "../models/events/parametertype/RecordingFinalizedEventParameter.js";
import { RecordingErrorEventParameter, IRecordingErrorEventParameter } from "../models/events/parametertype/RecordingErrorEventParameter.js";
import { GatewayStateChangedEventParameter, IGatewayStateChangedEventParameter } from "../models/events/parametertype/GatewayStateChangedEventParameter.js";
import { PlayBackStateChangedEventParameter, IPlayBackStateChangedEventParameter } from "../models/events/parametertype/PlayBackStateChangedEventParameter.js";
import { PlayBackErrorEventParameter, IPlayBackErrorEventParameter } from "../models/events/parametertype/PlayBackErrorEventParameter.js";
import { DtmfSignalEventParameter, IDtmfSignalEventParameter } from "../models/events/parametertype/DtmfSignalEventParameter.js";
import { SendRtpStateChangedEventParameter, ISendRtpStateChangedEventParameter } from "../models/events/parametertype/SendRtpStateChangedEventParameter.js";
import { SendRtpSsrcEventParameter, ISendRtpSsrcEventParameter } from "../models/events/parametertype/SendRtpSsrcEventParameter.js";
import { SendRtpErrorEventParameter, ISendRtpErrorEventParameter } from "../models/events/parametertype/SendRtpErrorEventParameter.js";
import { ValidationManager } from "../managers/ValidationManager.js";


/**
* Temp Class to hold the events
*/

export interface IEvents  {
    session_handler : HubConnection;
}

/**
* Temp Class to hold the events
*/

export class Events {

    protected  _session_handler : HubConnection;

    constructor (params :IEvents) {
        ValidationManager.validateAttributes(params, ['session_handler'], ['session_handler']);


        this._session_handler = params.session_handler;



    }







    /**
    * Informs a client about a new call, that means a call which was not reported yet. For InboundCalls CallId will be set to ServerCallID.
    */
    public on_newCall(cb: (ev: NewCallEventParameter) => void) : void  {
        this._session_handler.on("newCall", (p: INewCallEventParameter) => {
            cb(new NewCallEventParameter(p));
        });
    }

    /**
    * the state of a call was Changed  \\t DOWN - initial state of an outbound call \\t FINALIZED - the call is finalzed, no more messages will be sent
    */
    public on_callStateChanged(cb: (ev: CallStateChangedEventParameter) => void) : void  {
        this._session_handler.on("callStateChanged", (p: ICallStateChangedEventParameter) => {
            cb(new CallStateChangedEventParameter(p));
        });
    }

    /**
    * last event for a call, contains statistic informations
    */
    public on_callFinalized(cb: (ev: CallFinalizedEventParameter) => void) : void  {
        this._session_handler.on("callFinalized", (p: ICallFinalizedEventParameter) => {
            cb(new CallFinalizedEventParameter(p));
        });
    }

    /**
    * informs about changing a recording
    */
    public on_recordingStateChanged(cb: (ev: RecordingStateChangedEventParameter) => void) : void  {
        this._session_handler.on("recordingStateChanged", (p: IRecordingStateChangedEventParameter) => {
            cb(new RecordingStateChangedEventParameter(p));
        });
    }

    /**
    * recording task fully completed
    */
    public on_recordingFinalized(cb: (ev: RecordingFinalizedEventParameter) => void) : void  {
        this._session_handler.on("recordingFinalized", (p: IRecordingFinalizedEventParameter) => {
            cb(new RecordingFinalizedEventParameter(p));
        });
    }

    /**
    * an error ocurred, for instance a file with the final recoding file could not be created
    */
    public on_recordingError(cb: (ev: RecordingErrorEventParameter) => void) : void  {
        this._session_handler.on("recordingError", (p: IRecordingErrorEventParameter) => {
            cb(new RecordingErrorEventParameter(p));
        });
    }

    /**
    * the state of a gateway was changed
    */
    public on_gatewayStateChanged(cb: (ev: GatewayStateChangedEventParameter) => void) : void  {
        this._session_handler.on("gatewayStateChanged", (p: IGatewayStateChangedEventParameter) => {
            cb(new GatewayStateChangedEventParameter(p));
        });
    }

    /**
    * informs about changing a playback
    */
    public on_playBackStateChanged(cb: (ev: PlayBackStateChangedEventParameter) => void) : void  {
        this._session_handler.on("playBackStateChanged", (p: IPlayBackStateChangedEventParameter) => {
            cb(new PlayBackStateChangedEventParameter(p));
        });
    }

    /**
    * an error ocurred
    */
    public on_playBackError(cb: (ev: PlayBackErrorEventParameter) => void) : void  {
        this._session_handler.on("playBackError", (p: IPlayBackErrorEventParameter) => {
            cb(new PlayBackErrorEventParameter(p));
        });
    }

    /**
    * informs about a detected dtmf signal
    */
    public on_dtmfSignal(cb: (ev: DtmfSignalEventParameter) => void) : void  {
        this._session_handler.on("dtmfSignal", (p: IDtmfSignalEventParameter) => {
            cb(new DtmfSignalEventParameter(p));
        });
    }

    /**
    * informs about changing sendRtp
    */
    public on_sendRtpStateChanged(cb: (ev: SendRtpStateChangedEventParameter) => void) : void  {
        this._session_handler.on("sendRtpStateChanged", (p: ISendRtpStateChangedEventParameter) => {
            cb(new SendRtpStateChangedEventParameter(p));
        });
    }

    /**
    * informs about sendRtp ssrc
    */
    public on_sendRtpSsrc(cb: (ev: SendRtpSsrcEventParameter) => void) : void  {
        this._session_handler.on("sendRtpSsrc", (p: ISendRtpSsrcEventParameter) => {
            cb(new SendRtpSsrcEventParameter(p));
        });
    }

    /**
    * informs about an error
    */
    public on_sendRtpError(cb: (ev: SendRtpErrorEventParameter) => void) : void  {
        this._session_handler.on("sendRtpError", (p: ISendRtpErrorEventParameter) => {
            cb(new SendRtpErrorEventParameter(p));
        });
    }
}

