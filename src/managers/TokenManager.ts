import {config} from 'dotenv';
import jwt, {Jwt} from 'jsonwebtoken';
import {ErrorManager} from "./ErrorManager.js";
import {TTErrorCodes} from "../models/enums/TTErrorCodes.js";
import logger from "../config/logger.js";

config();

interface TribeData {
    host?: string;
    holder?: any;

}

interface TokenPayload extends jwt.JwtPayload {
    tribeData?: TribeData;
    host?: string;
    exp: number;
}

export class TokenManager {
    // private readonly _sdk_version; // Replace with actual SDK version


    /**
     * Validates the token, checking its validity, expiration, and version compatibility
     */
    static index(token:string): string {
        logger.debug('Validating your token...');
        if (!token) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3008_MISSING_TOKEN_ATTRIBUTE
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        logger.debug('Token is present!');
        let cleanToken = token.replace('FSAPI.', '');
        const payload = this.decode(cleanToken);
        this.checkExpired(payload.exp);
        return this.isValidUrl(this.getApiHost(payload));
        // this.checkVersionCompatibility(this._host).then();

    }

    private static isValidUrl(url: string): string {
        try {
            new URL(url);
            return url;
        } catch (_) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3030_INVALID_URL,
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
    }

    /**
     * Decodes the JWT token
     * @param token JWT token string
     * @returns Decoded token payload
     */
    private static decode(token: string): TokenPayload {
        let decoded : Jwt;
        try {

            decoded = jwt.decode(token, {complete: true});
        }
        catch (e) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3007_INVALID_JWT_TOKEN,
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        if (!decoded || typeof decoded === 'string') {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3007_INVALID_JWT_TOKEN,
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }

        return decoded.payload as TokenPayload;
    }

    /**
     * Checks if the token has expired
     * @param exp Expiration timestamp from token
     */
    private static checkExpired(exp: number): void {
        logger.debug("Checking your token's expiration date...");

        if (Date.now() >= exp * 1000) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC4000_TOKEN_HAS_BEEN_EXPIRED
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }

    }

    /**
     * Gets the holder information from the token payload
     * @returns Holder information
     */
    private static getHolder(token:string): any {
        logger.debug('Extracting your holder information...');

        const payload = this.decode(token);

        if (payload.tribeData?.holder) {
            return payload.tribeData.holder;
        }

        const error = ErrorManager.exception({
            error_code: TTErrorCodes.TTLEC3012_TOKEN_DOES_NOT_MATCH_THE_EXPECTED_FORMAT,
        });
        Error.captureStackTrace(error);
        logger.error(error.message);
        throw error;
    }

    /**
     * Extracts the API host from the token payload
     * @param payload Decoded token payload
     * @returns API host URL
     */
    private static getApiHost(payload: TokenPayload): string {
        logger.debug('Extracting your host...');
        if (!payload.tribeData) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3012_TOKEN_DOES_NOT_MATCH_THE_EXPECTED_FORMAT
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }
        const host = payload.tribeData.host ;

        if (!host) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3021_HOST_NOT_FOUND_IN_PAYLOAD
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }

        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
        );

        if (!urlPattern.test(host)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3030_INVALID_URL,
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }

        return host;
    }

    /**
     * Checks if the API host version is compatible with the SDK version
     * @param apiHost API host URL
     */
    // private async checkVersionCompatibility(apiHost: string): Promise<void> {
    //     logger.info("Checking your host's version...");
    //
    //     try {
    //         console.log(`${apiHost}/api/version`);
    //         const response = await axios.get(`${apiHost}/api/version`, {
    //             validateStatus: null
    //         });
    //
    //         if (response.status !== 200) {
    //             const error = ErrorManager.exception({
    //                 error_text: `Request failed with status code: ${response.status}`
    //             });
    //             Error.captureStackTrace(error);
    //             logger.error(error.message);
    //             throw error;
    //         }
    //
    //         const apiVersion = response.data.version;
    //         const sdkVersion = this._sdk_version;
    //
    //         if (!sdkVersion) {
    //             const error = ErrorManager.exception({
    //                 error_text: 'Version information is missing from the API host'
    //             });
    //             Error.captureStackTrace(error);
    //             logger.error(error.message);
    //             throw error;
    //         }
    //
    //         // Compare major and minor versions
    //         const apiMajorMinor = apiVersion.split('.').slice(0, 2).join('.');
    //         const sdkMajorMinor = sdkVersion.split('.').slice(0, 2).join('.');
    //
    //         if (apiMajorMinor !== sdkMajorMinor) {
    //             const error = ErrorManager.exception({
    //                 error_text: `Version mismatch: Host (v${apiMajorMinor}), SDK (v${sdkMajorMinor})`
    //             });
    //             Error.captureStackTrace(error);
    //             logger.error(error.message);
    //             throw error;
    //         }
    //
    //         logger.info('Version compatibility check passed!');
    //     } catch (e) {
    //         const error = ErrorManager.exception({
    //             error_text: (e as Error).message
    //         });
    //         Error.captureStackTrace(error);
    //         logger.error(error.message);
    //         throw error;
    //     }
    // }
}
