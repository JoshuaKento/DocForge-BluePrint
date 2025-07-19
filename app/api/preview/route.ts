import { NextRequest } from 'next/server';
import { z } from 'zod';
import Handlebars from 'handlebars';
import { templates } from '@/lib/templates';

const schema = z.object({
  templates: z.array(z.string()),
  projectName: z.string().min(1),
  problem: z.string().min(1),
  persona: z.string().min(1),
  kpi: z.string().min(1),
  authorName: z.string().min(1),
  authorEmail: z.string().email().optional(),
  license: z.enum(['MIT', 'Apache-2.0', 'GPL-3.0']),
  gitToken: z.string().optional(),
  repositoryUrl: z.string().optional(),
  generatePdf: z.boolean().optional(),
  lang: z.enum(['ja', 'en']).default('ja'),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return new Response('Invalid input', { status: 422 });
  }

  const { templates: reqTemplates, ...data } = result.data;
  const context = {
    ...data,
    createdDate: new Date().toISOString(),
    version: '0.1.0',
    projectSlug: data.projectName.toLowerCase().replace(/\s+/g, '-'),
  };

  const docs: Record<string, string> = {};

  for (const name of reqTemplates) {
    let templateName = name;
    if (name === 'LICENSE') {
      templateName = `LICENSE-${context.license}.hbs`;
    }
    const tplSrc = templates[templateName];
    if (!tplSrc) continue;
    const tpl = Handlebars.compile(tplSrc);
    docs[name.replace('.hbs', '')] = tpl(context);
  }

  return new Response(JSON.stringify(docs), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
