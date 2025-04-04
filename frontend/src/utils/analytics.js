import { ANALYTICS_EVENTS } from './constants';
import { logger } from './logger';

class Analytics {
  constructor() {
    this.initialized = false;
    this.debug = false;
    this.queue = [];
    this.providers = new Map();
  }

  // Initialize analytics
  init(config = {}) {
    try {
      this.debug = config.debug || false;
      this.initialized = true;

      // Process queued events
      this.processQueue();

      logger.debug('Analytics initialized:', config);
    } catch (error) {
      logger.error('Analytics initialization error:', error);
    }
  }

  // Add analytics provider
  addProvider(name, provider) {
    try {
      if (typeof provider.track !== 'function') {
        throw new Error(`Provider ${name} must implement track method`);
      }

      this.providers.set(name, provider);
      logger.debug('Analytics provider added:', name);
    } catch (error) {
      logger.error('Error adding analytics provider:', error);
    }
  }

  // Remove analytics provider
  removeProvider(name) {
    try {
      this.providers.delete(name);
      logger.debug('Analytics provider removed:', name);
    } catch (error) {
      logger.error('Error removing analytics provider:', error);
    }
  }

  // Track event
  track(event, properties = {}) {
    try {
      const eventData = {
        event,
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
        },
      };

      if (!this.initialized) {
        this.queue.push(eventData);
        return;
      }

      // Send to all providers
      this.providers.forEach((provider, name) => {
        try {
          provider.track(eventData);
        } catch (error) {
          logger.error(`Error tracking event with provider ${name}:`, error);
        }
      });

      // Log in debug mode
      if (this.debug) {
        logger.debug('Analytics event:', eventData);
      }
    } catch (error) {
      logger.error('Error tracking analytics event:', error);
    }
  }

  // Process queued events
  processQueue() {
    try {
      this.queue.forEach(eventData => {
        this.track(eventData.event, eventData.properties);
      });
      this.queue = [];
    } catch (error) {
      logger.error('Error processing analytics queue:', error);
    }
  }

  // Page view tracking
  trackPageView(path, properties = {}) {
    this.track(ANALYTICS_EVENTS.PAGE_VIEW, {
      path,
      title: document.title,
      referrer: document.referrer,
      ...properties,
    });
  }

  // User action tracking
  trackAction(action, properties = {}) {
    this.track(ANALYTICS_EVENTS.BUTTON_CLICK, {
      action,
      ...properties,
    });
  }

  // Form submission tracking
  trackFormSubmit(formName, properties = {}) {
    this.track(ANALYTICS_EVENTS.FORM_SUBMIT, {
      form: formName,
      ...properties,
    });
  }

  // Error tracking
  trackError(error, properties = {}) {
    this.track(ANALYTICS_EVENTS.ERROR, {
      error: error.message,
      type: error.type,
      ...properties,
    });
  }

  // Authentication tracking
  trackAuth(action, properties = {}) {
    this.track(ANALYTICS_EVENTS.AUTH[action.toUpperCase()], properties);
  }

  // Distribution tracking
  trackDistribution(action, properties = {}) {
    this.track(ANALYTICS_EVENTS.DISTRIBUTION[action.toUpperCase()], properties);
  }

  // Marketing tracking
  trackMarketing(action, properties = {}) {
    this.track(ANALYTICS_EVENTS.MARKETING[action.toUpperCase()], properties);
  }

  // Code tracking
  trackCode(action, properties = {}) {
    this.track(ANALYTICS_EVENTS.CODES[action.toUpperCase()], properties);
  }

  // User properties tracking
  setUserProperties(properties) {
    this.providers.forEach((provider, name) => {
      try {
        if (typeof provider.setUserProperties === 'function') {
          provider.setUserProperties(properties);
        }
      } catch (error) {
        logger.error(`Error setting user properties with provider ${name}:`, error);
      }
    });
  }

  // Reset user
  resetUser() {
    this.providers.forEach((provider, name) => {
      try {
        if (typeof provider.resetUser === 'function') {
          provider.resetUser();
        }
      } catch (error) {
        logger.error(`Error resetting user with provider ${name}:`, error);
      }
    });
  }
}

// Create analytics instance
const analytics = new Analytics();

// Example Google Analytics provider
const googleAnalyticsProvider = {
  track: ({ event, properties }) => {
    if (window.gtag) {
      window.gtag('event', event, properties);
    }
  },
  setUserProperties: (properties) => {
    if (window.gtag) {
      window.gtag('set', 'user_properties', properties);
    }
  },
  resetUser: () => {
    if (window.gtag) {
      window.gtag('config', window.GOOGLE_ANALYTICS_ID);
    }
  },
};

// Example Mixpanel provider
const mixpanelProvider = {
  track: ({ event, properties }) => {
    if (window.mixpanel) {
      window.mixpanel.track(event, properties);
    }
  },
  setUserProperties: (properties) => {
    if (window.mixpanel) {
      window.mixpanel.people.set(properties);
    }
  },
  resetUser: () => {
    if (window.mixpanel) {
      window.mixpanel.reset();
    }
  },
};

// Add default providers if available
if (window.gtag) {
  analytics.addProvider('google-analytics', googleAnalyticsProvider);
}
if (window.mixpanel) {
  analytics.addProvider('mixpanel', mixpanelProvider);
}

// Export analytics instance
export { analytics };
export default analytics;