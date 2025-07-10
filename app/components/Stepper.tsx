import React from 'react';

export default function Stepper({ step }: { step: number }) {
  return (
    <ol className="space-y-4">
      <li className="flex items-center gap-2">
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium transition-colors ${step >= 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-500 border-gray-300'}`}
        >
          1
        </div>
        <span className="text-sm">Details</span>
      </li>
      <li className="flex items-center gap-2">
        <div
          className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium transition-colors ${step >= 2 ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 text-gray-500 border-gray-300'}`}
        >
          2
        </div>
        <span className="text-sm">Generate</span>
      </li>
    </ol>
  );
}
