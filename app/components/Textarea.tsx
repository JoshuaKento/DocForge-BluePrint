import React, { forwardRef, TextareaHTMLAttributes } from 'react';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full rounded border border-gray-300 bg-white dark:bg-neutral-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
export default Textarea;
