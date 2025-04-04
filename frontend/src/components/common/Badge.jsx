import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  removable = false,
  onRemove,
  className = '',
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center rounded-full font-medium';

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800',
    // Outline variants
    'outline-default': 'border border-gray-300 text-gray-700',
    'outline-primary': 'border border-blue-300 text-blue-700',
    'outline-success': 'border border-green-300 text-green-700',
    'outline-warning': 'border border-yellow-300 text-yellow-700',
    'outline-danger': 'border border-red-300 text-red-700',
    'outline-info': 'border border-indigo-300 text-indigo-700'
  };

  // Dot colors
  const dotColors = {
    default: 'bg-gray-400',
    primary: 'bg-blue-400',
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    danger: 'bg-red-400',
    info: 'bg-indigo-400'
  };

  return (
    <span
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`
            mr-1.5 h-2 w-2 rounded-full
            ${dotColors[variant.replace('outline-', '')]}
          `}
        />
      )}
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className={`
            ml-1 -mr-1 h-4 w-4 rounded-full
            inline-flex items-center justify-center
            hover:bg-black hover:bg-opacity-10
            focus:outline-none focus:ring-2 focus:ring-offset-1
            ${variant.startsWith('outline')
              ? `focus:ring-${variant.replace('outline-', '')}-500`
              : 'focus:ring-white'
            }
          `}
        >
          <span className="sr-only">Remove</span>
          <svg
            className="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

// Badge Group component
Badge.Group = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  );
};

// Badge Counter component
Badge.Counter = ({ count, max = 99, variant = 'primary', className = '' }) => {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <Badge
      variant={variant}
      size="sm"
      className={`min-w-[1.25rem] justify-center ${className}`}
    >
      {displayCount}
    </Badge>
  );
};

// Badge Status component
Badge.Status = ({ status, text, className = '' }) => {
  const statusColors = {
    online: 'success',
    offline: 'default',
    busy: 'danger',
    away: 'warning',
    available: 'success'
  };

  return (
    <Badge
      variant={statusColors[status]}
      dot={true}
      className={className}
    >
      {text || status}
    </Badge>
  );
};

export default Badge;