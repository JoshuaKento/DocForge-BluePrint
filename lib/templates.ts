import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
function load(name: string) {
  return readFileSync(join(__dirname, '..', 'templates', name), 'utf8');
}

export const templates: Record<string, string> = {
  'product-brief.md.hbs': load('product-brief.md.hbs'),
  'adr/0001-architecture-baseline.md.hbs': load('adr/0001-architecture-baseline.md.hbs'),
  'README.md.hbs': load('README.md.hbs'),
  '.github/workflows/ci.yml.hbs': load('.github/workflows/ci.yml.hbs'),
  '.github/PULL_REQUEST_TEMPLATE.md.hbs': load('.github/PULL_REQUEST_TEMPLATE.md.hbs'),
  '.github/ISSUE_TEMPLATE/bug_report.yml.hbs': load('.github/ISSUE_TEMPLATE/bug_report.yml.hbs'),
  'threatmodel.json.hbs': load('threatmodel.json.hbs'),
  'openapi.yaml.hbs': load('openapi.yaml.hbs'),
  'LICENSE-MIT.hbs': load('LICENSE-MIT.hbs'),
  'LICENSE-Apache-2.0.hbs': load('LICENSE-Apache-2.0.hbs'),
  'LICENSE-GPL-3.0.hbs': load('LICENSE-GPL-3.0.hbs'),
};
