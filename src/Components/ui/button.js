import React from 'react';

const Button = ({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center rounded-md text-sm font-medium
        transition-colors focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
        px-4 py-2 ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
