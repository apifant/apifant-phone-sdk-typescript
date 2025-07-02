import { ApiResultEnum } from "../enums/ApiResultEnum.js";
import { ErrorManager } from "../../managers/ErrorManager.js";
import { TTErrorCodes } from "../enums/TTErrorCodes.js";
import logger from "../../config/logger.js";
import { ValidationManager } from "../../managers/ValidationManager.js";



export interface IMakeCallResultSchema  {
    callId : string;
    serverUuid : string;
    cancellationReason? : string;
    inviteResultCause? : number;
    inviteResultPhrase? : string;
    apiResult? : ApiResultEnum;
    resultTime : string;
}



export class MakeCallResultSchema {

    /**
    * client CallID (foreign key for call on Server)
    */
    private  _callId : string;
    /**
    * server CallID (UUid)
    */
    private  _serverUuid : string;
    /**
    * contains the reason of the sip invitation cancellation  e.g NORMAL_CLEARING - local hangup before there was an answer from remote , in case of connection this value is set to an empty string
    */
    private  _cancellationReason? : string;
    /**
    * Sip Result Cause for Invite
    */
    private  _inviteResultCause? : number;
    /**
    * Sip Result Phrase for Invite
    */
    private  _inviteResultPhrase? : string;
    /**
    * Api Result for the calljob, \\t JOB_FINISHED means the call was connected, remote hung up or not answered \\t JOB_ABORTED means the call was hung up from local side before a connect  - this results in a Cancel in the SIP communication \\t JOB_FAILED  the fsw system could not execute the job \\t JOB_CANCELED no invite has ever been sent
    */
    private  _apiResult? : ApiResultEnum;
    /**
    * ResultTime on Server
    */
    private  _resultTime : string;

    constructor (params :IMakeCallResultSchema) {
        ValidationManager.validateAttributes(params, ['serverUuid', 'callId', 'resultTime'], ['serverUuid', 'callId', 'resultTime', 'apiResult', 'inviteResultCause', 'cancellationReason', 'inviteResultPhrase']);


        if (params.callId !== undefined &&  !/^[a-zA-Z0-9_-]+$/.test(params.callId)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'callId',
                    "$pattern": '^[a-zA-Z0-9_-]+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._callId = params.callId;
        if (params.serverUuid !== undefined &&  !/^[a-zA-Z0-9_-]+$/.test(params.serverUuid)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'serverUuid',
                    "$pattern": '^[a-zA-Z0-9_-]+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._serverUuid = params.serverUuid;
        if (params.resultTime !== undefined &&  !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(params.resultTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'resultTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._resultTime = params.resultTime;
        if (params.cancellationReason !== undefined &&  !/^[a-zA-Z_]*$/.test(params.cancellationReason)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'cancellationReason',
                    "$pattern": '^[a-zA-Z_]*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._cancellationReason = params.cancellationReason;
        if ((params.inviteResultCause && params.inviteResultCause < 100) || (params.inviteResultCause && params.inviteResultCause > 799)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'inviteResultCause',
                    $minValue : 100,
                    $maxValue : 799
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._inviteResultCause = params.inviteResultCause;
        if (params.inviteResultPhrase !== undefined &&  !/^[a-zA-Z_ ]*$/.test(params.inviteResultPhrase)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    $field: 'inviteResultPhrase',
                    "$pattern": '^[a-zA-Z_ ]*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._inviteResultPhrase = params.inviteResultPhrase;
        this._apiResult = params.apiResult;

    }



    get callId(): string  {
        return this._callId;
    }

    set callId(callId: string) {
        if ( !/^[a-zA-Z0-9_-]+$/.test(callId)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    callId: 'callId',
                    "$pattern": '^[a-zA-Z0-9_-]+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._callId = callId;
    }

    get serverUuid(): string  {
        return this._serverUuid;
    }

    set serverUuid(serverUuid: string) {
        if ( !/^[a-zA-Z0-9_-]+$/.test(serverUuid)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    serverUuid: 'serverUuid',
                    "$pattern": '^[a-zA-Z0-9_-]+$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._serverUuid = serverUuid;
    }

    get cancellationReason(): string  | undefined {
        return this._cancellationReason;
    }

    set cancellationReason(cancellationReason: string) {
        if (cancellationReason !== undefined &&  !/^[a-zA-Z_]*$/.test(cancellationReason)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    cancellationReason: 'cancellationReason',
                    "$pattern": '^[a-zA-Z_]*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._cancellationReason = cancellationReason;
    }

    get inviteResultCause(): number  | undefined {
        return this._inviteResultCause;
    }

    set inviteResultCause(inviteResultCause: number) {

        if ((inviteResultCause && inviteResultCause < 100) || (inviteResultCause && inviteResultCause > 799)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3027_FIELD_OUT_OF_RANGE,
                data: {
                    $field: 'inviteResultCause',
                    $minValue : 100,
                    $maxValue : 799
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._inviteResultCause = inviteResultCause;
    }

    get inviteResultPhrase(): string  | undefined {
        return this._inviteResultPhrase;
    }

    set inviteResultPhrase(inviteResultPhrase: string) {
        if (inviteResultPhrase !== undefined &&  !/^[a-zA-Z_ ]*$/.test(inviteResultPhrase)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    inviteResultPhrase: 'inviteResultPhrase',
                    "$pattern": '^[a-zA-Z_ ]*$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._inviteResultPhrase = inviteResultPhrase;
    }

    get apiResult(): ApiResultEnum  | undefined {
        return this._apiResult;
    }

    set apiResult(apiResult: ApiResultEnum) {

        this._apiResult = apiResult;
    }

    get resultTime(): string  {
        return this._resultTime;
    }

    set resultTime(resultTime: string) {
        if ( !/^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$/.test(resultTime)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR,
                data: {
                    resultTime: 'resultTime',
                    "$pattern": '^(19\d{2}|2\d{3})-((0[13578]|1[02])-([0-2]\d|3[01])|02-[0-2]\d|(0[469]|11)-([0-2]\d|30))T([01]\d|2[0-4])(:[0-5]\d){2}(\.\d{3})Z$',
                }
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        this._resultTime = resultTime;
    }

    toJSON():  IMakeCallResultSchema  {
        return {
            callId: this._callId,
            serverUuid: this._serverUuid,
            cancellationReason: this._cancellationReason,
            inviteResultCause: this._inviteResultCause,
            inviteResultPhrase: this._inviteResultPhrase,
            apiResult: this._apiResult,
            resultTime: this._resultTime
        };
    }


}

