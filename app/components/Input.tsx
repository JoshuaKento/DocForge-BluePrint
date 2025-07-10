import React, { forwardRef, InputHTMLAttributes } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded border border-gray-300 bg-white dark:bg-neutral-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';
export default Input;
