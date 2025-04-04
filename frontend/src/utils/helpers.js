import { format, formatDistance, parseISO } from 'date-fns';
import { DATE_FORMATS } from './constants';

// String helpers
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str, length = 30, suffix = '...') => {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + suffix : str;
};

export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Number helpers
export const formatNumber = (number, options = {}) => {
  if (number === null || number === undefined) return '';
  return new Intl.NumberFormat(undefined, options).format(number);
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPercentage = (value, decimals = 1) => {
  return `${formatNumber(value, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}%`;
};

// Date helpers
export const formatDate = (date, pattern = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, pattern);
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(parsedDate, new Date(), { addSuffix: true });
};

export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

// Array helpers
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    return {
      ...result,
      [group]: [...(result[group] || []), item],
    };
  }, {});
};

export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
};

export const uniqueBy = (array, key) => {
  return Array.from(new Map(array.map(item => [item[key], item])).values());
};

// Object helpers
export const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export const omit = (object, keys) => {
  return Object.keys(object)
    .filter(key => !keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// URL helpers
export const getQueryParams = (url) => {
  const params = new URLSearchParams(url ? new URL(url).search : window.location.search);
  return Object.fromEntries(params.entries());
};

export const buildQueryString = (params) => {
  return new URLSearchParams(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
  ).toString();
};

// File helpers
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Color helpers
export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return alpha
    ? `rgba(${r}, ${g}, ${b}, ${alpha})`
    : `rgb(${r}, ${g}, ${b})`;
};

export const getContrastColor = (hexcolor) => {
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
};

// Validation helpers
export const isEmail = (email) => {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(email);
};

export const isURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

// Random helpers
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, length + 2);
};

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Debounce & Throttle
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Export all helpers
export default {
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