import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { format } from 'date-fns';
import { createLogger, transports, format as logFormat } from 'winston';
import figlet from 'figlet';
import { fileURLToPath } from 'url';
import stackTrace from 'stack-trace';

dotenv.config();

const validLogLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'];
const defaultLogLevel = 'info';
const logLevel = process.env.LOG_LEVEL && validLogLevels.includes(process.env.LOG_LEVEL)
    ? process.env.LOG_LEVEL
    : defaultLogLevel;

function getPackageInfo() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
    const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
    return JSON.parse(packageJson);
}

function getLogFilePath(): string {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { version } = getPackageInfo();
    const logDirectory = path.join(__dirname, '..', '..', 'logs', version);
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true });
    }
    return path.join(logDirectory, `${currentDate}.log`);
}

function formatStackTrace(trace: stackTrace.StackFrame[]): string {
    return trace
        .filter(frame => {
            const fileName = frame.getFileName();
            return fileName &&
                !fileName.includes('node_modules') &&
                !fileName.startsWith('node:');
        })
        .map(frame => {
            const fileName = frame.getFileName();
            const lineNumber = frame.getLineNumber();
            const columnNumber = frame.getColumnNumber();
            const functionName = frame.getFunctionName() || '<anonymous>';
            return `    at ${functionName} (${fileName}:${lineNumber}:${columnNumber})`;
        })
        .join('\n');
}
function createCustomLogger() {
    const { name, version } = getPackageInfo();
    const logPath = getLogFilePath();

    const customFormat = logFormat.printf(({ timestamp, level, message,stack }) => {
        const trace = stackTrace.get();
        let logMessage = `${timestamp} - ${name} version ${version} - [${level}] - ${message}`;

        // Add stack trace for error level logs
        if (level === 'error') {
            const stackTraceStr = stack || formatStackTrace(trace);
            logMessage += '\nStack Trace:\n' + stackTraceStr;
        }
        return logMessage;
    });

    const logger = createLogger({
        level: logLevel,
        format: logFormat.combine(
            logFormat.timestamp(),
            customFormat
        ),
        transports: [
            new transports.File({ filename: logPath }),
            new transports.Console({
                // handleExceptions: true,
                format: logFormat.combine(
                    logFormat.colorize({ all: true }),
                    logFormat.timestamp(),
                    customFormat,
                )
            }),

        ]
    });

    if (!process.env.LOG_LEVEL || !validLogLevels.includes(process.env.LOG_LEVEL)) {
        logger.warn(
            `No valid LOG_LEVEL found in environment variables. Valid levels are: ${validLogLevels.join(', ')}. ` +
            `Using default level: ${defaultLogLevel}`
        );
    }

    if (!fs.existsSync(logPath) && version) {
        try {
            const banner = figlet.textSync(`${name} ts V${version}`, { font: 'Slant' });
            logger.log('info', "\n" + banner);
        } catch (error) {
            console.error("figlet library not found. Please install it using 'npm install figlet'.");
        }
    }

    return logger;
}

const logger = createCustomLogger();
export default logger;