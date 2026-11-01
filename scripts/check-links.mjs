// Checks that the live site's pages and every outside link in src/data.js still load.
// Usage: node scripts/check-links.mjs [--base https://ankurgokhale05.github.io]
// Exits with code 1 if any link is broken, and writes a Markdown report to the
// file in $LINK_REPORT (or prints it).
import { appendFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { education, experience, profile, projects, publications, socials } from '../src/data.js';

const DEFAULT_BASE = 'https://ankurgokhale05.github.io';

// Pages and files the site itself must serve.
const SITE_PATHS = ['/', '/404.html', '/about.html', '/work.html', '/contact.html', '/og-image.png', '/favicon.svg', '/robots.txt', '/sitemap.xml'];

/** Every link to check: site files first, then outside links from data.js (no duplicates, no mailto). */
export function collectLinks(base = DEFAULT_BASE) {
  const site = [...SITE_PATHS];
  if (profile.resume) site.push(`/${profile.resume}`);
  for (const p of publications) if (p.slides) site.push(`/${p.slides}`);
  for (const p of projects) site.push(`/${p.image}`);
  for (const j of [...experience, ...education]) if (j.logo) site.push(`/${j.logo}`);

  const outside = [
    ...socials.map((s) => s.url),
    ...experience.map((j) => j.url),
    ...education.map((e) => e.url),
    ...publications.map((p) => p.url),
    ...projects.map((p) => p.url),
  ].filter((u) => u && u.startsWith('http'));

  const links = [...site.map((p) => ({ url: base.replace(/\/$/, '') + p, kind: 'site' })), ...outside.map((url) => ({ url, kind: 'outside' }))];
  return links.filter((l, i) => links.findIndex((m) => m.url === l.url) === i);
}

/**
 * ok: loads. blocked: the site refuses automated checks (common for LinkedIn, Cisco, SSRN) but
 * the page likely works in a browser. broken: missing, gone, server error, or unreachable.
 * Our own site must always load, so "blocked" counts as broken there.
 */
export function classify(status, kind = 'outside') {
  if (status >= 200 && status < 400) return 'ok';
  if (kind === 'outside' && [401, 403, 405, 429, 999].includes(status)) return 'blocked';
  return 'broken';
}

async function check({ url, kind }, attempts = 3) {
  let last = { status: 0, error: '' };
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(20_000),
        headers: { 'user-agent': 'Mozilla/5.0 (link check for ankurgokhale05.github.io)' },
      });
      res.body?.cancel();
      last = { status: res.status, error: '' };
      if (classify(res.status, kind) !== 'broken') break;
    } catch (e) {
      last = { status: 0, error: e.cause?.code || e.name || String(e) };
    }
    await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
  }
  return { url, kind, ...last, result: last.status ? classify(last.status, kind) : 'broken' };
}

export function report(results) {
  const broken = results.filter((r) => r.result === 'broken');
  const blocked = results.filter((r) => r.result === 'blocked');
  const row = (r) => `| ${r.url} | ${r.status || r.error} |`;
  let md = `## Link check: ${broken.length ? `${broken.length} broken` : 'all good'}\n\n`;
  md += `Checked ${results.length} links: ${results.length - broken.length - blocked.length} OK, ${blocked.length} blocked automated checks, ${broken.length} broken.\n`;
  if (broken.length) md += `\n### Broken\n\nFix these in \`src/data.js\` or \`public/\`.\n\n| Link | Status |\n| --- | --- |\n${broken.map(row).join('\n')}\n`;
  if (blocked.length) md += `\n### Blocked automated checks\n\nThese sites refuse bots; open them in a browser to be sure they still work.\n\n| Link | Status |\n| --- | --- |\n${blocked.map(row).join('\n')}\n`;
  return md;
}

async function main() {
  const i = process.argv.indexOf('--base');
  const base = i > -1 ? process.argv[i + 1] : DEFAULT_BASE;
  const links = collectLinks(base);
  const results = [];
  // A few at a time, to be polite to the sites being checked.
  for (let n = 0; n < links.length; n += 4) results.push(...(await Promise.all(links.slice(n, n + 4).map((l) => check(l)))));

  const md = report(results);
  if (process.env.LINK_REPORT) writeFileSync(process.env.LINK_REPORT, md);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
  console.log(md);
  process.exit(results.some((r) => r.result === 'broken') ? 1 : 0);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
