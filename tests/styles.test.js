import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { lintStyles } from '../scripts/lint-styles.js';

async function fixture(run) {
  const root = await mkdtemp(join(tmpdir(), 'kiaalap-styles-'));
  try {
    await mkdir(join(root, 'src/css'), { recursive: true });
    await mkdir(join(root, 'src/scss'), { recursive: true });
    await writeFile(
      join(root, 'eslint.config.mjs'),
      `export { default } from ${JSON.stringify(new URL('../eslint.config.js', import.meta.url).href)};\n`
    );
    await writeFile(join(root, '.prettierrc.json'), '{"singleQuote":true}');
    await writeFile(join(root, 'src/css/test.css'), '.box { color: red; }\n');
    await writeFile(join(root, 'src/scss/_theme.scss'), '$brand: red !default;\n');
    await writeFile(
      join(root, 'src/scss/main.scss'),
      "@use 'theme' as *;\n\n.box {\n  color: $brand;\n}\n"
    );
    await run(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

test('style checks accept valid CSS and compile Sass imports', async () => {
  await fixture(async (root) => assert.equal(await lintStyles(root), true));
});

test('style checks reject CSS mistakes and empty blocks', async () => {
  await fixture(async (root) => {
    await writeFile(join(root, 'src/css/test.css'), '.box { colro: red; }\n.empty {}\n');
    assert.equal(await lintStyles(root), false);
  });
});

test('style checks reject malformed SCSS partials even when not imported', async () => {
  await fixture(async (root) => {
    await writeFile(join(root, 'src/scss/_unused.scss'), '.broken { color: red;');
    assert.equal(await lintStyles(root), false);
  });
});

test('style checks reject valid but unformatted SCSS', async () => {
  await fixture(async (root) => {
    await writeFile(join(root, 'src/scss/_theme.scss'), '$brand:red !default;\n');
    assert.equal(await lintStyles(root), false);
  });
});

test('style checks reject Sass compilation errors', async () => {
  await fixture(async (root) => {
    await writeFile(join(root, 'src/scss/main.scss'), '.box {\n  color: $missing;\n}\n');
    assert.equal(await lintStyles(root), false);
  });
});
