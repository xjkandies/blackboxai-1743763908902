/**
 * @typedef {Object} AlertProps
 * @property {('info'|'success'|'warning'|'error')} [type]
 * @property {string} [title]
 * @property {string} [message]
 * @property {Function} [icon]
 * @property {Function} [onClose]
 * @property {boolean} [show]
 * @property {React.ReactNode} [actions]
 * @property {string} [className]
 */

/**
 * @typedef {Object} AvatarProps
 * @property {string} [src]
 * @property {string} [alt]
 * @property {string} [name]
 * @property {('xs'|'sm'|'md'|'lg'|'xl')} [size]
 * @property {('circle'|'square')} [shape]
 * @property {('online'|'offline'|'busy'|'away')} [status]
 * @property {string} [className]
 * @property {Function} [onClick]
 */

/**
 * @typedef {Object} BadgeProps
 * @property {('default'|'primary'|'secondary'|'success'|'danger'|'warning'|'info')} [variant]
 * @property {('sm'|'md'|'lg')} [size]
 * @property {boolean} [removable]
 * @property {Function} [onRemove]
 * @property {boolean} [dot]
 * @property {string} [className]
 */

/**
 * @typedef {Object} BreadcrumbsProps
 * @property {Array<{label: string, href: string, icon?: Function}>} items
 * @property {React.ReactNode} [separator]
 * @property {boolean} [showHome]
 * @property {React.ReactNode} [homeIcon]
 * @property {string} [className]
 */

/**
 * @typedef {Object} ButtonProps
 * @property {('primary'|'secondary'|'outline'|'danger'|'success')} [variant]
 * @property {('xs'|'sm'|'md'|'lg'|'xl')} [size]
 * @property {string} [className]
 * @property {string} [href]
 * @property {boolean} [isLoading]
 * @property {boolean} [disabled]
 * @property {Function} [icon]
 * @property {('left'|'right')} [iconPosition]
 */

/**
 * @typedef {Object} CardProps
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {React.ReactNode} [actions]
 * @property {string} [className]
 * @property {boolean} [hover]
 * @property {boolean} [noPadding]
 * @property {string} [headerClassName]
 * @property {string} [bodyClassName]
 * @property {string} [footerClassName]
 */

/**
 * @typedef {Object} DropdownProps
 * @property {React.ReactNode} trigger
 * @property {Array<{
 *   label?: string,
 *   icon?: Function,
 *   onClick?: Function,
 *   divider?: boolean,
 *   header?: React.ReactNode,
 *   danger?: boolean,
 *   disabled?: boolean
 * }>} items
 * @property {('left'|'right')} [align]
 * @property {string} [width]
 * @property {string} [className]
 */

/**
 * @typedef {Object} FormProps
 * @property {Function} onSubmit
 * @property {Object} [defaultValues]
 * @property {Object} [validationSchema]
 * @property {string} [className]
 */

/**
 * @typedef {Object} InputProps
 * @property {string} [label]
 * @property {string} [error]
 * @property {string} [type]
 * @property {string} [helperText]
 * @property {Function} [leftIcon]
 * @property {Function} [rightIcon]
 * @property {string} [className]
 * @property {string} [containerClassName]
 */

/**
 * @typedef {Object} LoadingProps
 * @property {('sm'|'md'|'lg'|'xl')} [size]
 * @property {string} [className]
 */

/**
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen
 * @property {Function} onClose
 * @property {string} [title]
 * @property {React.ReactNode} [actions]
 * @property {('sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'|'full')} [size]
 * @property {boolean} [showClose]
 * @property {boolean} [closeOnOverlayClick]
 * @property {string} [className]
 */

/**
 * @typedef {Object} PaginationProps
 * @property {number} [currentPage]
 * @property {number} [totalPages]
 * @property {Function} onPageChange
 * @property {number} [siblingCount]
 * @property {string} [className]
 * @property {('default'|'simple')} [variant]
 */

/**
 * @typedef {Object} ProgressProps
 * @property {number} [value]
 * @property {number} [max]
 * @property {('primary'|'secondary'|'success'|'danger'|'warning'|'info')} [variant]
 * @property {('sm'|'md'|'lg'|'xl')} [size]
 * @property {boolean} [showValue]
 * @property {boolean} [animate]
 * @property {string} [className]
 */

/**
 * @typedef {Object} SelectProps
 * @property {Array<{value: string|number, label: string}>} options
 * @property {string|number|Array<string|number>} value
 * @property {Function} onChange
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [error]
 * @property {string} [helperText]
 * @property {boolean} [disabled]
 * @property {string} [className]
 * @property {string} [containerClassName]
 * @property {boolean} [multiple]
 */

/**
 * @typedef {Object} TableProps
 * @property {Array<{
 *   key: string,
 *   header: string,
 *   render?: Function,
 *   className?: string,
 *   unsortable?: boolean
 * }>} columns
 * @property {Array<Object>} data
 * @property {boolean} [isLoading]
 * @property {boolean} [sortable]
 * @property {boolean} [pagination]
 * @property {number} [itemsPerPage]
 * @property {Function} [onSort]
 * @property {string} [className]
 * @property {string} [emptyMessage]
 */

/**
 * @typedef {Object} TabsProps
 * @property {Array<{
 *   label: string,
 *   content: React.ReactNode,
 *   icon?: Function,
 *   disabled?: boolean,
 *   count?: number,
 *   className?: string
 * }>} tabs
 * @property {('default'|'pills'|'underline')} [variant]
 * @property {number} [defaultIndex]
 * @property {Function} [onChange]
 * @property {string} [className]
 */

/**
 * @typedef {Object} ToastProps
 * @property {('info'|'success'|'warning'|'error')} [type]
 * @property {string} [title]
 * @property {string} [message]
 * @property {number} [duration]
 * @property {Function} [onClose]
 * @property {('top-right'|'top-left'|'bottom-right'|'bottom-left')} [position]
 */

/**
 * @typedef {Object} TooltipProps
 * @property {React.ReactNode} content
 * @property {('top'|'bottom'|'left'|'right')} [position]
 * @property {number} [delay]
 * @property {string} [className]
 * @property {string} [maxWidth]
 * @property {boolean} [showArrow]
 */

export {};