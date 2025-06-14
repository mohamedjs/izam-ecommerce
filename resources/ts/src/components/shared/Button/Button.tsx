import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    icon, 
    className = '', 
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={`btn btn--${variant} btn--${size} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <div className="btn-spinner" />}
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default React.memo(Button);