import { VALIDATION_RULES, ERROR_MESSAGES } from './constants';

// Email validation
export const isValidEmail = (email) => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  return (
    password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH &&
    VALIDATION_RULES.PASSWORD_REGEX.test(password)
  );
};

// Username validation
export const isValidUsername = (username) => {
  return VALIDATION_RULES.USERNAME_REGEX.test(username);
};

// Phone validation
export const isValidPhone = (phone) => {
  return VALIDATION_RULES.PHONE_REGEX.test(phone);
};

// Required field validation
export const isRequired = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length > 0;
  }
  return value !== undefined && value !== null && value !== '';
};

// Min length validation
export const minLength = (value, min) => {
  return value.length >= min;
};

// Max length validation
export const maxLength = (value, max) => {
  return value.length <= max;
};

// Match validation
export const matches = (value, pattern) => {
  return pattern.test(value);
};

// Equal to validation
export const equalTo = (value, comparison) => {
  return value === comparison;
};

// File type validation
export const isValidFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

// File size validation
export const isValidFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Date validation
export const isValidDate = (date) => {
  const timestamp = Date.parse(date);
  return !isNaN(timestamp);
};

// Future date validation
export const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

// Past date validation
export const isPastDate = (date) => {
  return new Date(date) < new Date();
};

// Number range validation
export const isInRange = (number, min, max) => {
  return number >= min && number <= max;
};

// Form validation helper
export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = values[field];

    // Required validation
    if (fieldRules.required && !isRequired(value)) {
      errors[field] = fieldRules.required === true
        ? ERROR_MESSAGES.REQUIRED_FIELD
        : fieldRules.required;
      return;
    }

    // Skip other validations if field is empty and not required
    if (!isRequired(value) && !fieldRules.required) {
      return;
    }

    // Email validation
    if (fieldRules.email && !isValidEmail(value)) {
      errors[field] = fieldRules.email === true
        ? ERROR_MESSAGES.INVALID_EMAIL
        : fieldRules.email;
    }

    // Password validation
    if (fieldRules.password && !isValidPassword(value)) {
      errors[field] = fieldRules.password === true
        ? ERROR_MESSAGES.INVALID_PASSWORD
        : fieldRules.password;
    }

    // Min length validation
    if (fieldRules.minLength && !minLength(value, fieldRules.minLength)) {
      errors[field] = `Must be at least ${fieldRules.minLength} characters`;
    }

    // Max length validation
    if (fieldRules.maxLength && !maxLength(value, fieldRules.maxLength)) {
      errors[field] = `Must be no more than ${fieldRules.maxLength} characters`;
    }

    // Pattern validation
    if (fieldRules.pattern && !matches(value, fieldRules.pattern)) {
      errors[field] = fieldRules.message || 'Invalid format';
    }

    // Equal to validation
    if (fieldRules.equalTo && !equalTo(value, values[fieldRules.equalTo])) {
      errors[field] = fieldRules.message || ERROR_MESSAGES.PASSWORDS_DONT_MATCH;
    }

    // Custom validation
    if (fieldRules.validate) {
      const customError = fieldRules.validate(value, values);
      if (customError) {
        errors[field] = customError;
      }
    }
  });

  return errors;
};

// Example validation rules
export const validationRules = {
  // Auth validation rules
  login: {
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
      minLength: VALIDATION_RULES.PASSWORD_MIN_LENGTH,
    },
  },

  register: {
    username: {
      required: true,
      pattern: VALIDATION_RULES.USERNAME_REGEX,
      message: 'Username must be 3-20 characters and can only contain letters, numbers, and underscores',
    },
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
      password: true,
    },
    confirmPassword: {
      required: true,
      equalTo: 'password',
    },
  },

  // Profile validation rules
  profile: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    phone: {
      pattern: VALIDATION_RULES.PHONE_REGEX,
      message: 'Please enter a valid phone number',
    },
    bio: {
      maxLength: 500,
    },
  },

  // Release validation rules
  release: {
    title: {
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    artist: {
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    releaseDate: {
      required: true,
      validate: (value) => !isValidDate(value) ? 'Please enter a valid date' : null,
    },
  },

  // Campaign validation rules
  campaign: {
    name: {
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    startDate: {
      required: true,
      validate: (value) => !isFutureDate(value) ? 'Start date must be in the future' : null,
    },
    endDate: {
      required: true,
      validate: (value, values) => {
        if (!isFutureDate(value)) return 'End date must be in the future';
        if (new Date(value) <= new Date(values.startDate)) {
          return 'End date must be after start date';
        }
        return null;
      },
    },
  },
};

export default {
  isValidEmail,
  isValidPassword,
  isValidUsername,
  isValidPhone,
  isRequired,
  minLength,
  maxLength,
  matches,
  equalTo,
  isValidFileType,
  isValidFileSize,
  isValidUrl,
  isValidDate,
  isFutureDate,
  isPastDate,
  isInRange,
  validateForm,
  validationRules,
};