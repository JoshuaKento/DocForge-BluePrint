import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownPreview({ source }: { source: string }) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <ReactMarkdown>{source}</ReactMarkdown>
    </div>
  );
}
