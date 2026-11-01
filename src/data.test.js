// Checks the site content in data.js so typos and missing files are caught before deploy.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { about, education, experience, profile, projects, publications, skills, socials } from './data';

const publicFile = (p) => existsSync(resolve(__dirname, '../public', p));
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// "May 2023 — Present" -> 2023.33 (start date as a sortable number)
const startOf = (date) => {
  const [mon, year] = date.split(' — ')[0].split(' ');
  return Number(year) + MONTHS.indexOf(mon) / 12;
};

describe('profile', () => {
  it('has the basics filled in', () => {
    expect(profile.name).toBe('Ankur Gokhale');
    expect(profile.title).toBeTruthy();
    expect(profile.tagline).toMatch(/machine learning and AI/);
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
  });

  it('points to a résumé file that exists', () => {
    expect(publicFile(profile.resume)).toBe(true);
  });
});

describe('socials', () => {
  it('uses https or mailto links only', () => {
    for (const s of socials) expect(s.url).toMatch(/^(https:\/\/|mailto:)/);
  });

  it('no longer includes Twitter/X', () => {
    expect(socials.map((s) => s.name)).toEqual(['GitHub', 'LinkedIn', 'Email']);
  });
});

describe('about', () => {
  it('only uses <b> tags, since it is rendered as HTML', () => {
    for (const p of about) {
      const tags = p.match(/<\/?[a-z]+[^>]*>/gi) ?? [];
      for (const t of tags) expect(t).toMatch(/^<\/?b>$/);
    }
  });

  it('mentions the interests outside of work', () => {
    const text = about.join(' ');
    for (const word of ['reader', 'polymath', 'travel', 'hike', 'cook', 'strength train', 'personal finance', 'portfolio']) {
      expect(text).toContain(word);
    }
  });
});

describe('experience', () => {
  it('lists the jobs newest first, starting with CVS Health, TikTok, Cisco, Visa', () => {
    expect(experience.slice(0, 4).map((j) => j.company)).toEqual(['CVS Health Inc.', 'TikTok Inc.', 'Cisco Systems Inc.', 'Visa Inc.']);
    const starts = experience.map((j) => startOf(j.date));
    expect(starts).toEqual([...starts].sort((a, b) => b - a));
  });

  it.each(experience.map((j) => [j.company, j]))('%s has complete details', (_, job) => {
    expect(job.title).toBeTruthy();
    expect(job.date).toMatch(/^[A-Z][a-z]{2} \d{4} — ([A-Z][a-z]{2} \d{4}|Present)$/);
    expect(job.bullets.length).toBeGreaterThan(0);
    expect(job.tech.length).toBeGreaterThan(0);
    expect(new Set(job.bullets).size).toBe(job.bullets.length);
    expect(publicFile(job.logo)).toBe(true);
    if (job.url) expect(job.url).toMatch(/^https:\/\//);
  });

  it('describes TikTok as an SDE role, not SDET', () => {
    const tiktok = experience.find((j) => j.company === 'TikTok Inc.');
    expect(tiktok.title).toBe('Software Development Engineer');
    expect(JSON.stringify(tiktok)).not.toMatch(/SDET/);
    expect(tiktok.bullets[0]).toMatch(/Analytics platform/);
    expect(tiktok.bullets).toHaveLength(6);
  });
});

describe('skills', () => {
  it('groups skills with no empty groups or duplicates', () => {
    expect(skills.map((g) => g.group)).toEqual(['Languages', 'Data & Cloud', 'Databases', 'Backend & Web', 'Testing', 'Tools']);
    const all = skills.flatMap((g) => g.items);
    for (const g of skills) expect(g.items.length).toBeGreaterThan(0);
    expect(new Set(all).size).toBe(all.length);
  });

  it('covers the core skills from the résumé', () => {
    const all = skills.flatMap((g) => g.items);
    for (const s of ['Python', 'Java', 'Microsoft Azure', 'Apache Kafka', 'MySQL', 'StarRocks', 'Django', 'Pytest', 'Cypress', 'Git']) {
      expect(all).toContain(s);
    }
  });
});

describe('education', () => {
  it('lists UT Dallas then University of Mumbai with existing logos', () => {
    expect(education.map((e) => e.school)).toEqual(['The University of Texas at Dallas', 'University of Mumbai']);
    for (const e of education) expect(publicFile(e.logo)).toBe(true);
  });
});

describe('publications', () => {
  it('lists the Visa white paper, then the Saviour paper', () => {
    expect(publications.map((p) => p.date)).toEqual(['Jul 2020', 'Oct 2018']);
    expect(publications[0].award).toBe('Ranked 2nd of 56 teams');
  });

  it('only links to files and pages that exist', () => {
    for (const p of publications) {
      if (p.slides) expect(publicFile(p.slides)).toBe(true);
      if (p.url) expect(p.url).toMatch(/^https:\/\//);
    }
  });

  it('credits Ankur as an author of the Saviour paper', () => {
    expect(publications.find((p) => p.title.startsWith('Saviour')).authors).toContain('A. Gokhale');
  });
});

describe('projects', () => {
  it.each(projects.map((p) => [p.title, p]))('%s has an existing image and a GitHub link', (_, p) => {
    expect(p.description).toBeTruthy();
    expect(p.url).toMatch(/^https:\/\/github\.com\/ankurgokhale05\//);
    expect(p.image).toMatch(/\.webp$/);
    expect(publicFile(p.image)).toBe(true);
  });
});
