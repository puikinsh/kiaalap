import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function createPage(name, root = resolve(import.meta.dirname, '..')) {
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name ?? '')) {
    throw new Error('Use a lowercase page name, e.g. npm run page:new -- attendance');
  }
  if (name.includes('template') || name.includes('-new')) {
    throw new Error('Page names containing "template" or "-new" are excluded from builds.');
  }
  const source = await readFile(resolve(root, 'starter.html'), 'utf8');
  const destination = resolve(root, `${name}.html`);
  await writeFile(destination, source, { flag: 'wx' });
  return destination;
}

if (process.argv[1] && resolve(process.argv[1]) === import.meta.filename) {
  try {
    const destination = await createPage(process.argv[2]);
    console.log(
      `Created ${destination}. Edit its content and add a link in src/partials/sidebar.hbs.`
    );
  } catch (error) {
    console.error(
      error.code === 'EEXIST' ? 'That page already exists; choose another name.' : error.message
    );
    process.exitCode = 1;
  }
}
