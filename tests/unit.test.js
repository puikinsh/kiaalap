import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createPage } from '../scripts/create-page.js';
import { getPageContext, NAV_GROUPS } from '../src/config/pages.js';
import { normalizeHtml } from '../src/helpers/normalize-html.js';
import { helpers } from '../src/helpers/handlebars-helpers.js';
import { load } from '../src/js/lazy.js';

test('each known page expands its sidebar group and supplies metadata', () => {
  for (const [group, pages] of Object.entries(NAV_GROUPS)) {
    for (const page of pages) {
      const context = getPageContext(page);
      assert.equal(
        group.split('.').reduce((node, key) => node[key], context),
        true,
        page
      );
      assert.equal(context.page, page);
      assert.ok(context.title);
      assert.ok(context.breadcrumb.length);
    }
  }
  assert.equal(getPageContext('attendance-records').title, 'Attendance records');
  assert.equal(getPageContext('constructor').title, 'Constructor');
});

test('lazy loader rejects unknown and inherited property names, and shares requests', async () => {
  for (const name of ['missing', '__proto__', 'constructor', 'toString']) {
    await assert.rejects(load(name), /Unknown lazy library/);
  }
  const first = load('dayjs');
  assert.equal(load('DAYJS'), first);
  const dayjs = await first;
  assert.equal(dayjs('2026-10-13').format('YYYY-MM-DD'), '2026-10-13');
});

test('page generator refuses path traversal and overwrites', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'kiaalap-page-'));
  try {
    await writeFile(join(directory, 'starter.html'), '{{> head}}');
    for (const name of [
      '../escape',
      'Bad Name',
      '',
      'my-template',
      'student-new',
      'student-new-profile',
    ]) {
      await assert.rejects(createPage(name, directory));
    }
    const destination = await createPage('attendance', directory);
    assert.equal(await readFile(destination, 'utf8'), '{{> head}}');
    await assert.rejects(createPage('attendance', directory), { code: 'EEXIST' });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('page styles move into head without rewriting inline script examples', () => {
  const script = '<script>const example = `<style>.demo{color:red}</style>`;</script>';
  const html = normalizeHtml(`<head></head><body><style>.page{color:blue}</style>${script}</body>`);
  assert.ok(html.startsWith('<head><style>.page{color:blue}</style></head>'));
  assert.ok(html.includes(script));
});

test('initials avatar handles missing and multi-part names', () => {
  assert.equal(helpers.initials('Sarah Johnson'), 'SJ');
  assert.equal(helpers.initials('Mary Jane Smith'), 'MJ');
  assert.equal(helpers.initials(''), 'A');
});
