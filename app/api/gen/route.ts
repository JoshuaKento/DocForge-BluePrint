export const runtime = 'nodejs';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import Handlebars from 'handlebars';
import JSZip from 'jszip';
import { templates } from '@/lib/templates';

const schema = z.object({
  projectName: z.string().min(1),
  problem: z.string().min(1),
  persona: z.string().min(1),
  kpi: z.string().min(1),
  authorName: z.string().min(1),
  authorEmail: z.string().email().optional(),
  license: z.enum(['MIT', 'Apache-2.0', 'GPL-3.0']),
  gitToken: z.string().optional(),
  repositoryUrl: z.string().optional(),
  generatePdf: z.boolean().default(false),
  lang: z.enum(['ja', 'en']).default('ja'),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return new Response('Invalid input', { status: 422 });
  }

  const context = {
    ...result.data,
    createdDate: new Date().toISOString(),
    version: '0.1.0',
    projectSlug: result.data.projectName.toLowerCase().replace(/\s+/g, '-'),
  };

  const zip = new JSZip();
  for (const [name, content] of Object.entries(templates)) {
    if (name.startsWith('LICENSE-')) continue;
    const tpl = Handlebars.compile(content);
    zip.file(name.replace('.hbs', ''), tpl(context));
  }

  const licenseTpl = templates[`LICENSE-${context.license}.hbs`];
  if (licenseTpl) {
    const tpl = Handlebars.compile(licenseTpl);
    zip.file('LICENSE', tpl(context));
  }

  const buffer = await zip.generateAsync({ type: 'nodebuffer' });
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/zip',
    },
  });
}
