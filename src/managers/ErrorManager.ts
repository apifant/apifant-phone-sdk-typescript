import {TTErrorCodes} from "../models/enums/TTErrorCodes.js";
import * as path from 'path';
import * as fs from 'fs';
import {fileURLToPath} from "url";
import logger from "../config/logger.js";
import {ApiFantException} from "../exception/ApiFantException.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ErrorManager extends Error {
    private static readonly PROGRAMMING_LANG: string = "TS";
    private static error_lang: string;

    static exception({error_text, error_code, data}: {
        error_text?: string,
        error_code?: TTErrorCodes,
        data?: Record<string, any>
    }): ApiFantException {
        if (error_text && !error_code) {
            error_code =  ErrorManager.get_error_code_from_response(error_text);
            if (!error_code) {
                return new ApiFantException(error_text);
            }
        } else if (!error_code && !error_text) {
            return new ApiFantException(ErrorManager.get_msg_by_code(TTErrorCodes.TTLEC3029_UNKNOWN_ERROR));
        }
        let err_msg = "";
        if (error_code && error_text) {
            err_msg = ErrorManager.get_msg_by_code( error_code, error_text);
            err_msg = ErrorManager.insert_err_desc(error_text, err_msg);
        } else if (error_code) {
            err_msg = ErrorManager.get_msg_by_code( error_code);
        }

        if (!err_msg) {
            return new ApiFantException(ErrorManager.get_msg_by_code(TTErrorCodes.TTLEC3029_UNKNOWN_ERROR));

        }
        const formatted_err_msg = ErrorManager.format_msg(err_msg, data);

        return new ApiFantException(formatted_err_msg);
    }

    private static get_error_code_from_response(error_text: string): TTErrorCodes | null {
        const pattern = /\[(.*?)]/;
        const match = pattern.exec(error_text);
        if (!match?.[1]) {
            return TTErrorCodes.TTLEC3029_UNKNOWN_ERROR;
        }

        let errorCode = match[1];
        const errors = ErrorManager.get_errors_list();
        const matchingJson = Object.keys(errors).find(key => key.toLowerCase() === errorCode.toLowerCase())
        const matchingEnum=Object.values(TTErrorCodes).find(code =>
            code.toLowerCase() === errorCode.toLowerCase()
        );
        if (!matchingEnum && !matchingJson) {
            return null;
        }

        if (matchingJson){
            errorCode = matchingJson;
        }
        return errorCode as TTErrorCodes;
    }

    private static extract_err_desc(error_text: string): string {
        const pattern = /e=\\"(.*?)\\"/;
        const match = pattern.exec(error_text);
        return match ? match[1] : "";
    }

    private static insert_err_desc(error_text: string, error_msg: string): string {
        const extracted_desc = ErrorManager.extract_err_desc(error_text);
        if (error_msg) {
            return error_msg.replace('$e', `"${extracted_desc}"`).replace("$PROGRAMMING_LANG", ErrorManager.PROGRAMMING_LANG);
        } else {
            return error_text;
        }
    }

    private static get_msg_by_code( error_code: TTErrorCodes, error_text?: string): string {
        try {
            const errors = ErrorManager.get_errors_list();

            return errors[error_code] || error_text || ErrorManager.get_msg_by_code( TTErrorCodes.TTLEC3029_UNKNOWN_ERROR);
        } catch (e) {
            if (error_text) {
                return error_text;
            }
            return ErrorManager.get_msg_by_code( TTErrorCodes.TTLEC3029_UNKNOWN_ERROR);
        }
    }

    private static get_errors_list(): Record<string, string> {

        const file_path = path.resolve(__dirname, `../resources/i18n/errors_${ErrorManager.error_lang}.json`);
        if (!fs.existsSync(file_path)) {
            logger.error(`File not found: ${file_path}`);
            return {};
        }
        try {
            const errors_file = fs.readFileSync(file_path, 'utf-8');
            return JSON.parse(errors_file);
        } catch (json_err) {
            logger.error(`JSON decode error: ${json_err}`);
            return {};
        }
    }

    private static format_msg(err_msg: string, data?: Record<string, any>): string {

        const pattern = /\$[a-zA-Z_]\w*/g;

        if (!data) {
            data = {};
        }

        data["$PROGRAMMING_LANG"] = ErrorManager.PROGRAMMING_LANG;


        return err_msg.replace(pattern, (match) => data[match] || match);
    }

    public static validateLang(lang: string): string {
        const supportedLanguages = ['en', 'fr', 'de'];
        if (!lang) {
            ErrorManager.error_lang = 'en';
            logger.warn(`Error Language set to default: ${ErrorManager.error_lang}`);
            return ErrorManager.error_lang;
        }
        lang=lang.toLowerCase()
        if (!supportedLanguages.includes(lang)) {
            ErrorManager.error_lang = 'en';
            const error = ErrorManager.exception({
                error_code: TTErrorCodes.TTLEC3010_INVALID_ERRORS_LANGUAGE_PROVIDED,
            });
            Error.captureStackTrace(error);
            logger.error(error.message);
            throw error;
        } else {
            ErrorManager.error_lang = lang;
        }
        logger.info(`Error Language set to: ${ErrorManager.error_lang}`);

        return ErrorManager.error_lang;
    }
}

