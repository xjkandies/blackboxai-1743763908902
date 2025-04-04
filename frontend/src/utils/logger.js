// Log levels
const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

// Logger configuration
const config = {
  level: process.env.NODE_ENV === 'development' ? LOG_LEVELS.DEBUG : LOG_LEVELS.ERROR,
  enabled: true,
  prefix: '[App]',
  dateFormat: 'HH:mm:ss',
  colors: {
    debug: '#7f8c8d', // Gray
    info: '#2ecc71',  // Green
    warn: '#f1c40f',  // Yellow
    error: '#e74c3c', // Red
  },
};

// Format log message
const formatMessage = (level, message, ...args) => {
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return {
    timestamp,
    level,
    message: typeof message === 'string' ? message : JSON.stringify(message),
    args: args.length ? args : undefined,
  };
};

// Console styling
const getConsoleStyle = (level) => {
  return `color: ${config.colors[level]}; font-weight: bold;`;
};

// Log methods
const debug = (message, ...args) => {
  if (!config.enabled || config.level !== LOG_LEVELS.DEBUG) return;

  const logData = formatMessage(LOG_LEVELS.DEBUG, message, ...args);
  console.debug(
    `%c${config.prefix} [${logData.timestamp}] [DEBUG]`,
    getConsoleStyle(LOG_LEVELS.DEBUG),
    logData.message,
    ...(logData.args || [])
  );
};

const info = (message, ...args) => {
  if (!config.enabled) return;

  const logData = formatMessage(LOG_LEVELS.INFO, message, ...args);
  console.info(
    `%c${config.prefix} [${logData.timestamp}] [INFO]`,
    getConsoleStyle(LOG_LEVELS.INFO),
    logData.message,
    ...(logData.args || [])
  );
};

const warn = (message, ...args) => {
  if (!config.enabled) return;

  const logData = formatMessage(LOG_LEVELS.WARN, message, ...args);
  console.warn(
    `%c${config.prefix} [${logData.timestamp}] [WARN]`,
    getConsoleStyle(LOG_LEVELS.WARN),
    logData.message,
    ...(logData.args || [])
  );
};

const error = (message, ...args) => {
  if (!config.enabled) return;

  const logData = formatMessage(LOG_LEVELS.ERROR, message, ...args);
  console.error(
    `%c${config.prefix} [${logData.timestamp}] [ERROR]`,
    getConsoleStyle(LOG_LEVELS.ERROR),
    logData.message,
    ...(logData.args || [])
  );
};

// Special logging methods
const logAction = (action, state) => {
  if (!config.enabled || config.level !== LOG_LEVELS.DEBUG) return;

  console.group(
    `%c${config.prefix} Action: ${action.type}`,
    'color: #3498db; font-weight: bold;'
  );
  console.log('%cPrevious State:', 'color: #7f8c8d', state);
  console.log('%cAction:', 'color: #2ecc71', action);
  console.log('%cNext State:', 'color: #e67e22', state);
  console.groupEnd();
};

const logRequest = (method, url, data) => {
  if (!config.enabled || config.level !== LOG_LEVELS.DEBUG) return;

  console.group(
    `%c${config.prefix} Request: ${method.toUpperCase()} ${url}`,
    'color: #3498db; font-weight: bold;'
  );
  if (data) {
    console.log('%cData:', 'color: #7f8c8d', data);
  }
  console.groupEnd();
};

const logResponse = (method, url, response) => {
  if (!config.enabled || config.level !== LOG_LEVELS.DEBUG) return;

  console.group(
    `%c${config.prefix} Response: ${method.toUpperCase()} ${url}`,
    'color: #2ecc71; font-weight: bold;'
  );
  console.log('%cStatus:', 'color: #7f8c8d', response.status);
  console.log('%cData:', 'color: #7f8c8d', response.data);
  console.groupEnd();
};

const logError = (error) => {
  if (!config.enabled) return;

  console.group(
    `%c${config.prefix} Error`,
    'color: #e74c3c; font-weight: bold;'
  );
  if (error.response) {
    console.log('%cResponse Error:', 'color: #7f8c8d', {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
    });
  } else if (error.request) {
    console.log('%cRequest Error:', 'color: #7f8c8d', error.request);
  } else {
    console.log('%cError:', 'color: #7f8c8d', error.message);
  }
  console.log('%cStack:', 'color: #7f8c8d', error.stack);
  console.groupEnd();
};

// Configuration methods
const setLevel = (level) => {
  if (Object.values(LOG_LEVELS).includes(level)) {
    config.level = level;
  }
};

const enable = () => {
  config.enabled = true;
};

const disable = () => {
  config.enabled = false;
};

const setPrefix = (prefix) => {
  config.prefix = prefix;
};

// Export logger
export const logger = {
  // Log methods
  debug,
  info,
  warn,
  error,

  // Special logging methods
  logAction,
  logRequest,
  logResponse,
  logError,

  // Configuration methods
  setLevel,
  enable,
  disable,
  setPrefix,

  // Constants
  LOG_LEVELS,
};

export default logger;