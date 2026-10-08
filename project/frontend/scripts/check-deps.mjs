import { readFile, access } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const run = promisify(execFile);

const frontendRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);

// The frontend is where `npm run build` runs, so its installs are blocking.
// The backend is only checked for installs when it has a node_modules folder.
const manifests = [
  { file: 'package.json', installsRequired: true },
  { file: '../backend/package.json', installsRequired: false },
];

// Major version allowed by a declared range: ^X, ~X, =X or an exact X.Y.Z.
// Open ranges ("*", "latest", ">=") always include the latest release.
function declaredMajor(range) {
  if (/^(\*|latest|>=)/.test(range.trim())) return Infinity;
  const match = range.trim().match(/^[\^~=]?v?(\d+)\./);
  return match ? Number(match[1]) : null;
}

const major = (version) => Number(version.split('.')[0]);

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function latestVersion(pkg) {
  const { stdout } = await run('npm', ['view', pkg, 'version']);
  return stdout.trim();
}

async function installedVersion(dir, pkg) {
  try {
    const json = JSON.parse(await readFile(path.join(dir, 'node_modules', pkg, 'package.json'), 'utf8'));
    return json.version;
  } catch {
    return null;
  }
}

const entries = [];
const warnings = [];

for (const { file, installsRequired } of manifests) {
  const dir = path.dirname(path.join(frontendRoot, file));
  const json = JSON.parse(await readFile(path.join(frontendRoot, file), 'utf8'));
  const hasModules = await exists(path.join(dir, 'node_modules'));
  const checkInstalled = installsRequired || hasModules;
  if (!checkInstalled) {
    warnings.push(`${file}  no node_modules, installed versions not checked`);
  }
  for (const field of ['dependencies', 'devDependencies']) {
    for (const [pkg, range] of Object.entries(json[field] ?? {})) {
      entries.push({ manifest: file, dir, pkg, range, checkInstalled });
    }
  }
}

const results = await Promise.all(
  entries.map(async (entry) => {
    const installed = entry.checkInstalled ? await installedVersion(entry.dir, entry.pkg) : undefined;
    try {
      return { ...entry, installed, latest: await latestVersion(entry.pkg) };
    } catch (error) {
      return { ...entry, installed, error: error.stderr?.trim() || error.message };
    }
  }),
);

const failures = [];

for (const result of results) {
  const where = `${result.manifest}  ${result.pkg}`;
  const declared = declaredMajor(result.range);

  if (result.error) {
    failures.push(`${where}: npm view failed: ${result.error}`);
  } else if (declared === null) {
    failures.push(`${where} ${result.range}: unsupported range`);
  } else if (declared !== Infinity && declared !== major(result.latest)) {
    const reason = declared < major(result.latest) ? 'major behind' : 'major ahead of latest';
    failures.push(`${where} ${result.range} → latest ${result.latest} (${reason})`);
  }

  if (!result.checkInstalled) continue;
  if (result.installed === null) {
    failures.push(`${where} declared ${result.range} but not installed — run npm install`);
  } else if (declared !== null && declared !== Infinity && major(result.installed) !== declared) {
    failures.push(
      `${where} declared ${result.range} but installed ${result.installed} — run npm install`,
    );
  }
}

for (const warning of warnings) {
  console.warn(`WARNING  ${warning}`);
}

if (failures.length > 0) {
  console.error('DEPENDENCY CHECK FAILED');
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  console.error(`\n${failures.length} problem${failures.length === 1 ? '' : 's'} found.`);
  process.exitCode = 1;
} else {
  console.log('DEPENDENCY CHECK PASSED');
  for (const result of results) {
    const installed = result.checkInstalled ? `, installed ${result.installed}` : '';
    console.log(`  ${result.manifest}  ${result.pkg} ${result.range} (latest ${result.latest}${installed})`);
  }
}
