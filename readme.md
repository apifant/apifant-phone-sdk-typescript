# TelephonySDK

A TypeScript library for handling telephony operations using SignalR. This package provides a robust API wrapper for managing telephony sessions and communications.

## Features

- SignalR-based real-time communication
- Configurable error language support
- Token-based authentication
- Advanced logging system with file and console outputs
- Environment variable support
- TypeScript declarations included

## Installation

```bash
npm install telephonysdk
```

## Requirements

- Node.js (ESM support required)
- TypeScript 5.x

## Configuration

### Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Required
TELEPHONYSDK_TOKEN=your_auth_token    # Authentication token for the API

# Optional
TELEPHONYSDK_ERROR_LANG=en            # Language for error messages (default: en)
LOG_LEVEL=info                        # Logging level (default: info)
```

Valid log levels: 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'

Note: If environment variables are not set, you must provide the required parameters when initializing the Telephony class:

```typescript
const api = new Telephony({
  token: 'your_auth_token',
  error_lang: 'en'
});
```

### TypeScript Configuration

The package is built with modern TypeScript features. Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ESNext"
  }
}
```

## Usage

### Basic Setup

```typescript
import { Telephony } from 'telephony';

const api = new Telephony({
  error_lang: 'en',
  token: 'your-auth-token'
});

// Start a session
try {
  const session = await api.startSession();
  console.log('Session started:', session);
} catch (error) {
  console.error('Failed to start session:', error);
}
```

### Managing Sessions

```typescript
// Start a new session
await api.startSession();

// Close the session
await api.closeSession();
```

### Error Handling

The package includes built-in error handling and validation:

```typescript
try {
  await api.startSession();
} catch (error) {
  if (error instanceof TTError) {
    console.error('TelephonySDK Error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Logging

The package includes a sophisticated logging system that integrates Winston for general logging and custom SignalR logging.

### General Logging

The main logging system:
- Creates dated log files automatically
- Includes package version and timestamp in logs
- Creates ASCII banner headers for new log files
- Supports both file and console outputs

Log files are stored in `./logs/{version}/{date}.log`

### Log Levels

Available log levels (from highest to lowest priority):

```typescript
const logLevels = {
  error: 0,    // Error conditions
  warn: 1,     // Warning conditions
  info: 2,     // Informational messages
  http: 3,     // HTTP request-specific logging
  verbose: 4,  // Detailed debug information
  debug: 5,    // Debugging messages
  silly: 6     // Extremely detailed debugging
}
```

Set your preferred log level in the `.env` file. Messages with priority equal to or higher than the set level will be logged.

### SignalR Logging

The package includes a custom SignalR logger that maps SignalR log levels to Winston log levels:

- SignalR.LogLevel.Critical → winston.error
- SignalR.LogLevel.Error → winston.error
- SignalR.LogLevel.Warning → winston.warn
- SignalR.LogLevel.Information → winston.info
- SignalR.LogLevel.Debug → winston.debug
- SignalR.LogLevel.Trace → winston.verbose
- SignalR.LogLevel.None → no logging

SignalR logs will automatically be included in your log files with appropriate log levels.

## Development

### Building the Package

```bash
# Install dependencies
npm i
# Build the package
npm run build

# Watch mode for development
npm run watch
```

### Scripts

- `npm run build`: Compiles TypeScript and copies resources
- `npm run watch`: Watches for changes and recompiles
- `npm run copy-resources`: Copies resource files to dist
- `npm run pack`: Creates a npm package


## Dependencies

- @microsoft/signalr: Real-time communication
- winston: Logging framework
- date-fns: Date manipulation
- figlet: ASCII art generation
- jsonwebtoken: JWT handling
- dotenv: Environment variable management

## Types

TypeScript types are included and available at:

```typescript
import { ITelephony, Telephony } from 'telephony';
```

## Notes

- if you face any difficulties or issues regarding the ssl certificate, you can disable the ssl verification by setting the `NODE_TLS_REJECT_UNAUTHORIZED` environment variable to `0` in the `.env` file, example:

```if (process.env.NODE_ENV !== 'production') {process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";}```