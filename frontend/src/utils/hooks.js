import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { storage } from './storage';
import { logger } from './logger';
import { errors } from './errors';

// useAsync hook for handling async operations
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction(...params);
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      const formattedError = errors.format(error);
      setError(formattedError);
      setStatus('error');
      throw formattedError;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error, isLoading: status === 'pending' };
};

// useForm hook for form handling
export const useForm = (initialValues = {}, validationRules = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = useCallback(() => {
    const validationErrors = {};
    Object.keys(validationRules).forEach((key) => {
      const value = values[key];
      const rules = validationRules[key];

      if (rules.required && !value) {
        validationErrors[key] = 'This field is required';
      } else if (rules.pattern && !rules.pattern.test(value)) {
        validationErrors[key] = rules.message || 'Invalid format';
      } else if (rules.validate) {
        const error = rules.validate(value, values);
        if (error) {
          validationErrors[key] = error;
        }
      }
    });
    return validationErrors;
  }, [values, validationRules]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(values);
      } catch (error) {
        logger.error('Form submission error:', error);
      }
    }

    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setErrors,
  };
};

// usePagination hook for handling pagination
export const usePagination = (totalItems, itemsPerPage = 10, initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

// useLocalStorage hook for persistent state
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return storage.get(key) ?? initialValue;
    } catch (error) {
      logger.error('LocalStorage get error:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storage.set(key, valueToStore);
    } catch (error) {
      logger.error('LocalStorage set error:', error);
    }
  };

  return [storedValue, setValue];
};

// useDebounce hook for debouncing values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// useIntersectionObserver hook for infinite scrolling
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// useQueryParams hook for managing URL query parameters
export const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const setQueryParams = useCallback(
    (params) => {
      const newQueryParams = new URLSearchParams(queryParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          newQueryParams.delete(key);
        } else {
          newQueryParams.set(key, value);
        }
      });

      navigate({ search: newQueryParams.toString() }, { replace: true });
    },
    [navigate, queryParams]
  );

  return [queryParams, setQueryParams];
};

// useEventListener hook for managing event listeners
export const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

// Export all hooks
export default {
  useAsync,
  useForm,
  usePagination,
  useLocalStorage,
  useDebounce,
  useIntersectionObserver,
  useQueryParams,
  useEventListener,
};