import React, { forwardRef, InputHTMLAttributes } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`border p-2 w-full rounded bg-transparent ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';
export default Input;
