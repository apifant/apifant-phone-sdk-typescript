import * as signalR from "@microsoft/signalr";
import logger from "./logger.js";

export class SignalRLogger implements signalR.ILogger {
    log(logLevel: signalR.LogLevel, message: string): void {
        // Map SignalR log levels to Winston's log levels
        switch (logLevel) {
            case signalR.LogLevel.Error:
                logger.error(message);
                break;
            case signalR.LogLevel.Warning:
                logger.warn(message);
                break;
            case signalR.LogLevel.Information:
                logger.info(message);
                break;
            case signalR.LogLevel.Trace:
                logger.verbose(message);  // Verbose can be used for trace
                break;
            case signalR.LogLevel.Debug:
                logger.debug(message);
                break;
            case signalR.LogLevel.None:
                break;  // Do nothing
            case signalR.LogLevel.Critical:
                logger.error(message);
                break
            default:
                logger.info(message);  // Default log level
        }
    }
}
