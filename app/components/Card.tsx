import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white dark:bg-neutral-800 shadow p-4 rounded">{children}</div>;
}
