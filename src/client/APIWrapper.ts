import {IMethods, Methods} from "./Methods.js";
import {MakeCallMethodReturnType} from "../models/methods/returntype/MakeCallMethodReturnType.js";
import {
    CallConfigMethodParameter,
    ICallConfigMethodParameter
} from "../models/methods/parametertype/CallConfigMethodParameter.js";
import {ActivateGatewayMethodReturnType} from "../models/methods/returntype/ActivateGatewayMethodReturnType.js";
import {
    ConfigureGatewayMethodParameter,
    IConfigureGatewayMethodParameter
} from "../models/methods/parametertype/ConfigureGatewayMethodParameter.js";
import {PlayUriMethodReturnType} from "../models/methods/returntype/PlayUriMethodReturnType.js";
import {
    IPlayUriMethodParameter,
    PlayUriMethodParameter
} from "../models/methods/parametertype/PlayUriMethodParameter.js";
import {DtmfSignalMethodReturnType} from "../models/methods/returntype/DtmfSignalMethodReturnType.js";
import {
    DtmfSignalMethodParameter,
    IDtmfSignalMethodParameter
} from "../models/methods/parametertype/DtmfSignalMethodParameter.js";
import {ErrorManager} from "../managers/ErrorManager.js";
import {TTErrorCodes} from "../models/enums/TTErrorCodes.js";
import logger from "../config/logger.js";
import {CallStateEnum} from "../models/enums/CallStateEnum.js";


/**
 * A wrapper class for telephony API client methods
 */

export interface IAPIWrapper extends IMethods {

}

/**
 * A wrapper class for telephony API client methods
 */

export class APIWrapper extends Methods {


    /**
     * Initiates an outbound call with optional recording and maximum duration settings, returning the call result when it becomes active.
     */
    public async makeOutboundCall(callConfig: ICallConfigMethodParameter): Promise<MakeCallMethodReturnType> {
        const {RecordingModeEnum} = await import("../models/enums/RecordingModeEnum.js");
        const {CallStateEnum} = await import("../models/enums/CallStateEnum.js");

        const callId = "12345" + Math.random().toString(36).substring(2, 4);
        callConfig = new CallConfigMethodParameter(callConfig);

        try {
            const callPromise = new Promise<void>((resolve, reject) => {
                this.on_callStateChanged(async (ev) => {
                    if (ev.callId === callId) {
                        if (ev.callState === CallStateEnum.ACTIVE) {
                            setTimeout(async () => {
                                try {
                                    await this.hangupCall({callId: ev.callId});
                                } catch (e) {
                                    const error = ErrorManager.exception({
                                        error_code: TTErrorCodes.TTLEC3034_FAILED_TO_HANGUP_CALL,
                                        data: {$details: e.message}
                                    });
                                    Error.captureStackTrace(error);
                                    logger.error('Failed to hangup call:', error);
                                    throw error;
                                }
                            }, callConfig.maxCallDuration * 1000);

                            if (callConfig.enableRecording) {
                                try {
                                    await this.startRecording({
                                        callId: ev.callId,
                                        fileName: callConfig.fileName,
                                        leftChannel: {
                                            recordingMode: RecordingModeEnum.RECORD
                                        },
                                        rightChannel: {
                                            recordingMode: RecordingModeEnum.RECORD
                                        }
                                    });
                                } catch (e) {
                                    const error = ErrorManager.exception({
                                        error_code: TTErrorCodes.TTLEC3035_RECORDING_FAILED_TO_START,
                                        data: {$details: e.message}
                                    });
                                    Error.captureStackTrace(error);
                                    logger.error(error.message);
                                    reject(error);
                                    return;
                                }
                            }

                            resolve();
                        } else if (ev.callState === CallStateEnum.HANGUP) {
                            const error = ErrorManager.exception({
                                error_code: TTErrorCodes.TTLEC3036_CALL_HUNG_UP,
                                data: {$callId: callId}
                            });
                            Error.captureStackTrace(error);
                            logger.error(error.message);
                            reject(error);
                        }
                        else if (ev.callState === CallStateEnum.DOWN){
                            const error = ErrorManager.exception({
                                error_code: TTErrorCodes.TTLEC3033_CALL_NOT_ACTIVE,
                                data: {$callId: callId}
                            });
                            Error.captureStackTrace(error);
                            logger.error(error.message);
                            reject(error);
                        }
                    }
                });
            });

            const makeCallResult = await this.makeCall({
                callId,
                targetNumber: callConfig.targetNumber,
                originatingNumber: callConfig.originatingNumber,
                gatewayName: callConfig.gatewayName
            });

            await callPromise;
            return makeCallResult;

        } catch (error) {
            if (error instanceof Error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            const managedError = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3037_OUTBOUND_CALL_FAILED,
                data: {$details: errorMessage}
            });
            Error.captureStackTrace(managedError);
            throw managedError;
            }
        }
    }

    /**
     * Configures and activates a gateway with specified parameters, waiting until the gateway reaches the REGED state.
     */
    public async configureGateway(configureGatewayMethodParameter: IConfigureGatewayMethodParameter): Promise<ActivateGatewayMethodReturnType> {
        try {
            const {GatewayStateEnum} = await import("../models/enums/GatewayStateEnum.js");
            configureGatewayMethodParameter = new ConfigureGatewayMethodParameter(configureGatewayMethodParameter);
            const properties = [
                {key: "username", value: configureGatewayMethodParameter.username},
                {key: "password", value: configureGatewayMethodParameter.password}
            ];

            const addGatewayConfiguration = await this.addGatewayConfiguration({
                templateName: configureGatewayMethodParameter.templateName,
                properties: properties
            });

            const gatewayPromise = new Promise<void>((resolve, reject) => {
                this.on_gatewayStateChanged(async (gatewayStateChangedEventParameter) => {
                    if (gatewayStateChangedEventParameter.gateway.gatewayState === GatewayStateEnum.REGED) {
                        resolve();
                    } else if (gatewayStateChangedEventParameter.gateway.gatewayState === GatewayStateEnum.FAILED) {
                        const error = ErrorManager.exception({
                            error_code: TTErrorCodes.TTLEC3038_GATEWAY_CONFIGURATION_FAILED,
                            data: {$gatewayName: gatewayStateChangedEventParameter.gateway.name}
                        });
                        Error.captureStackTrace(error);
                        reject(error);
                    }
                    if (gatewayStateChangedEventParameter.gateway.gatewayState === GatewayStateEnum.UNREGISTER) {
                        const error = ErrorManager.exception({
                            error_code: TTErrorCodes.TTLEC3032_GATEWAY_NOT_REGISTERED,
                            data: {$gatewayName: gatewayStateChangedEventParameter.gateway.name,
                                $gatewayState: gatewayStateChangedEventParameter.gateway.gatewayState
                            }
                        });
                        Error.captureStackTrace(error);
                        reject(error);
                    }
                });
            });

            const gateway = await this.activateGateway({
                gatewayName: addGatewayConfiguration.gatewayInformation.name
            });

            await gatewayPromise;
            return gateway;

        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                const managedError = ErrorManager.exception({
                    error_code: TTErrorCodes.TTLEC3039_GATEWAY_CONFIGURATION_ERROR,
                    data: {$details: errorMessage}
                });
                Error.captureStackTrace(managedError);
                throw managedError;
            }
        }
    }

    /**
     * Plays audio via a specified URI on a given call, handling playback state changes, wait for audio to complete playing and reporting success or failure.
     */
    public async playAudio(playUriMethodParameter: IPlayUriMethodParameter): Promise<PlayUriMethodReturnType> {
        try {
            const {PlayBackStateEnum} = await import("../models/enums/PlayBackStateEnum.js");
            playUriMethodParameter = new PlayUriMethodParameter(playUriMethodParameter);

            const playbackPromise = new Promise<void>((resolve, reject) => {
                this.on_playBackStateChanged(async (ev) => {
                    if (ev.callId === playUriMethodParameter.callId) {
                        if (ev.playBackState === PlayBackStateEnum.STOPPED) {
                            resolve();
                        } else if (ev.playBackState === PlayBackStateEnum.FAILED) {
                            const error = ErrorManager.exception({
                                error_code: TTErrorCodes.TTLEC3031_PLAYBACK_FAILED,
                                data: {
                                    $uri: playUriMethodParameter.uri,
                                    $callId: playUriMethodParameter.callId,
                                    $playBackState: ev.playBackState
                                }
                            });
                            Error.captureStackTrace(error);
                            reject(error);
                        }
                    }
                });
            });

            const play = await this.playUri(playUriMethodParameter);
            await playbackPromise;
            return play;
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                const managedError = ErrorManager.exception({
                    error_code: TTErrorCodes.TTLEC3042_PLAY_AUDIO_FAILED,
                    data: {$details: errorMessage}
                });
                Error.captureStackTrace(managedError);
                throw managedError;
            }
        }
    }

    /**
     * Enables DTMF event listening on a call, capturing the DTMF signals or timing out after the specified duration.
     */
    public async getDtmf(dtmfSignalMethodParameter: IDtmfSignalMethodParameter): Promise<DtmfSignalMethodReturnType> {
        try {
            const {DtmfSourceEnum} = await import("../models/enums/DtmfSourceEnum.js");
            dtmfSignalMethodParameter = new DtmfSignalMethodParameter(dtmfSignalMethodParameter);

            await this.enableDtmfEvents({
                callId: dtmfSignalMethodParameter.callId
            });

            let resSignal = new DtmfSignalMethodReturnType({
                callId: dtmfSignalMethodParameter.callId,
                dtmfDigit: "",
                dtmfSource: DtmfSourceEnum.ENDPOINT,
                dtmfDuration: 0,
                eventTime: ""
            });

            try {
                const dtmfPromise = new Promise<void>((resolve, reject) => {
                    const timeoutId = setTimeout(() => {
                        resolve();
                    }, dtmfSignalMethodParameter.timeout * 1000);

                    this.on_dtmfSignal(async (signal) => {
                        if (signal.callId === dtmfSignalMethodParameter.callId) {
                            resSignal = new DtmfSignalMethodReturnType({
                                callId: signal.callId,
                                dtmfDigit: signal.dtmfDigit,
                                dtmfSource: signal.dtmfSource,
                                dtmfDuration: signal.dtmfDuration,
                                eventTime: signal.eventTime
                            });
                            clearTimeout(timeoutId);
                            resolve();
                        }
                    });
                });

                await dtmfPromise;
            } finally {
                await this.disableDtmfEvents({
                    callId: dtmfSignalMethodParameter.callId
                });
            }

            return resSignal;
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                const managedError = ErrorManager.exception({
                    error_code: TTErrorCodes.TTLEC3041_DTMF_OPERATION_FAILED,
                    data: {$details: errorMessage}
                });
                Error.captureStackTrace(managedError);
                throw managedError;
            }
        }
    }
}

