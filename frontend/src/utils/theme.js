import { THEME } from './constants';
import { storage } from './storage';
import { logger } from './logger';
import { events } from './events';

// Theme configuration
const themeConfig = {
  light: {
    colorScheme: 'light',
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    borderColor: 'border-gray-200',
    shadowColor: 'shadow-gray-200',
  },
  dark: {
    colorScheme: 'dark',
    backgroundColor: 'bg-gray-900',
    textColor: 'text-gray-100',
    borderColor: 'border-gray-700',
    shadowColor: 'shadow-gray-800',
  },
};

// Get system theme preference
const getSystemTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return THEME.DARK;
  }
  return THEME.LIGHT;
};

// Get current theme
const getCurrentTheme = () => {
  const savedTheme = storage.theme.get();
  
  if (savedTheme === THEME.LIGHT || savedTheme === THEME.DARK) {
    return savedTheme;
  }
  
  if (savedTheme === THEME.SYSTEM || !savedTheme) {
    return getSystemTheme();
  }
  
  return THEME.LIGHT; // Fallback
};

// Apply theme to document
const applyTheme = (theme) => {
  try {
    const root = window.document.documentElement;
    const isDark = theme === THEME.DARK;

    // Update class
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        isDark ? '#111827' : '#ffffff'
      );
    }

    // Update color scheme
    const colorScheme = isDark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = colorScheme;

    // Emit theme change event
    events.emit(events.EVENT_NAMES.THEME_CHANGE, { theme, isDark });

    logger.debug('Theme applied:', { theme, isDark });
    return true;
  } catch (error) {
    logger.error('Error applying theme:', error);
    return false;
  }
};

// Initialize theme
export const initializeTheme = () => {
  try {
    // Get initial theme
    const initialTheme = getCurrentTheme();
    
    // Apply initial theme
    applyTheme(initialTheme);

    // Watch for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        if (storage.theme.get() === THEME.SYSTEM) {
          applyTheme(e.matches ? THEME.DARK : THEME.LIGHT);
        }
      });
    }

    // Watch for storage changes
    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') {
        const newTheme = e.newValue;
        if (newTheme === THEME.SYSTEM) {
          applyTheme(getSystemTheme());
        } else if (newTheme === THEME.LIGHT || newTheme === THEME.DARK) {
          applyTheme(newTheme);
        }
      }
    });

    logger.debug('Theme initialized:', initialTheme);
    return true;
  } catch (error) {
    logger.error('Error initializing theme:', error);
    return false;
  }
};

// Set theme
export const setTheme = (theme) => {
  try {
    // Validate theme
    if (!Object.values(THEME).includes(theme)) {
      throw new Error(`Invalid theme: ${theme}`);
    }

    // Save theme preference
    storage.theme.set(theme);

    // Apply theme
    if (theme === THEME.SYSTEM) {
      applyTheme(getSystemTheme());
    } else {
      applyTheme(theme);
    }

    return true;
  } catch (error) {
    logger.error('Error setting theme:', error);
    return false;
  }
};

// Toggle theme
export const toggleTheme = () => {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
  return setTheme(newTheme);
};

// Get theme configuration
export const getThemeConfig = (theme = getCurrentTheme()) => {
  return themeConfig[theme] || themeConfig.light;
};

// Theme utility functions
export const theme = {
  initialize: initializeTheme,
  set: setTheme,
  get: getCurrentTheme,
  toggle: toggleTheme,
  getConfig: getThemeConfig,
  isLight: () => getCurrentTheme() === THEME.LIGHT,
  isDark: () => getCurrentTheme() === THEME.DARK,
  isSystem: () => storage.theme.get() === THEME.SYSTEM,
};

// Export theme utilities
export default theme;