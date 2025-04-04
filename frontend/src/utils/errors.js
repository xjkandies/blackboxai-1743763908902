import { ERROR_MESSAGES } from './constants';
import { logger } from './logger';
import { events } from './events';

// Error types
export const ERROR_TYPES = {
  API: 'api_error',
  NETWORK: 'network_error',
  VALIDATION: 'validation_error',
  AUTH: 'auth_error',
  NOT_FOUND: 'not_found_error',
  PERMISSION: 'permission_error',
  SERVER: 'server_error',
  CLIENT: 'client_error',
  UNKNOWN: 'unknown_error',
};

// Error class
class AppError extends Error {
  constructor(message, type = ERROR_TYPES.UNKNOWN, details = null) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.details = details;
    this.timestamp = new Date();

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      type: this.type,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

// Format API error response
const formatApiError = (error) => {
  if (!error.response) {
    return new AppError(
      ERROR_MESSAGES.NETWORK,
      ERROR_TYPES.NETWORK
    );
  }

  const { status, data } = error.response;

  switch (status) {
    case STATUS_CODES.BAD_REQUEST:
      return new AppError(
        data.message || ERROR_MESSAGES.DEFAULT,
        ERROR_TYPES.CLIENT,
        data.errors
      );

    case STATUS_CODES.UNAUTHORIZED:
      return new AppError(
        data.message || ERROR_MESSAGES.UNAUTHORIZED,
        ERROR_TYPES.AUTH
      );

    case STATUS_CODES.FORBIDDEN:
      return new AppError(
        data.message || ERROR_MESSAGES.FORBIDDEN,
        ERROR_TYPES.PERMISSION
      );

    case STATUS_CODES.NOT_FOUND:
      return new AppError(
        data.message || ERROR_MESSAGES.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND
      );

    case STATUS_CODES.VALIDATION_ERROR:
      return new AppError(
        data.message || ERROR_MESSAGES.VALIDATION,
        ERROR_TYPES.VALIDATION,
        data.errors
      );

    case STATUS_CODES.SERVER_ERROR:
      return new AppError(
        data.message || ERROR_MESSAGES.SERVER,
        ERROR_TYPES.SERVER
      );

    default:
      return new AppError(
        data.message || ERROR_MESSAGES.DEFAULT,
        ERROR_TYPES.UNKNOWN,
        data.errors
      );
  }
};

// Format validation errors
const formatValidationError = (errors) => {
  return new AppError(
    ERROR_MESSAGES.VALIDATION,
    ERROR_TYPES.VALIDATION,
    errors
  );
};

// Format network errors
const formatNetworkError = (error) => {
  return new AppError(
    error.message || ERROR_MESSAGES.NETWORK,
    ERROR_TYPES.NETWORK
  );
};

// Format any error
const format = (error) => {
  try {
    // Already formatted
    if (error instanceof AppError) {
      return error;
    }

    // Axios error
    if (error.isAxiosError) {
      return formatApiError(error);
    }

    // Network error
    if (error instanceof TypeError && error.message === 'Network Error') {
      return formatNetworkError(error);
    }

    // Validation error
    if (error.name === 'ValidationError') {
      return formatValidationError(error.errors);
    }

    // Unknown error
    return new AppError(
      error.message || ERROR_MESSAGES.DEFAULT,
      ERROR_TYPES.UNKNOWN
    );
  } catch (e) {
    logger.error('Error formatting error:', e);
    return new AppError(ERROR_MESSAGES.DEFAULT, ERROR_TYPES.UNKNOWN);
  }
};

// Handle error
const handle = (error) => {
  const formattedError = format(error);

  // Log error
  logger.error('Error handled:', formattedError);

  // Emit error event
  events.emit(events.EVENT_NAMES.ERROR_API, formattedError);

  return formattedError;
};

// Check if error is of specific type
const is = (error, type) => {
  const formattedError = format(error);
  return formattedError.type === type;
};

// Get error message
const getMessage = (error) => {
  const formattedError = format(error);
  return formattedError.message;
};

// Get error details
const getDetails = (error) => {
  const formattedError = format(error);
  return formattedError.details;
};

// Create error
const create = (message, type = ERROR_TYPES.UNKNOWN, details = null) => {
  return new AppError(message, type, details);
};

// Export errors utility
export const errors = {
  ERROR_TYPES,
  AppError,
  format,
  handle,
  is,
  getMessage,
  getDetails,
  create,
};

export default errors;