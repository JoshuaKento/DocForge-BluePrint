import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownPreview({ source }: { source: string }) {
  return <ReactMarkdown className="prose dark:prose-invert">{source}</ReactMarkdown>;
}
