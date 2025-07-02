export enum TTErrorCodes {
	/**
	 * [LEC0001] reason='Response JSON does not match the expected structure $details'
	 */
	TTLEC0001_RESPONSE_JSON_DOES_NOT_MATCH_THE_EXPECTED_STRUCTURE = 'ttLEC0001',

	/**
	 * [LEC3005] reason='The audio file is silent'
	 */
	TTLEC3005_THE_AUDIO_FILE_IS_SILENT = 'ttLEC3005',

	/**
	 * [LEC3006] reason='The audio file is larger than $maxAudioSize MB'
	 */
	TTLEC3006_MAX_AUDIO_SIZE_EXCEEDED = 'ttLEC3006',

	/**
	 * [LEC3007] reason='Invalid JWT token'
	 */
	TTLEC3007_INVALID_JWT_TOKEN = 'ttLEC3007',

	/**
	 * [LEC3008] reason='Missing token attribute'
	 */
	TTLEC3008_MISSING_TOKEN_ATTRIBUTE = 'ttLEC3008',

	/**
	 * [LEC3009] reason='Unsupported audio format. Only mp3 and wav formats are supported'
	 */
	TTLEC3009_UNSUPPORTED_AUDIO_FORMAT = 'ttLEC3009',

	/**
	 * [LEC3010] reason='Invalid error language provided'
	 */
	TTLEC3010_INVALID_ERRORS_LANGUAGE_PROVIDED = 'ttLEC3010',

	/**
	 * [LEC3012] reason='Token does not match the expected format'
	 */
	TTLEC3012_TOKEN_DOES_NOT_MATCH_THE_EXPECTED_FORMAT = 'ttLEC3012',

	/**
	 * [LEC3013] reason='Audio file is not mono'
	 */
	TTLEC3013_AUDIO_FILE_IS_NOT_MONO = 'ttLEC3013',

	/**
	 * [LEC3014] reason='Audio file is not stereo'
	 */
	TTLEC3014_AUDIO_FILE_IS_NOT_STEREO = 'ttLEC3014',

	/**
	 * [LEC3020] reason='Audio file duration is too short (must exceed 0.2sec)'
	 */
	TTLEC3020_AUDIO_DURATION_TOO_SHORT = 'ttLEC3020',

	/**
	 * [LEC3021] reason='Host not found in payload'
	 */
	TTLEC3021_HOST_NOT_FOUND_IN_PAYLOAD = 'ttLEC3021',

	/**
	 * [LEC3022] reason='Version information is missing from the API host'
	 */
	TTLEC3022_VERSION_INFO_MISSING_FROM_API_HOST = 'ttLEC3022',

	/**
	 * [LEC3023] reason='Version mismatch'
	 */
	TTLEC3023_VERSION_MISMATCH = 'ttLEC3023',

	/**
	 * [LEC3024] reason='$field does not match the required pattern $pattern'
	 */
	TTLEC3024_FIELD_PATTERN_MISMATCH_ERROR = 'ttLEC3024',

	/**
	 * [LEC3025] reason='$field must be greater than or equal to $minValue'
	 */
	TTLEC3025_FIELD_MIN_VALUE = 'ttLEC3025',

	/**
	 * [LEC3026] reason='$field must be less than or equal to $maxValue'
	 */
	TTLEC3026_FIELD_MAX_VALUE = 'ttLEC3026',

	/**
	 * [LEC3027] reason='$field must be between $minValue and $maxValue'
	 */
	TTLEC3027_FIELD_OUT_OF_RANGE = 'ttLEC3027',

	/**
	 * [LEC3028] reason='Minimum value cannot be greater than maximum value'
	 */
	TTLEC3028_MIN_VALUE_EXCEEDS_MAX = 'ttLEC3028',

	/**
	 * [LEC3029] reason='Unexpected error: The operation could not be completed due to an internal issue : $details'
	 */
	TTLEC3029_UNKNOWN_ERROR = 'ttLEC3029',

	/**
	 * [LEC3030] reason='The provided URL is invalid'
	 */
	TTLEC3030_INVALID_URL = 'ttLEC3030',

	/**
	 * [LEC3031] reason='playback '$uri' for call '$callId' failed due to '$playBackState' state!'
	 */
	TTLEC3031_PLAYBACK_FAILED = 'ttLEC3031',

	/**
	 * [LEC3032] reason='Gateway '$gatewayName' not registered due to '$gatewayState' state!'
	 */
	TTLEC3032_GATEWAY_NOT_REGISTERED = 'ttLEC3032',

	/**
	 * [LEC3033] reason='Call with id '$callId' not active due to '$callState' state!'
	 */
	TTLEC3033_CALL_NOT_ACTIVE = 'ttLEC3033',

	/**
	 * [LEC3034] reason='Failed to hangup call: $details'
	 */
	TTLEC3034_FAILED_TO_HANGUP_CALL = 'ttLEC3034',

	/**
	 * [LEC3035] reason='Recording failed to start: $details'
	 */
	TTLEC3035_RECORDING_FAILED_TO_START = 'ttLEC3035',

	/**
	 * [LEC3036] reason='Call with ID $callId was hung up'
	 */
	TTLEC3036_CALL_HUNG_UP = 'ttLEC3036',

	/**
	 * [LEC3037] reason='Outbound call failed: $details'
	 */
	TTLEC3037_OUTBOUND_CALL_FAILED = 'ttLEC3037',

	/**
	 * [LEC3038] reason='Gateway configuration failed: $gatewayName'
	 */
	TTLEC3038_GATEWAY_CONFIGURATION_FAILED = 'ttLEC3038',

	/**
	 * [LEC3039] reason='Gateway configuration error: $details'
	 */
	TTLEC3039_GATEWAY_CONFIGURATION_ERROR = 'ttLEC3039',

	/**
	 * [LEC3040] reason='Connection error: $details'
	 */
	TTLEC3040_CONNECTION_ERROR = 'ttLEC3040',

	/**
	 * [LEC3041] reason='DTMF operation failed: $details'
	 */
	TTLEC3041_DTMF_OPERATION_FAILED = 'ttLEC3041',

	/**
	 * [LEC3042] reason='Play audio failed: $details'
	 */
	TTLEC3042_PLAY_AUDIO_FAILED = 'ttLEC3042',

	/**
	 * [LEC4000] reason='Token has been expired'
	 */
	TTLEC4000_TOKEN_HAS_BEEN_EXPIRED = 'ttLEC4000',

}