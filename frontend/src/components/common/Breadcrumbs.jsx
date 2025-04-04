import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({
  items = [],
  separator = '/',
  homeIcon = true,
  className = '',
  variant = 'default'
}) => {
  // Variant styles
  const variants = {
    default: {
      nav: 'px-4 py-2',
      list: 'flex items-center space-x-2',
      item: 'text-sm font-medium',
      link: 'text-gray-600 hover:text-gray-900',
      current: 'text-gray-500',
      separator: 'text-gray-400'
    },
    contained: {
      nav: 'bg-gray-50 px-4 py-3 rounded-lg',
      list: 'flex items-center space-x-2',
      item: 'text-sm font-medium',
      link: 'text-blue-600 hover:text-blue-700',
      current: 'text-gray-500',
      separator: 'text-gray-400'
    },
    simple: {
      nav: 'px-4',
      list: 'flex items-center space-x-1',
      item: 'text-sm',
      link: 'text-gray-500 hover:text-gray-700',
      current: 'text-gray-900 font-medium',
      separator: 'text-gray-400'
    }
  };

  const style = variants[variant];

  return (
    <nav className={`${style.nav} ${className}`} aria-label="Breadcrumb">
      <ol className={style.list}>
        {/* Home Icon/Link */}
        {homeIcon && (
          <li className={style.item}>
            <Link to="/" className={style.link}>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
              <span className="sr-only">Home</span>
            </Link>
          </li>
        )}

        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <li key={index} className={`${style.item} flex items-center`}>
            {/* Separator */}
            {(index > 0 || homeIcon) && (
              <span className={`mx-2 ${style.separator}`} aria-hidden="true">
                {separator}
              </span>
            )}

            {/* Link or Current Page */}
            {index === items.length - 1 ? (
              <span className={style.current} aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.path} className={style.link}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Breadcrumbs with actions
Breadcrumbs.WithActions = ({
  items = [],
  actions,
  separator = '/',
  homeIcon = true,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Breadcrumbs
        items={items}
        separator={separator}
        homeIcon={homeIcon}
      />
      {actions && (
        <div className="flex items-center space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

// Breadcrumbs with background and border
Breadcrumbs.Contained = ({
  items = [],
  separator = '/',
  homeIcon = true,
  className = ''
}) => {
  return (
    <Breadcrumbs
      items={items}
      separator={separator}
      homeIcon={homeIcon}
      variant="contained"
      className={className}
    />
  );
};

// Simple breadcrumbs
Breadcrumbs.Simple = ({
  items = [],
  separator = '/',
  homeIcon = false,
  className = ''
}) => {
  return (
    <Breadcrumbs
      items={items}
      separator={separator}
      homeIcon={homeIcon}
      variant="simple"
      className={className}
    />
  );
};

export default Breadcrumbs;