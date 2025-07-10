import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/70 dark:bg-neutral-900/40 backdrop-blur-sm border border-gray-200 dark:border-neutral-700 rounded-lg p-4 shadow-sm">
      {children}
    </div>
  );
}
