import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {InitializeMethodReturnType} from "../models/methods/returntype/InitializeMethodReturnType.js";
import {APIWrapper} from "./APIWrapper.js";
import logger from "../config/logger.js";
import {SignalRLogger} from "../config/SignalRLogger.js";
import {TokenManager} from "../managers/TokenManager.js";
import {ErrorManager} from "../managers/ErrorManager.js";
import {TTErrorCodes} from "../models/enums/TTErrorCodes.js";


/**
 * main Class
 */

export interface ITelephony {
    error_lang?: string;
    token?: string;


}

/**
 * main Class
 */

export class Telephony {

    private _error_lang?: string;
    private readonly _token?: string;
    private readonly _api_wrapper?: APIWrapper;
    private _session_handler?: HubConnection;

    constructor(params: ITelephony) {


        this._error_lang = params.error_lang || process.env.TELEPHONYSDK_ERROR_LANG;
        this._token = params.token || process.env.TELEPHONYSDK_TOKEN;
        this.startup();
        this._api_wrapper = new APIWrapper({session_handler: this._session_handler});

    }


    get api_wrapper(): APIWrapper {
        return this._api_wrapper;
    }

    get session_handler(): HubConnection {
        return this._session_handler;
    }


    public async closeSession(): Promise<void> {
        if (this._session_handler.state === "Connected") {
            if (this.api_wrapper) {
                await this.api_wrapper.bye({});
                await this._session_handler.stop();
            } else {
                logger.error('Methods instance is not initialized.');
            }
        }
        logger.info('Connection closed');
    }


    private setupSession(url: string): HubConnection {

        try {
            return new HubConnectionBuilder().withUrl(url).configureLogging(new SignalRLogger).build();
        } catch (e) {
            const error=ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3040_CONNECTION_ERROR,
                data: {$details: e.message}
            });
            logger.error(error.message);
            throw error;
        }

    }


    private startup(): void {
        this._error_lang = ErrorManager.validateLang(this._error_lang);
        const url = TokenManager.index(this._token)
        this._session_handler = this.setupSession(url);
    }


    public async startSession(): Promise<InitializeMethodReturnType> {
        try {

            if (this._session_handler.state === "Disconnected") {
                await this._session_handler.start();
                return await this.api_wrapper.initialize(this._token);
            }
            return <InitializeMethodReturnType><unknown>{error: 'Already initialized'};

        } catch (e) {
            const error=ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3040_CONNECTION_ERROR,
                data: {$details: e.message}
            });
            logger.error(error.message);
            throw error;
        }
    }
}

