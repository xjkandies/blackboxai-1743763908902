import { logger } from './logger';

// Event names constants
export const EVENT_NAMES = {
  // Auth events
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_ERROR: 'auth:error',
  AUTH_TOKEN_REFRESH: 'auth:token_refresh',

  // User events
  USER_REGISTER: 'user:register',
  USER_PROFILE_UPDATE: 'user:profile_update',
  USER_SETTINGS_UPDATE: 'user:settings_update',

  // Theme events
  THEME_CHANGE: 'theme:change',

  // Navigation events
  NAVIGATION_START: 'navigation:start',
  NAVIGATION_END: 'navigation:end',
  NAVIGATION_ERROR: 'navigation:error',

  // Distribution events
  RELEASE_CREATE: 'release:create',
  RELEASE_UPDATE: 'release:update',
  RELEASE_DELETE: 'release:delete',
  RELEASE_SUBMIT: 'release:submit',

  // Marketing events
  CAMPAIGN_CREATE: 'campaign:create',
  CAMPAIGN_UPDATE: 'campaign:update',
  CAMPAIGN_DELETE: 'campaign:delete',
  CAMPAIGN_LAUNCH: 'campaign:launch',

  // Code events
  CODE_GENERATE: 'code:generate',
  CODE_VALIDATE: 'code:validate',
  CODE_REDEEM: 'code:redeem',

  // Error events
  ERROR_API: 'error:api',
  ERROR_NETWORK: 'error:network',
  ERROR_VALIDATION: 'error:validation',

  // UI events
  MODAL_OPEN: 'ui:modal_open',
  MODAL_CLOSE: 'ui:modal_close',
  TOAST_SHOW: 'ui:toast_show',
  TOAST_HIDE: 'ui:toast_hide',
};

class EventEmitter {
  constructor() {
    this.events = new Map();
    this.onceEvents = new Map();
  }

  // Add event listener
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(callback);

    // Return unsubscribe function
    return () => {
      this.off(event, callback);
    };
  }

  // Add one-time event listener
  once(event, callback) {
    if (!this.onceEvents.has(event)) {
      this.onceEvents.set(event, new Set());
    }
    this.onceEvents.get(event).add(callback);

    // Return unsubscribe function
    return () => {
      this.onceEvents.get(event)?.delete(callback);
    };
  }

  // Remove event listener
  off(event, callback) {
    this.events.get(event)?.delete(callback);
    this.onceEvents.get(event)?.delete(callback);

    // Clean up empty event sets
    if (this.events.get(event)?.size === 0) {
      this.events.delete(event);
    }
    if (this.onceEvents.get(event)?.size === 0) {
      this.onceEvents.delete(event);
    }
  }

  // Emit event
  emit(event, data) {
    try {
      // Log event in development
      if (process.env.NODE_ENV === 'development') {
        logger.debug('Event emitted:', { event, data });
      }

      // Call regular event listeners
      this.events.get(event)?.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          logger.error('Error in event listener:', error);
        }
      });

      // Call one-time event listeners
      this.onceEvents.get(event)?.forEach(callback => {
        try {
          callback(data);
          this.onceEvents.get(event).delete(callback);
        } catch (error) {
          logger.error('Error in one-time event listener:', error);
        }
      });

      // Clean up empty one-time event sets
      if (this.onceEvents.get(event)?.size === 0) {
        this.onceEvents.delete(event);
      }
    } catch (error) {
      logger.error('Error emitting event:', error);
    }
  }

  // Remove all listeners for an event
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
      this.onceEvents.delete(event);
    } else {
      this.events.clear();
      this.onceEvents.clear();
    }
  }

  // Get all listeners for an event
  listeners(event) {
    const regularListeners = Array.from(this.events.get(event) || []);
    const onceListeners = Array.from(this.onceEvents.get(event) || []);
    return [...regularListeners, ...onceListeners];
  }

  // Check if event has listeners
  hasListeners(event) {
    return (
      (this.events.get(event)?.size > 0) ||
      (this.onceEvents.get(event)?.size > 0)
    );
  }
}

// Create event emitter instance
const eventEmitter = new EventEmitter();

// Export events utility
export const events = {
  on: eventEmitter.on.bind(eventEmitter),
  once: eventEmitter.once.bind(eventEmitter),
  off: eventEmitter.off.bind(eventEmitter),
  emit: eventEmitter.emit.bind(eventEmitter),
  removeAllListeners: eventEmitter.removeAllListeners.bind(eventEmitter),
  listeners: eventEmitter.listeners.bind(eventEmitter),
  hasListeners: eventEmitter.hasListeners.bind(eventEmitter),
  EVENT_NAMES,
};

export default events;