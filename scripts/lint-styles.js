import { readdir, readFile } from 'node:fs/promises';
import { resolve, extname, basename } from 'node:path';
import { ESLint } from 'eslint';
import * as prettier from 'prettier';
import { compileAsync } from 'sass';

async function findStyles(directory, extension) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await findStyles(path, extension)));
    else if (entry.isFile() && extname(entry.name) === extension) files.push(path);
  }
  return files.sort();
}

export async function lintStyles(root = resolve(import.meta.dirname, '..')) {
  const eslint = new ESLint({ cwd: root });
  // Explicit paths avoid glob expansion and lint only maintained source files.
  const cssFiles = await findStyles(resolve(root, 'src/css'), '.css');
  const results = cssFiles.length ? await eslint.lintFiles(cssFiles) : [];
  const formatter = await eslint.loadFormatter('stylish');
  const output = formatter.format(results);
  if (output) console.log(output);
  let failed = results.some((result) => result.errorCount || result.warningCount);

  const scssFiles = await findStyles(resolve(root, 'src/scss'), '.scss');
  for (const file of scssFiles) {
    try {
      const source = await readFile(file, 'utf8');
      const options = await prettier.resolveConfig(file);
      if (!(await prettier.check(source, { ...options, filepath: file }))) {
        console.error(`${file}: SCSS formatting differs; run npm run format.`);
        failed = true;
      }
      // Compile entry points; partials are syntax-checked above and compiled
      // in the context of the entry points that import them.
      if (!basename(file).startsWith('_')) {
        await compileAsync(file, { loadPaths: [resolve(root, 'node_modules')], quietDeps: true });
      }
    } catch (error) {
      console.error(`${file}: ${error.message}`);
      failed = true;
    }
  }
  if (!failed) console.log(`Checked ${cssFiles.length} CSS and ${scssFiles.length} SCSS files.`);
  return !failed;
}

if (process.argv[1] && resolve(process.argv[1]) === import.meta.filename) {
  try {
    if (!(await lintStyles())) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
