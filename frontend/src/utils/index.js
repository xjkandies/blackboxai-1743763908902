// Import all utilities
import { api } from './api';
import { analytics } from './analytics';
import { errors, ERROR_TYPES } from './errors';
import { events, EVENT_NAMES } from './events';
import { logger } from './logger';
import { storage } from './storage';
import { theme } from './theme';
import { validation } from './validation';
import {
  // String helpers
  capitalize,
  truncate,
  slugify,

  // Number helpers
  formatNumber,
  formatCurrency,
  formatPercentage,

  // Date helpers
  formatDate,
  formatRelativeTime,
  isValidDate,

  // Array helpers
  groupBy,
  sortBy,
  uniqueBy,

  // Object helpers
  pick,
  omit,
  deepClone,

  // URL helpers
  getQueryParams,
  buildQueryString,

  // File helpers
  formatFileSize,
  getFileExtension,

  // Color helpers
  hexToRGB,
  getContrastColor,

  // Validation helpers
  isEmail,
  isURL,

  // Random helpers
  generateId,
  randomInt,

  // Function helpers
  debounce,
  throttle,
} from './helpers';

import {
  useAsync,
  useForm,
  usePagination,
  useLocalStorage,
  useDebounce,
  useIntersectionObserver,
  useQueryParams,
  useEventListener,
} from './hooks';

// Export individual utilities
export {
  api,
  analytics,
  errors,
  ERROR_TYPES,
  events,
  EVENT_NAMES,
  logger,
  storage,
  theme,
  validation,

  // Hooks
  useAsync,
  useForm,
  usePagination,
  useLocalStorage,
  useDebounce,
  useIntersectionObserver,
  useQueryParams,
  useEventListener,

  // String helpers
  capitalize,
  truncate,
  slugify,

  // Number helpers
  formatNumber,
  formatCurrency,
  formatPercentage,

  // Date helpers
  formatDate,
  formatRelativeTime,
  isValidDate,

  // Array helpers
  groupBy,
  sortBy,
  uniqueBy,

  // Object helpers
  pick,
  omit,
  deepClone,

  // URL helpers
  getQueryParams,
  buildQueryString,

  // File helpers
  formatFileSize,
  getFileExtension,

  // Color helpers
  hexToRGB,
  getContrastColor,

  // Validation helpers
  isEmail,
  isURL,

  // Random helpers
  generateId,
  randomInt,

  // Function helpers
  debounce,
  throttle,
};

// Export default object with all utilities
export default {
  api,
  analytics,
  errors,
  ERROR_TYPES,
  events,
  EVENT_NAMES,
  logger,
  storage,
  theme,
  validation,

  // Hooks
  hooks: {
    useAsync,
    useForm,
    usePagination,
    useLocalStorage,
    useDebounce,
    useIntersectionObserver,
    useQueryParams,
    useEventListener,
  },

  // String helpers
  string: {
    capitalize,
    truncate,
    slugify,
  },

  // Number helpers
  number: {
    formatNumber,
    formatCurrency,
    formatPercentage,
  },

  // Date helpers
  date: {
    formatDate,
    formatRelativeTime,
    isValidDate,
  },

  // Array helpers
  array: {
    groupBy,
    sortBy,
    uniqueBy,
  },

  // Object helpers
  object: {
    pick,
    omit,
    deepClone,
  },

  // URL helpers
  url: {
    getQueryParams,
    buildQueryString,
  },

  // File helpers
  file: {
    formatFileSize,
    getFileExtension,
  },

  // Color helpers
  color: {
    hexToRGB,
    getContrastColor,
  },

  // Validation helpers
  validate: {
    isEmail,
    isURL,
  },

  // Random helpers
  random: {
    generateId,
    randomInt,
  },

  // Function helpers
  fn: {
    debounce,
    throttle,
  },
};