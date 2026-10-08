import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const frontendRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

const rules = [
  {
    label: 'legacy brand name',
    pattern: /ACME Corp/g,
    files: ['index.html', 'index.css'],
  },
  {
    label: 'banned UI copy',
    pattern: /\b(?:consulting|consultant|synergy|leverage|end-to-end|best-in-class)\b/gi,
    files: ['index.html'],
  },
  {
    label: 'forbidden drop shadow',
    pattern: /\bbox-shadow\s*:/gi,
    files: ['index.css'],
  },
];

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

const failures = [];

for (const rule of rules) {
  for (const filename of rule.files) {
    const source = await readFile(path.join(frontendRoot, filename), 'utf8');
    for (const match of source.matchAll(rule.pattern)) {
      failures.push({
        filename,
        line: lineAt(source, match.index),
        label: rule.label,
        match: match[0],
      });
    }
  }
}

if (failures.length > 0) {
  console.error('BRAND CHECK FAILED');
  for (const failure of failures) {
    console.error(
      `  ${failure.filename}:${failure.line}  ${failure.label}: ${JSON.stringify(failure.match)}`,
    );
  }
  console.error(`\n${failures.length} violation${failures.length === 1 ? '' : 's'} found.`);
  process.exitCode = 1;
} else {
  console.log('BRAND CHECK PASSED');
  console.log('  No legacy name, banned UI copy, or forbidden drop shadows found.');
}
