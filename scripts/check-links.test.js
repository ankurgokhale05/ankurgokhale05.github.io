import { describe, expect, it } from 'vitest';
import { classify, collectLinks, report } from './check-links.mjs';

describe('collectLinks', () => {
  const links = collectLinks('https://example.test');
  const urls = links.map((l) => l.url);

  it('checks the site pages, résumé, slides, images, and old-page redirects', () => {
    for (const path of ['/', '/resume.pdf', '/papers/vgpp-slides.pdf', '/projects/protein.webp', '/logos/visa.svg', '/about.html', '/sitemap.xml']) {
      expect(urls).toContain(`https://example.test${path}`);
    }
  });

  it('checks outside links from the content, without email links or duplicates', () => {
    expect(urls).toContain('https://www.linkedin.com/in/ankurajitgokhale/');
    expect(urls).toContain('https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3276164');
    expect(urls).toContain('https://github.com/ankurgokhale05/AI-in-games');
    expect(urls.some((u) => u.startsWith('mailto:'))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe('classify', () => {
  it.each([
    [200, 'outside', 'ok'],
    [301, 'outside', 'ok'],
    [403, 'outside', 'blocked'],
    [999, 'outside', 'blocked'],
    [404, 'outside', 'broken'],
    [410, 'outside', 'broken'],
    [500, 'outside', 'broken'],
    [403, 'site', 'broken'],
  ])('%i on a %s link is %s', (status, kind, result) => {
    expect(classify(status, kind)).toBe(result);
  });
});

describe('report', () => {
  it('lists broken links first and explains blocked ones', () => {
    const md = report([
      { url: 'https://a.test', status: 200, result: 'ok' },
      { url: 'https://b.test', status: 404, result: 'broken' },
      { url: 'https://c.test', status: 403, result: 'blocked' },
    ]);
    expect(md).toContain('1 broken');
    expect(md).toContain('| https://b.test | 404 |');
    expect(md).toContain('refuse bots');
  });
});
