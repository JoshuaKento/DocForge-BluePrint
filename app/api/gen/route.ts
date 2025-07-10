export const runtime = 'nodejs';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import Handlebars from 'handlebars';
import JSZip from 'jszip';
import { templates } from '@/lib/templates';

const schema = z.object({
  projectName: z.string(),
  problem: z.string(),
  persona: z.string(),
  kpi: z.string(),
  authorName: z.string(),
  license: z.enum(['MIT', 'Apache-2.0', 'GPL-3.0']),
  gitToken: z.string().optional(),
  generatePdf: z.boolean(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return new Response('Invalid input', { status: 422 });
  }

  const zip = new JSZip();
  for (const [name, content] of Object.entries(templates)) {
    const tpl = Handlebars.compile(content);
    zip.file(name.replace('.hbs', ''), tpl(result.data));
  }

  const buffer = await zip.generateAsync({ type: 'nodebuffer' });
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/zip',
    },
  });
}
