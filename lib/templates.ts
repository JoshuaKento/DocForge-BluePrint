import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
function load(name: string) {
  return readFileSync(join(__dirname, '..', 'templates', name), 'utf8');
}

export const templates: Record<string, string> = {
  'product-brief.md.hbs': load('product-brief.md.hbs'),
  'adr/0001-record-architecture.md.hbs': load('adr/0001-record-architecture.md.hbs'),
  'PULL_REQUEST_TEMPLATE.md.hbs': load('PULL_REQUEST_TEMPLATE.md.hbs'),
  '.github/workflows/ci.yml.hbs': load('.github/workflows/ci.yml.hbs'),
  'threatmodel.json.hbs': load('threatmodel.json.hbs'),
  'openapi.yaml.hbs': load('openapi.yaml.hbs'),
};
