import { useMemo } from 'react';

const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getRandomColor = (name) => {
  const colors = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  const index = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[index % colors.length];
};

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
  onClick,
}) => {
  const initials = useMemo(() => getInitials(name), [name]);
  const bgColor = useMemo(() => getRandomColor(name || 'User'), [name]);

  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl',
    '2xl': 'w-16 h-16 text-2xl',
  };

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };

  const statusColors = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    busy: 'bg-red-400',
    away: 'bg-yellow-400',
  };

  return (
    <div className="relative inline-block">
      <div
        className={`
          inline-flex items-center justify-center
          ${sizes[size]}
          ${shapes[shape]}
          ${className}
          ${onClick ? 'cursor-pointer' : ''}
        `}
        onClick={onClick}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name}
            className={`object-cover ${shapes[shape]} w-full h-full`}
          />
        ) : (
          <div
            className={`
              flex items-center justify-center w-full h-full
              ${bgColor}
              ${shapes[shape]}
              text-white font-medium
            `}
          >
            {initials}
          </div>
        )}
      </div>
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            block h-2.5 w-2.5 rounded-full ring-2 ring-white
            ${statusColors[status]}
          `}
        />
      )}
    </div>
  );
};

// Avatar Group component
Avatar.Group = ({
  avatars,
  max = 3,
  size = 'md',
  shape = 'circle',
  className = '',
}) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          shape={shape}
          className="ring-2 ring-white"
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={`
            inline-flex items-center justify-center
            ${sizes[size]}
            ${shapes[shape]}
            bg-gray-200 text-gray-600
            ring-2 ring-white
          `}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

// Avatar with Text component
Avatar.WithText = ({
  src,
  name,
  description,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Avatar
        src={src}
        name={name}
        size={size}
        shape={shape}
        status={status}
      />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

// Avatar with Badge component
Avatar.WithBadge = ({
  src,
  name,
  badge,
  size = 'md',
  shape = 'circle',
  className = '',
}) => {
  return (
    <div className="relative inline-block">
      <Avatar
        src={src}
        name={name}
        size={size}
        shape={shape}
        className={className}
      />
      <span
        className={`
          absolute -top-1 -right-1
          flex items-center justify-center
          min-w-[1.25rem] h-5
          px-1.5 py-0.5
          text-xs font-medium
          bg-red-500 text-white
          rounded-full ring-2 ring-white
        `}
      >
        {badge}
      </span>
    </div>
  );
};

export default Avatar;