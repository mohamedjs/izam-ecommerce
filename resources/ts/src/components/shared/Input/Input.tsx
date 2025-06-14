import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className={`input-container ${className}`}>
        {label && <label className="input-label">{label}</label>}
        <div className="input-wrapper">
          <input
            ref={ref}
            className={`input ${error ? 'input--error' : ''} ${icon ? 'input--with-icon' : ''}`}
            {...props}
          />
          {icon && <div className="input-icon">{icon}</div>}
        </div>
        {error && <span className="input-error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default React.memo(Input);