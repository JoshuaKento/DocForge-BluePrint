import React, { forwardRef, TextareaHTMLAttributes } from 'react';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`border p-2 w-full rounded bg-transparent ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
export default Textarea;
