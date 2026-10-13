import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pages = readdirSync(root).filter((name) => name.endsWith('.html'));

for (const name of pages) {
  test(`${name} loads without runtime errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    // Keep tests deterministic and independent of external demo imagery/maps.
    await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) =>
      route.fulfill({ status: 200, body: '' })
    );
    const response = await page.goto(`/${name}`);
    expect(response.status()).toBe(200);
    await expect(
      page.locator('main h1, main h2, main h3, main h4, .auth-header h1, h1').first()
    ).toBeVisible();
    const source = readFileSync(resolve(root, name), 'utf8');
    if (source.includes('{{> scripts}}')) {
      await expect
        .poll(() => page.evaluate(() => !!window.Kiaalap && !!window.bootstrap))
        .toBe(true);
    }
    if (name === 'course-info.html')
      await page.locator('button[data-bs-target="#analytics"]').click();
    if (/<canvas\b|\bnew Chart\s*\(/.test(source)) {
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              [...document.querySelectorAll('canvas')].filter((canvas) =>
                window.Chart?.getChart(canvas)
              ).length
          )
        )
        .toBeGreaterThan(0);
    } else {
      expect(await page.evaluate(() => typeof window.Chart)).toBe('undefined');
    }
    if (name === 'events.html') {
      await page.locator('#calendarViewBtn').click();
      await expect(page.locator('#eventCalendar').getByRole('table')).toBeVisible();
      await expect(page.locator('#eventCalendar')).toContainText('Annual Science Fair');
    }
    if (name === 'tinymc.html') await expect(page.locator('.ql-editor').first()).toBeVisible();
    if (name === 'images-cropper.html') await expect(page.locator('cropper-canvas')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('desktop sidebar persists and mobile sidebar closes with Escape', async ({ page }) => {
  await page.goto('/starter.html');
  await page.locator('#sidebarToggle').click();
  await expect(page.locator('#sidebar')).toHaveClass(/collapsed/);
  await page.reload();
  await expect(page.locator('#sidebar')).toHaveClass(/collapsed/);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('#sidebar')).not.toHaveClass(/collapsed/);
  await page.locator('#sidebarToggle').click();
  await expect(page.locator('#sidebar')).toHaveClass(/active/);
  await page.keyboard.press('Escape');
  await expect(page.locator('#sidebar')).not.toHaveClass(/active/);
});

test('lazy hooks can be reinitialized and include their library styles', async ({ page }) => {
  await page.goto('/starter.html');
  await page.evaluate(() => {
    const content = document.getElementById('main-content');
    content.insertAdjacentHTML(
      'beforeend',
      '<select class="tom-select"><option>One</option><option>Two</option></select><div data-simplebar style="height: 80px"><div style="height: 200px">Scroll me</div></div>'
    );
    window.Kiaalap.initLazyLibraries(content);
    window.Kiaalap.initLazyLibraries(content);
  });
  await expect(page.locator('.ts-wrapper')).toHaveCount(1);
  await expect(page.locator('.simplebar-wrapper')).toHaveCount(1);
  expect(
    await page.locator('.simplebar-content-wrapper').evaluate((el) => getComputedStyle(el).overflow)
  ).toMatch(/auto|scroll/);
});

test('department templates and preview work with escaped user input', async ({ page }) => {
  await page.goto('/add-department.html');
  await page.getByRole('button', { name: 'Use Template' }).click();
  await page.getByRole('button', { name: 'Engineering', exact: true }).click();
  await page.getByRole('button', { name: 'Apply template' }).click();
  await expect(page.locator('#departmentName')).toHaveValue('Computer Science');
  await expect(page.locator('#templateModal')).not.toBeVisible();
  await page.locator('#departmentName').fill('<img src=x onerror=alert(1)>');
  await page.locator('#previewDepartment').click();
  await expect(page.locator('#previewModal')).toBeVisible();
  await expect(page.locator('#previewContent')).toContainText('<img src=x onerror=alert(1)>');
  await expect(page.locator('#previewContent img')).toHaveCount(0);
});

test('reduced motion is honored by charts and the sidebar', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/index.html');
  expect(await page.evaluate(() => window.Chart.defaults.animation)).toBe(false);
  expect(
    await page.locator('#sidebar').evaluate((el) => getComputedStyle(el).transitionDuration)
  ).toBe('1e-05s');
});

test('Cropper.js exports a visible image with the requested size limit', async ({ page }) => {
  await page.goto('/images-cropper.html');
  const result = await page.evaluate(async () => {
    await customElements.whenDefined('cropper-image');
    const image = document.querySelector('cropper-image');
    image.src =
      'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="red"/></svg>'
      );
    await image.$ready();
    image.$center('contain');
    const selection = document.querySelector('cropper-selection');
    selection.$reset();
    const canvas = await selection.$toCanvas({ width: 100, height: 100 });
    const pixel = [
      ...canvas
        .getContext('2d')
        .getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1).data,
    ];
    return { width: canvas.width, height: canvas.height, pixel };
  });
  // Cropper preserves the selection aspect ratio within the requested bounds.
  expect(result.width).toBeGreaterThan(0);
  expect(result.height).toBeGreaterThan(0);
  expect(result.width).toBeLessThanOrEqual(100);
  expect(result.height).toBeLessThanOrEqual(100);
  expect(result.pixel).toEqual([255, 0, 0, 255]);
});
