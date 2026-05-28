#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateWorldExportBundle } from './validator.js';

const target = process.argv[2];

if (!target) {
  console.error('Usage: world-outlook-validate <bundle.json>');
  process.exit(2);
}

try {
  const filePath = resolve(process.cwd(), target);
  const json = JSON.parse(readFileSync(filePath, 'utf8')) as unknown;
  const result = validateWorldExportBundle(json);

  for (const issue of result.errors) {
    console.error(`[error] ${issue.code} ${issue.path}: ${issue.message}`);
  }
  for (const issue of result.warnings) {
    console.warn(`[warning] ${issue.code} ${issue.path}: ${issue.message}`);
  }

  if (!result.valid) {
    console.error(`Invalid World Outlook bundle: ${result.errors.length} error(s), ${result.warnings.length} warning(s).`);
    process.exit(1);
  }

  console.log(`Valid World Outlook bundle: 0 error(s), ${result.warnings.length} warning(s).`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
