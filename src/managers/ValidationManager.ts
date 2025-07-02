import {ErrorManager} from "./ErrorManager.js";
import logger from "../config/logger.js";
import {TTErrorCodes} from "../models/enums/TTErrorCodes.js";

export class ValidationManager {
    static validateAttributes(params: any, classAttributes: string[], allAttrs: string[] = []): void {
        const paramAttributes = Object.keys(params);

        const missingAttributes = classAttributes.filter(attr => !paramAttributes.includes(attr));
        const extraAttributes = paramAttributes.filter(attr => !allAttrs.includes(attr));

        if (missingAttributes.length > 0 || (extraAttributes.length > 0)) {
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC0001_RESPONSE_JSON_DOES_NOT_MATCH_THE_EXPECTED_STRUCTURE,
                data: {$details: `(Missing attributes: ${missingAttributes.join(', ')}${extraAttributes.length > 0 ? `. Extra attributes: ${extraAttributes.join(', ')}` : ''}).`}
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        }

    }

}
