import { STORAGE_KEYS } from './constants';
import { logger } from './logger';

// Storage wrapper with error handling
const storageWrapper = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      logger.error('Storage get error:', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error('Storage set error:', error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.error('Storage remove error:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      logger.error('Storage clear error:', error);
      return false;
    }
  },
};

// Auth storage operations
export const auth = {
  getToken: () => storageWrapper.get(STORAGE_KEYS.AUTH_TOKEN),
  setToken: (token) => storageWrapper.set(STORAGE_KEYS.AUTH_TOKEN, token),
  getRefreshToken: () => storageWrapper.get(STORAGE_KEYS.REFRESH_TOKEN),
  setRefreshToken: (token) => storageWrapper.set(STORAGE_KEYS.REFRESH_TOKEN, token),
  clearTokens: () => {
    storageWrapper.remove(STORAGE_KEYS.AUTH_TOKEN);
    storageWrapper.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },
};

// User preferences storage operations
export const preferences = {
  get: () => storageWrapper.get(STORAGE_KEYS.USER_PREFERENCES) || {},
  set: (prefs) => storageWrapper.set(STORAGE_KEYS.USER_PREFERENCES, prefs),
  update: (updates) => {
    const current = preferences.get();
    return preferences.set({ ...current, ...updates });
  },
  clear: () => storageWrapper.remove(STORAGE_KEYS.USER_PREFERENCES),
};

// Theme storage operations
export const theme = {
  get: () => storageWrapper.get(STORAGE_KEYS.THEME),
  set: (theme) => storageWrapper.set(STORAGE_KEYS.THEME, theme),
  clear: () => storageWrapper.remove(STORAGE_KEYS.THEME),
};

// Language storage operations
export const language = {
  get: () => storageWrapper.get(STORAGE_KEYS.LANGUAGE),
  set: (lang) => storageWrapper.set(STORAGE_KEYS.LANGUAGE, lang),
  clear: () => storageWrapper.remove(STORAGE_KEYS.LANGUAGE),
};

// Navigation storage operations
export const navigation = {
  getLastPath: () => storageWrapper.get(STORAGE_KEYS.LAST_PATH),
  setLastPath: (path) => storageWrapper.set(STORAGE_KEYS.LAST_PATH, path),
  clearLastPath: () => storageWrapper.remove(STORAGE_KEYS.LAST_PATH),
};

// Cache operations
const CACHE_PREFIX = 'cache_';
const DEFAULT_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cache = {
  get: (key) => {
    const cached = storageWrapper.get(`${CACHE_PREFIX}${key}`);
    if (!cached) return null;

    const { value, expiry } = cached;
    if (expiry && Date.now() > expiry) {
      cache.remove(key);
      return null;
    }

    return value;
  },

  set: (key, value, duration = DEFAULT_CACHE_DURATION) => {
    const item = {
      value,
      expiry: duration ? Date.now() + duration : null,
    };
    return storageWrapper.set(`${CACHE_PREFIX}${key}`, item);
  },

  remove: (key) => storageWrapper.remove(`${CACHE_PREFIX}${key}`),

  clear: () => {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(CACHE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      logger.error('Cache clear error:', error);
      return false;
    }
  },
};

// Storage size utilities
export const storage = {
  ...storageWrapper,
  auth,
  preferences,
  theme,
  language,
  navigation,
  cache,

  // Get total storage usage
  getUsage: () => {
    try {
      let total = 0;
      Object.keys(localStorage).forEach(key => {
        total += localStorage.getItem(key).length * 2; // UTF-16 uses 2 bytes per character
      });
      return total;
    } catch (error) {
      logger.error('Storage usage calculation error:', error);
      return 0;
    }
  },

  // Check if storage is available
  isAvailable: () => {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  },

  // Get remaining storage space (in bytes)
  getRemainingSpace: () => {
    try {
      let total = 0;
      const test = 'x'.repeat(1024 * 1024); // 1MB string
      while (true) {
        localStorage.setItem('__space_test__', test);
        total += test.length * 2;
      }
    } catch (error) {
      return total;
    } finally {
      localStorage.removeItem('__space_test__');
    }
  },
};

export default storage;