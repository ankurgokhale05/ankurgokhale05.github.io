import { expect, test } from '@playwright/test';

// Fail any test that logs a browser error (GoatCounter's "not counting on localhost" is a warning, not an error).
let consoleErrors = [];
test.beforeEach(async ({ page }) => {
  consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
});
test.afterEach(async () => {
  expect(consoleErrors, 'browser console errors').toEqual([]);
});

const scrollThroughPage = async (page) => {
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
};

test.describe('home page', () => {
  test('loads with name, title, and all sections', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Ankur Gokhale — Senior Software Engineer');
    await expect(page.getByRole('heading', { level: 1, name: 'Ankur Gokhale' })).toBeVisible();
    for (const id of ['about', 'experience', 'skills', 'education', 'publications', 'projects', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('lists experience newest first', async ({ page }) => {
    await page.goto('/');
    const titles = page.locator('#experience h3');
    await expect(titles).toHaveCount(6);
    await expect(titles.nth(0)).toContainText('CVS Health');
    await expect(titles.nth(1)).toContainText('Software Development Engineer · TikTok');
    await expect(titles.nth(2)).toContainText('Cisco');
    await expect(titles.nth(3)).toContainText('Visa');
  });

  test('every image loads', async ({ page }) => {
    await page.goto('/');
    await scrollThroughPage(page);
    const images = page.locator('main img');
    await expect(images).toHaveCount(14); // 6 jobs + 2 schools + 6 projects
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0), { message: await img.getAttribute('src') }).toBe(true);
    }
  });

  test('cards fade in as they scroll into view', async ({ page }) => {
    await page.goto('/');
    const lastProject = page.locator('#projects li[data-reveal]').last();
    await expect(lastProject).not.toHaveClass(/is-visible/);
    await scrollThroughPage(page);
    await expect(lastProject).toHaveClass(/is-visible/);
    await expect(lastProject).toHaveCSS('opacity', '1');
  });

  test('shows everything immediately with reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('#projects li[data-reveal]').last()).toHaveCSS('opacity', '1');
  });

  test('skip link stays hidden until a keyboard user tabs to it', async ({ page }) => {
    await page.goto('/');
    const skip = page.getByRole('link', { name: 'Skip to Content' });
    const box = await skip.boundingBox();
    expect(box.width * box.height).toBeLessThanOrEqual(1);
    await page.keyboard.press('Tab');
    await expect(skip).toBeFocused();
    expect((await skip.boundingBox()).width).toBeGreaterThan(100);
  });

  test('has link-preview tags whose files exist', async ({ page, request }) => {
    await page.goto('/');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBe('https://ankurgokhale05.github.io/og-image.png');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    for (const path of ['/og-image.png', '/favicon.svg', '/apple-touch-icon.png', '/resume.pdf']) {
      expect((await request.get(path)).status(), path).toBe(200);
    }
  });
});

test('shows the open-to-opportunities badge and the skills groups', async ({ page }) => {
  await page.goto('/');
  const badge = page.getByRole('link', { name: 'Open to new opportunities' });
  await expect(badge).toBeVisible();
  await expect(badge).toHaveAttribute('href', /^mailto:/);
  await page.goto('/#skills');
  const skills = page.locator('#skills');
  await expect(skills.locator('dt')).toHaveText(['Languages', 'Data & Cloud', 'Databases', 'Backend & Web', 'Testing', 'Tools']);
  await expect(skills.getByText('StarRocks')).toBeVisible();
});

test.describe('navigation (desktop)', () => {
  test.skip(({ isMobile }) => isMobile, 'side nav is desktop-only');

  test('clicking a nav link scrolls there and highlights it', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation');
    await nav.getByRole('link', { name: 'education' }).click();
    await expect(page.locator('#education')).toBeInViewport();
    await expect(nav.getByRole('link', { name: 'education' })).toHaveAttribute('aria-current', 'true');
    await expect(nav.getByRole('link', { name: 'about' })).not.toHaveAttribute('aria-current');
  });

  test('shows a heading above every section', async ({ page }) => {
    await page.goto('/');
    const headings = page.locator('main section h2');
    await expect(headings).toHaveText(['About me', 'Work experience', 'Skills', 'Education', 'Publications', 'Selected projects'], { ignoreCase: true });
    for (const h of await headings.all()) {
      await h.scrollIntoViewIfNeeded();
      await expect(h).toBeVisible();
    }
  });

  test('section links in the URL jump to that section', async ({ page }) => {
    await page.goto('/#education');
    await expect(page.locator('#education')).toBeInViewport();
  });

  test('cursor spotlight follows the mouse', async ({ page }) => {
    await page.goto('/');
    await page.mouse.move(400, 300);
    await expect(page.locator('div[style*="radial-gradient(600px at 400px 300px"]')).toBeAttached();
    await expect(page.locator('.ambient-glow')).toBeHidden();
  });
});

test.describe('mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile-only checks');

  test('shows the résumé button and drifting glow instead of the side nav', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'View Résumé' })).toBeVisible();
    await expect(page.getByRole('navigation')).toBeHidden();
    await expect(page.locator('.ambient-glow')).toBeVisible();
  });

  test('has no horizontal scrolling', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('résumé viewer', () => {
  const openButton = (page, isMobile) =>
    isMobile ? page.getByRole('button', { name: 'View Résumé' }) : page.getByRole('navigation').getByRole('button', { name: 'Resume' });

  test('opens, renders the PDF pages, and closes with Escape', async ({ page, isMobile }) => {
    await page.goto('/');
    await openButton(page, isMobile).click();
    const dialog = page.getByRole('dialog', { name: 'Résumé' });
    await expect(dialog).toBeVisible();

    const firstPage = dialog.getByRole('img', { name: /Résumé page 1 of/ });
    await expect(firstPage).toBeVisible({ timeout: 15_000 });
    const size = await firstPage.boundingBox();
    expect(size.height).toBeGreaterThan(size.width); // portrait page

    // The whole page fits on screen without zooming out.
    const viewport = page.viewportSize();
    expect(size.y).toBeGreaterThanOrEqual(0);
    expect(size.x).toBeGreaterThanOrEqual(0);
    expect(size.y + size.height).toBeLessThanOrEqual(viewport.height);
    expect(size.x + size.width).toBeLessThanOrEqual(viewport.width);

    // "Zoom in" makes it bigger; "Fit to screen" brings it back.
    // On phones the page already fills the width, so there's nothing to zoom to (pinch-zoom still works).
    if (isMobile) {
      await expect(dialog.getByRole('button', { name: 'Zoom in' })).toHaveCount(0);
      expect(size.width).toBeGreaterThan(viewport.width * 0.8);
    } else {
      await dialog.getByRole('button', { name: 'Zoom in' }).click();
      await expect.poll(async () => (await firstPage.boundingBox())?.width ?? 0).toBeGreaterThan(size.width);
      await dialog.getByRole('button', { name: 'Fit to screen' }).click();
      await expect.poll(async () => Math.round((await firstPage.boundingBox())?.width ?? 0)).toBe(Math.round(size.width));
    }

    // Pages are drawn as images: no selectable PDF text layer.
    await expect(dialog.locator('.textLayer, [contenteditable]')).toHaveCount(0);

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('re-fits the page when the window is resized', async ({ page, isMobile }) => {
    test.skip(isMobile, 'phones do not resize');
    await page.goto('/#resume');
    const firstPage = page.getByRole('img', { name: /Résumé page 1 of/ });
    await expect(firstPage).toBeVisible({ timeout: 15_000 });
    await page.setViewportSize({ width: 1000, height: 600 });
    await expect.poll(async () => {
      const b = await firstPage.boundingBox();
      return !!b && b.y + b.height <= 600;
    }).toBe(true);
  });

  test('closes with the close button', async ({ page, isMobile }) => {
    await page.goto('/');
    await openButton(page, isMobile).click();
    await page.getByRole('button', { name: 'Close résumé' }).click();
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('opens directly from the /#resume link', async ({ page }) => {
    await page.goto('/#resume');
    await expect(page.getByRole('dialog', { name: 'Résumé' }).getByRole('img', { name: /Résumé page 1/ })).toBeVisible({ timeout: 15_000 });
    await page.getByRole('button', { name: 'Close résumé' }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe('publications', () => {
  test('lists both papers and links the Saviour paper', async ({ page }) => {
    await page.goto('/#publications');
    const section = page.locator('#publications');
    await expect(section.getByRole('heading', { level: 3 })).toHaveText([
      'Visa Government Payment Portal (VGPP)',
      /Saviour: Disaster Management & Monitoring Utility/,
    ]);
    await expect(section.getByText('Ranked 2nd of 56 teams')).toBeVisible();
    await expect(section.getByRole('link', { name: /Saviour/ })).toHaveAttribute('href', /ssrn\.com/);
  });

  test('opens the Visa slides in the viewer, fitted to the screen', async ({ page }) => {
    await page.goto('/#publications');
    await page.locator('#publications').getByRole('button', { name: /View slides/ }).click();
    const dialog = page.getByRole('dialog', { name: 'Slides' });
    await expect(dialog).toBeVisible();
    const pages = dialog.getByRole('img', { name: /Slides page \d+ of 20/ });
    await expect(pages).toHaveCount(20, { timeout: 20_000 });

    const first = await pages.first().boundingBox();
    expect(first.width).toBeGreaterThan(first.height); // landscape slides
    expect(first.x + first.width).toBeLessThanOrEqual(page.viewportSize().width);
    expect(first.y + first.height).toBeLessThanOrEqual(page.viewportSize().height);

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });
});

test.describe('old addresses and missing pages', () => {
  for (const [oldPage, section] of [['about.html', 'about'], ['work.html', 'projects'], ['contact.html', 'contact']]) {
    test(`/${oldPage} redirects to the ${section} section`, async ({ page }) => {
      await page.goto(`/${oldPage}`, { waitUntil: 'commit' });
      await expect(page).toHaveURL(new RegExp(`/#${section}$`));
      await expect(page.locator(`#${section}`)).toBeInViewport();
    });
  }

  test('404 page explains and sends visitors home', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Go to home page' })).toHaveAttribute('href', '/');
    await page.waitForURL((url) => url.pathname === '/', { timeout: 8_000 });
    await expect(page.getByRole('heading', { level: 1, name: 'Ankur Gokhale' })).toBeVisible();
  });
});
