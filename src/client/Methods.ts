import { Events, IEvents } from "./Events.js";
import { HangupCallMethodReturnType, IHangupCallMethodReturnType } from "../models/methods/returntype/HangupCallMethodReturnType.js";
import { HangupCallMethodParameter, IHangupCallMethodParameter } from "../models/methods/parametertype/HangupCallMethodParameter.js";
import { RejectCallMethodReturnType, IRejectCallMethodReturnType } from "../models/methods/returntype/RejectCallMethodReturnType.js";
import { RejectCallMethodParameter, IRejectCallMethodParameter } from "../models/methods/parametertype/RejectCallMethodParameter.js";
import { AnswerCallMethodReturnType, IAnswerCallMethodReturnType } from "../models/methods/returntype/AnswerCallMethodReturnType.js";
import { AnswerCallMethodParameter, IAnswerCallMethodParameter } from "../models/methods/parametertype/AnswerCallMethodParameter.js";
import { ByeMethodReturnType, IByeMethodReturnType } from "../models/methods/returntype/ByeMethodReturnType.js";
import { MakeCallMethodReturnType, IMakeCallMethodReturnType } from "../models/methods/returntype/MakeCallMethodReturnType.js";
import { MakeCallMethodParameter, IMakeCallMethodParameter } from "../models/methods/parametertype/MakeCallMethodParameter.js";
import { SendRingingMethodReturnType, ISendRingingMethodReturnType } from "../models/methods/returntype/SendRingingMethodReturnType.js";
import { SendRingingMethodParameter, ISendRingingMethodParameter } from "../models/methods/parametertype/SendRingingMethodParameter.js";
import { ConnectCallsMethodReturnType, IConnectCallsMethodReturnType } from "../models/methods/returntype/ConnectCallsMethodReturnType.js";
import { ConnectCallsMethodParameter, IConnectCallsMethodParameter } from "../models/methods/parametertype/ConnectCallsMethodParameter.js";
import { StartRecordingMethodReturnType, IStartRecordingMethodReturnType } from "../models/methods/returntype/StartRecordingMethodReturnType.js";
import { StartRecordingMethodParameter, IStartRecordingMethodParameter } from "../models/methods/parametertype/StartRecordingMethodParameter.js";
import { FinishRecordingMethodReturnType, IFinishRecordingMethodReturnType } from "../models/methods/returntype/FinishRecordingMethodReturnType.js";
import { FinishRecordingMethodParameter, IFinishRecordingMethodParameter } from "../models/methods/parametertype/FinishRecordingMethodParameter.js";
import { AddGatewayConfigurationMethodReturnType, IAddGatewayConfigurationMethodReturnType } from "../models/methods/returntype/AddGatewayConfigurationMethodReturnType.js";
import { AddGatewayConfigurationMethodParameter, IAddGatewayConfigurationMethodParameter } from "../models/methods/parametertype/AddGatewayConfigurationMethodParameter.js";
import { ActivateGatewayMethodReturnType, IActivateGatewayMethodReturnType } from "../models/methods/returntype/ActivateGatewayMethodReturnType.js";
import { ActivateGatewayMethodParameter, IActivateGatewayMethodParameter } from "../models/methods/parametertype/ActivateGatewayMethodParameter.js";
import { DeactivateGatewayMethodReturnType, IDeactivateGatewayMethodReturnType } from "../models/methods/returntype/DeactivateGatewayMethodReturnType.js";
import { DeactivateGatewayMethodParameter, IDeactivateGatewayMethodParameter } from "../models/methods/parametertype/DeactivateGatewayMethodParameter.js";
import { RemoveGatewayConfigurationMethodReturnType, IRemoveGatewayConfigurationMethodReturnType } from "../models/methods/returntype/RemoveGatewayConfigurationMethodReturnType.js";
import { RemoveGatewayConfigurationMethodParameter, IRemoveGatewayConfigurationMethodParameter } from "../models/methods/parametertype/RemoveGatewayConfigurationMethodParameter.js";
import { GetGatewaysMethodReturnType, IGetGatewaysMethodReturnType } from "../models/methods/returntype/GetGatewaysMethodReturnType.js";
import { GetGatewayTemplatesMethodReturnType, IGetGatewayTemplatesMethodReturnType } from "../models/methods/returntype/GetGatewayTemplatesMethodReturnType.js";
import { PlayUriMethodReturnType, IPlayUriMethodReturnType } from "../models/methods/returntype/PlayUriMethodReturnType.js";
import { PlayUriMethodParameter, IPlayUriMethodParameter } from "../models/methods/parametertype/PlayUriMethodParameter.js";
import { StopUriMethodReturnType, IStopUriMethodReturnType } from "../models/methods/returntype/StopUriMethodReturnType.js";
import { StopUriMethodParameter, IStopUriMethodParameter } from "../models/methods/parametertype/StopUriMethodParameter.js";
import { PlayBackSeekMethodReturnType, IPlayBackSeekMethodReturnType } from "../models/methods/returntype/PlayBackSeekMethodReturnType.js";
import { PlayBackSeekMethodParameter, IPlayBackSeekMethodParameter } from "../models/methods/parametertype/PlayBackSeekMethodParameter.js";
import { PlayBackPauseMethodReturnType, IPlayBackPauseMethodReturnType } from "../models/methods/returntype/PlayBackPauseMethodReturnType.js";
import { PlayBackPauseMethodParameter, IPlayBackPauseMethodParameter } from "../models/methods/parametertype/PlayBackPauseMethodParameter.js";
import { EnableDtmfEventsMethodReturnType, IEnableDtmfEventsMethodReturnType } from "../models/methods/returntype/EnableDtmfEventsMethodReturnType.js";
import { EnableDtmfEventsMethodParameter, IEnableDtmfEventsMethodParameter } from "../models/methods/parametertype/EnableDtmfEventsMethodParameter.js";
import { DisableDtmfEventsMethodReturnType, IDisableDtmfEventsMethodReturnType } from "../models/methods/returntype/DisableDtmfEventsMethodReturnType.js";
import { DisableDtmfEventsMethodParameter, IDisableDtmfEventsMethodParameter } from "../models/methods/parametertype/DisableDtmfEventsMethodParameter.js";
import { SendRtpMethodReturnType, ISendRtpMethodReturnType } from "../models/methods/returntype/SendRtpMethodReturnType.js";
import { SendRtpMethodParameter, ISendRtpMethodParameter } from "../models/methods/parametertype/SendRtpMethodParameter.js";
import { StopSendRtpMethodReturnType, IStopSendRtpMethodReturnType } from "../models/methods/returntype/StopSendRtpMethodReturnType.js";
import { StopSendRtpMethodParameter, IStopSendRtpMethodParameter } from "../models/methods/parametertype/StopSendRtpMethodParameter.js";
import { InitializeMethodReturnType, IInitializeMethodReturnType } from "../models/methods/returntype/InitializeMethodReturnType.js";


/**
* Temp Class to hold the methods
*/

export interface IMethods  extends IEvents {

}

/**
* Temp Class to hold the methods
*/

export class Methods extends Events {











    /**
    * hangup call specified by callId
    */
    public  async hangupCall(hangupCallMethodParameter : IHangupCallMethodParameter) : Promise<HangupCallMethodReturnType>  {
        const data : IHangupCallMethodReturnType = await this._session_handler.invoke("hangupCall", new HangupCallMethodParameter(hangupCallMethodParameter));
        return new HangupCallMethodReturnType(data);
    }

    /**
    * rejects an offered or ringing inbound call  with a given sip cause
    */
    public  async rejectCall(rejectCallMethodParameter : IRejectCallMethodParameter) : Promise<RejectCallMethodReturnType>  {
        const data : IRejectCallMethodReturnType = await this._session_handler.invoke("rejectCall", new RejectCallMethodParameter(rejectCallMethodParameter));
        return new RejectCallMethodReturnType(data);
    }

    /**
    * answers an inbound call specified by callId
    */
    public  async answerCall(answerCallMethodParameter : IAnswerCallMethodParameter) : Promise<AnswerCallMethodReturnType>  {
        const data : IAnswerCallMethodReturnType = await this._session_handler.invoke("answerCall", new AnswerCallMethodParameter(answerCallMethodParameter));
        return new AnswerCallMethodReturnType(data);
    }

    /**
    * A customer should send a goodbye message before ending a session. Any further client call will be answered with an INVALIDSTATEEEXCEPTION. If the client does not close the session itself, it will be terminated by the server.
    */
    public  async bye(byeMethodParameter : Object) : Promise<ByeMethodReturnType>  {
        const data : IByeMethodReturnType = await this._session_handler.invoke("bye", byeMethodParameter);
        return new ByeMethodReturnType(data);
    }

    /**
    * make a Call, returns the SIP-Response for SIP-Invite
    */
    public  async makeCall(makeCallMethodParameter : IMakeCallMethodParameter) : Promise<MakeCallMethodReturnType>  {
        const data : IMakeCallMethodReturnType = await this._session_handler.invoke("makeCall", new MakeCallMethodParameter(makeCallMethodParameter));
        return new MakeCallMethodReturnType(data);
    }

    /**
    * sends the protocol ringing for an inbound call
    */
    public  async sendRinging(sendRingingMethodParameter : ISendRingingMethodParameter) : Promise<SendRingingMethodReturnType>  {
        const data : ISendRingingMethodReturnType = await this._session_handler.invoke("sendRinging", new SendRingingMethodParameter(sendRingingMethodParameter));
        return new SendRingingMethodReturnType(data);
    }

    /**
    * Switching two calls with each other.
    */
    public  async connectCalls(connectCallsMethodParameter : IConnectCallsMethodParameter) : Promise<ConnectCallsMethodReturnType>  {
        const data : IConnectCallsMethodReturnType = await this._session_handler.invoke("connectCalls", new ConnectCallsMethodParameter(connectCallsMethodParameter));
        return new ConnectCallsMethodReturnType(data);
    }

    /**
    * prepares a recording on a call with a given ID, start the recording asop
    */
    public  async startRecording(startRecordingMethodParameter : IStartRecordingMethodParameter) : Promise<StartRecordingMethodReturnType>  {
        const data : IStartRecordingMethodReturnType = await this._session_handler.invoke("startRecording", new StartRecordingMethodParameter(startRecordingMethodParameter));
        return new StartRecordingMethodReturnType(data);
    }

    /**
    * stop and close a prepared or running recording
    */
    public  async finishRecording(finishRecordingMethodParameter : IFinishRecordingMethodParameter) : Promise<FinishRecordingMethodReturnType>  {
        const data : IFinishRecordingMethodReturnType = await this._session_handler.invoke("finishRecording", new FinishRecordingMethodParameter(finishRecordingMethodParameter));
        return new FinishRecordingMethodReturnType(data);
    }

    /**
    * create a new gateway configuration on the api server.
    */
    public  async addGatewayConfiguration(addGatewayConfigurationMethodParameter : IAddGatewayConfigurationMethodParameter) : Promise<AddGatewayConfigurationMethodReturnType>  {
        const data : IAddGatewayConfigurationMethodReturnType = await this._session_handler.invoke("addGatewayConfiguration", new AddGatewayConfigurationMethodParameter(addGatewayConfigurationMethodParameter));
        return new AddGatewayConfigurationMethodReturnType(data);
    }

    /**
    * activate a Gateway. It follows a gatewayStateChanged event with state 'DOWN'.
    */
    public  async activateGateway(activateGatewayMethodParameter : IActivateGatewayMethodParameter) : Promise<ActivateGatewayMethodReturnType>  {
        const data : IActivateGatewayMethodReturnType = await this._session_handler.invoke("activateGateway", new ActivateGatewayMethodParameter(activateGatewayMethodParameter));
        return new ActivateGatewayMethodReturnType(data);
    }

    /**
    * deactivate a Gateway. It follows different gatewayStateChanged events. The last state is 'INACTIVE'.
    */
    public  async deactivateGateway(deactivateGatewayMethodParameter : IDeactivateGatewayMethodParameter) : Promise<DeactivateGatewayMethodReturnType>  {
        const data : IDeactivateGatewayMethodReturnType = await this._session_handler.invoke("deactivateGateway", new DeactivateGatewayMethodParameter(deactivateGatewayMethodParameter));
        return new DeactivateGatewayMethodReturnType(data);
    }

    /**
    * remove a gateway configuration on the api server. The gateway state must be 'INACTIVE'.
    */
    public  async removeGatewayConfiguration(removeGatewayConfigurationMethodParameter : IRemoveGatewayConfigurationMethodParameter) : Promise<RemoveGatewayConfigurationMethodReturnType>  {
        const data : IRemoveGatewayConfigurationMethodReturnType = await this._session_handler.invoke("removeGatewayConfiguration", new RemoveGatewayConfigurationMethodParameter(removeGatewayConfigurationMethodParameter));
        return new RemoveGatewayConfigurationMethodReturnType(data);
    }

    /**
    * gets an array of configured api server gateways.
    */
    public  async getGateways(getGatewaysMethodParameter : string) : Promise<GetGatewaysMethodReturnType>  {
        const data : IGetGatewaysMethodReturnType = await this._session_handler.invoke("getGateways", getGatewaysMethodParameter);
        return new GetGatewaysMethodReturnType(data);
    }

    /**
    * gets an array of the available gateway templates.
    */
    public  async getGatewayTemplates(getGatewayTemplatesMethodParameter : string) : Promise<GetGatewayTemplatesMethodReturnType>  {
        const data : IGetGatewayTemplatesMethodReturnType = await this._session_handler.invoke("getGatewayTemplates", getGatewayTemplatesMethodParameter);
        return new GetGatewayTemplatesMethodReturnType(data);
    }

    /**
    * plays a wav file from a remote server
    */
    public  async playUri(playUriMethodParameter : IPlayUriMethodParameter) : Promise<PlayUriMethodReturnType>  {
        const data : IPlayUriMethodReturnType = await this._session_handler.invoke("playUri", new PlayUriMethodParameter(playUriMethodParameter));
        return new PlayUriMethodReturnType(data);
    }

    /**
    * stops the currently playing file
    */
    public  async stopUri(stopUriMethodParameter : IStopUriMethodParameter) : Promise<StopUriMethodReturnType>  {
        const data : IStopUriMethodReturnType = await this._session_handler.invoke("stopUri", new StopUriMethodParameter(stopUriMethodParameter));
        return new StopUriMethodReturnType(data);
    }

    /**
    * seek the audio being played into a channel from a sound file
    */
    public  async playBackSeek(playBackSeekMethodParameter : IPlayBackSeekMethodParameter) : Promise<PlayBackSeekMethodReturnType>  {
        const data : IPlayBackSeekMethodReturnType = await this._session_handler.invoke("playBackSeek", new PlayBackSeekMethodParameter(playBackSeekMethodParameter));
        return new PlayBackSeekMethodReturnType(data);
    }

    /**
    * pause (toggle) audio being played into a channel from a sound file
    */
    public  async playBackPause(playBackPauseMethodParameter : IPlayBackPauseMethodParameter) : Promise<PlayBackPauseMethodReturnType>  {
        const data : IPlayBackPauseMethodReturnType = await this._session_handler.invoke("playBackPause", new PlayBackPauseMethodParameter(playBackPauseMethodParameter));
        return new PlayBackPauseMethodReturnType(data);
    }

    /**
    * start dtmf detection
    */
    public  async enableDtmfEvents(enableDtmfEventsMethodParameter : IEnableDtmfEventsMethodParameter) : Promise<EnableDtmfEventsMethodReturnType>  {
        const data : IEnableDtmfEventsMethodReturnType = await this._session_handler.invoke("enableDtmfEvents", new EnableDtmfEventsMethodParameter(enableDtmfEventsMethodParameter));
        return new EnableDtmfEventsMethodReturnType(data);
    }

    /**
    * stop dtmf detection
    */
    public  async disableDtmfEvents(disableDtmfEventsMethodParameter : IDisableDtmfEventsMethodParameter) : Promise<DisableDtmfEventsMethodReturnType>  {
        const data : IDisableDtmfEventsMethodReturnType = await this._session_handler.invoke("disableDtmfEvents", new DisableDtmfEventsMethodParameter(disableDtmfEventsMethodParameter));
        return new DisableDtmfEventsMethodReturnType(data);
    }

    /**
    * sends RTP to a given ipv4
    */
    public  async sendRtp(sendRtpMethodParameter : ISendRtpMethodParameter) : Promise<SendRtpMethodReturnType>  {
        const data : ISendRtpMethodReturnType = await this._session_handler.invoke("sendRtp", new SendRtpMethodParameter(sendRtpMethodParameter));
        return new SendRtpMethodReturnType(data);
    }

    /**
    * stops sending RTP to a given ipv4
    */
    public  async stopSendRtp(stopSendRtpMethodParameter : IStopSendRtpMethodParameter) : Promise<StopSendRtpMethodReturnType>  {
        const data : IStopSendRtpMethodReturnType = await this._session_handler.invoke("stopSendRtp", new StopSendRtpMethodParameter(stopSendRtpMethodParameter));
        return new StopSendRtpMethodReturnType(data);
    }

    /**
    * Method to initialize and renew a session. A session will be terminated by the server if no valid token for this session is available on the server.
    */
    public  async initialize(initializeMethodParameter : string) : Promise<InitializeMethodReturnType>  {
        const data : IInitializeMethodReturnType = await this._session_handler.invoke("initialize", initializeMethodParameter);
        return new InitializeMethodReturnType(data);
    }


}

