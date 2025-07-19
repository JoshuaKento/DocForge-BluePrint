'use client';
import { useEffect, useState } from 'react';
import MarkdownPreview from './MarkdownPreview';

export interface DocContext {
  projectName: string;
  problem: string;
  persona: string;
  kpi: string;
  authorName: string;
  authorEmail?: string;
  license: 'MIT' | 'Apache-2.0' | 'GPL-3.0';
  gitToken?: string;
  repositoryUrl?: string;
  generatePdf?: boolean;
  lang: 'ja' | 'en';
}

const previewList = [
  { name: 'product-brief.md', tpl: 'product-brief.md.hbs' },
  { name: 'adr/0001-architecture-baseline.md', tpl: 'adr/0001-architecture-baseline.md.hbs' },
  { name: 'README.md', tpl: 'README.md.hbs' },
  { name: 'openapi.yaml', tpl: 'openapi.yaml.hbs' },
  { name: 'threatmodel.json', tpl: 'threatmodel.json.hbs' },
  { name: '.github/workflows/ci.yml', tpl: '.github/workflows/ci.yml.hbs' },
  { name: '.github/PULL_REQUEST_TEMPLATE.md', tpl: '.github/PULL_REQUEST_TEMPLATE.md.hbs' },
  { name: '.github/ISSUE_TEMPLATE/bug_report.yml', tpl: '.github/ISSUE_TEMPLATE/bug_report.yml.hbs' },
  { name: 'LICENSE', tpl: 'LICENSE' },
];

export default function DocumentTabs({ values }: { values: DocContext }) {
  const [docs, setDocs] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string>(previewList[0].name);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, templates: previewList.map((d) => d.tpl) }),
      });
      if (res.ok) {
        const json = await res.json();
        setDocs(json);
      }
    }
    load();
  }, [values]);

  const content = docs[active] || '';
  const isMd = active.endsWith('.md');

  return (
    <div>
      <div className="flex gap-2 border-b mb-2 overflow-x-auto">
        {previewList.map((d) => (
          <button
            key={d.name}
            className={`px-2 py-1 border-b-2 ${active === d.name ? 'border-blue-500' : 'border-transparent'}`}
            onClick={() => setActive(d.name)}
          >
            {d.name}
          </button>
        ))}
      </div>
      <div className="p-2 border rounded bg-white dark:bg-gray-800 max-h-[60vh] overflow-y-auto">
        {isMd ? (
          <MarkdownPreview source={content} />
        ) : (
          <pre className="whitespace-pre-wrap text-sm">{content}</pre>
        )}
      </div>
    </div>
  );
}
