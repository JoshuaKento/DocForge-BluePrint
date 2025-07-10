import React from 'react';

export default function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className={`flex-1 h-2 rounded bg-gray-200 ${step >= 1 ? 'bg-blue-500' : ''}`}></div>
      <div className={`flex-1 h-2 rounded bg-gray-200 ${step >= 2 ? 'bg-blue-500' : ''}`}></div>
    </div>
  );
}
