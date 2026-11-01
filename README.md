# ankurgokhale05.github.io

Personal portfolio of Ankur Gokhale, live at **https://ankurgokhale05.github.io**.

Built with React, Vite, and Tailwind CSS. Tested with Vitest and Playwright. Deployed to GitHub Pages by GitHub Actions.

## Quick start

Requires Node.js 22 or newer.

```bash
npm install
npm run dev       # dev server with live reload at http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server; changes show up instantly |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the `dist/` build at http://localhost:4173 |
| `npm test` | Run unit tests |
| `npm run test:watch` | Re-run unit tests on every file save |
| `npm run test:e2e` | Run end-to-end tests in a real browser |
| `npm run test:all` | Run unit tests, then end-to-end tests |
| `npm run check-links` | Check that the live site and every outside link still load |

## Folders and files

```
.
├── index.html            Page shell: title, link-preview and icon tags, analytics script
├── src/                  The website's code and content
│   ├── data.js           All text on the site (profile, jobs, schools, projects)
│   ├── main.jsx          Starts React and loads the styles
│   ├── App.jsx           Page layout and site-wide behavior
│   ├── index.css         Tailwind setup, background glow, fade-in animation
│   ├── analytics.js      Sends GoatCounter events
│   ├── components/       One file per piece of the page
│   ├── test/setup.js     Shared setup for unit tests
│   └── **/*.test.js[x]   Unit tests, next to the file they test
├── public/               Files served as-is
├── e2e/                  End-to-end browser tests
├── scripts/              Link checker used by the monthly workflow
├── .github/workflows/    Test-and-deploy, monthly link check, quarterly reminder
├── .github/dependabot.yml  Automatic dependency-update pull requests
├── vite.config.js        Build and unit-test settings
├── playwright.config.js  End-to-end test settings
└── package.json          Dependencies and the npm commands above
```

Generated folders, which are ignored by git and safe to delete: `node_modules/` (installed packages), `dist/` (the built site), `test-results/` and `playwright-report/` (output from failed end-to-end runs).

### `src/` — code and content

- **`data.js`** is the only file you need for content changes. See [Editing content](#editing-content).
- **`App.jsx`** lays out the page (left header, right column of sections, footer) and handles:
  - highlighting the nav link for the section on screen
  - the cursor spotlight on desktop
  - fading cards in as they scroll into view
  - jumping to `/#section` links once the page has loaded
  - opening the résumé viewer, including from `/#resume`
- **`index.css`** loads Tailwind and holds the CSS that utility classes can't express: the drifting background glow on phones and the fade-in animation. Both switch off for visitors who've turned on "reduce motion".
- **`analytics.js`** has one helper, `track(name, title)`, which records an event in GoatCounter and does nothing if the counter is blocked.

### `src/components/` — page pieces

| File | What it shows |
| --- | --- |
| `Header.jsx` | Left column: name, title, tagline, open-to-opportunities badge, section nav, Résumé button, social icons |
| `Section.jsx` | Wrapper for each section; adds the sticky section title on phones |
| `Experience.jsx` | Job cards. Also exports `Logo`, used by Education too |
| `Skills.jsx` | Skill groups (Languages, Data & Cloud, …) as tags |
| `Education.jsx` | School cards with GPA and coursework |
| `Publications.jsx` | Papers, with a link out or a "View slides" button |
| `Projects.jsx` | Project cards with thumbnails |
| `TechList.jsx` | The teal skill tags |
| `Icons.jsx` | SVG icons (GitHub, LinkedIn, email, arrows) |
| `ResumeViewer.jsx` | Full-screen, read-only viewer for the résumé and slides. Uses PDF.js to draw each page as an image (so text can't be selected or edited), fits the page to the screen, and offers Zoom in on desktop |

### `public/` — static files

Everything here is copied unchanged into the built site, at the same path.

| Path | What it is |
| --- | --- |
| `logos/` | Company and school logos |
| `projects/` | Project thumbnails (WebP, about 640 px wide) |
| `resume.pdf` | The résumé shown in the viewer |
| `papers/` | Slides for publications (VGPP deck, with the team and mentor slides removed) |
| `robots.txt`, `sitemap.xml` | Tell search engines the site can be indexed |
| `og-image.png` | 1200×630 preview card shown when the link is shared |
| `favicon.svg`, `apple-touch-icon.png` | Browser-tab and iPhone home-screen icons |
| `404.html` | "Page not found" page; sends visitors home after 4 seconds |
| `about.html`, `work.html`, `contact.html` | Redirects from the old site's pages to the matching section |

### `e2e/` — browser tests

`site.spec.js` holds the end-to-end tests. See [Tests](#tests).

### `.github/` — automation

| File | What it does | When |
| --- | --- | --- |
| `workflows/deploy.yml` | Runs the tests; on `master`, also builds and publishes the site. See [Deployment](#deployment). | Every pull request and push to `master` |
| `workflows/link-check.yml` | Runs `scripts/check-links.mjs` against the live site. If anything is broken, opens (or comments on) an issue labeled `broken-links`. | 1st of each month |
| `workflows/quarterly-reminder.yml` | Opens an issue labeled `content-refresh` with a checklist for updating the content. | Jan 1, Apr 1, Jul 1, Oct 1 |
| `dependabot.yml` | Opens pull requests when npm packages or GitHub Actions have updates. Minor and patch updates are grouped into one PR. | Weekly (npm), monthly (Actions) |

All three scheduled jobs can also be run by hand: **Actions → (workflow) → Run workflow**.

## Editing content

Almost everything on the page comes from [`src/data.js`](src/data.js):

| What | Where in `data.js` |
| --- | --- |
| Name, title, tagline, email, résumé file, open-to-opportunities text | `profile` (set `openTo: ''` to hide the badge and footer line) |
| Social icons | `socials` |
| About paragraphs | `about` (only `<b>` tags are allowed, for highlights) |
| Jobs, newest first | `experience`: `date`, `title`, `company`, `location`, `url`, `logo`, `bullets`, `tech` |
| Skills | `skills`: `group`, `items` |
| Schools | `education`: `date`, `school`, `degree`, `location`, `url`, `logo`, `details`, `coursework` |
| Papers | `publications`: `date`, `title`, `type`, `venue`, `authors`, `award`, `description`, `url` or `slides`, `tech` |
| Projects | `projects`: `title`, `description`, `image`, `url`, `tech` |

Images and files:

- **Logos** go in `public/logos/` and are referenced as `logos/<file>`. Without a logo, the card shows the company's initials.
- **Project images** go in `public/projects/`. To convert one to a small WebP: `cwebp -q 80 -resize 640 0 input.jpg -o public/projects/name.webp`.
- **Résumé**: replace `public/resume.pdf`, keeping the same name. `/#resume` links straight to it. Set `profile.resume` to `''` to hide it.
- **Link preview**: the image is `public/og-image.png`, and the text is in the `<meta>` tags in `index.html`. After changing either, refresh LinkedIn's cached copy at https://www.linkedin.com/post-inspector.

Job dates must look like `May 2023 — Present` or `Oct 2021 — Jan 2023` (three-letter month and an em dash). The unit tests check this and check that jobs stay in newest-first order.

## Tests

### Running them

```bash
npm test               # unit tests, about 2 seconds
npm run test:e2e       # end-to-end tests, about 20 seconds
npm run test:all       # both
```

The first time you run the end-to-end tests on a computer, install the test browser:

```bash
npx playwright install chromium
```

Run part of a suite:

```bash
npx vitest run src/data.test.js            # one unit test file
npm run test:watch                         # re-run unit tests on every save
npx playwright test -g "résumé"            # end-to-end tests whose name contains "résumé"
npx playwright test --project=mobile       # phone size only
npx playwright test --headed               # watch the browser while it runs
```

### What they cover

**Unit tests** (Vitest, in `src/` next to the code):

| File | Checks |
| --- | --- |
| `data.test.js` | Content: date format, newest-first order, every logo and image file exists, safe HTML in About, TikTok listed as SDE |
| `analytics.test.js` | Events reach GoatCounter, and nothing breaks if it's blocked |
| `components/Header.test.jsx` | Nav links, active-section highlight, Résumé buttons, social links and click tracking |
| `components/Experience.test.jsx` | Every job, bullet, date, and logo; initials when a logo is missing |
| `components/Skills.test.jsx` | Every skill group and its skills |
| `components/Education.test.jsx` | Degrees, GPA, coursework, school logos |
| `components/Publications.test.jsx` | Papers, authors, ranking badge, slides button |
| `components/ResumeViewer.test.jsx` | Draws one image per page, shows an error if the PDF is missing, closes with Esc / ✕ / outside click, locks page scrolling |
| `App.test.jsx` | Section order, `/#resume` and `/#section` links, cards visible without animation support, hidden skip link |

**End-to-end tests** (Playwright, in `e2e/site.spec.js`) build the site, serve it, and use it in Chrome at desktop (1440×900) and phone (Pixel 7) sizes:

- the page loads with no browser errors, and every image loads
- nav links scroll to and highlight the right section; `/#education` jumps there
- the résumé opens from the nav and the phone button, shows the real PDF pages, and closes
- cards fade in on scroll, and stay still with reduced motion
- phones show the Résumé button and glow, with no sideways scrolling
- `about.html`, `work.html`, `contact.html` redirect, and the 404 page sends visitors home
- link-preview tags point to files that exist

### When an end-to-end test fails

Playwright saves a trace in `test-results/`. Open it to see screenshots, clicks, and console output for each step:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

On GitHub, the same files are attached to the failed run as `playwright-results`.

## Deployment

The site deploys automatically. You never need to build or upload anything by hand.

### Publishing a change

1. Make the change on a branch (this repo uses `redesign`), and run `npm run test:all`.
2. Push the branch and open a pull request into `master`.
3. GitHub Actions runs both test suites on the pull request. A green check means they passed.
4. Merge the pull request.
5. GitHub Actions runs the tests again on `master`, builds the site, and publishes it. The site updates in about 2 minutes.

If the tests fail on `master`, nothing is published and the live site stays as it was.

### Watching or re-running a deploy

- **Progress**: the **Actions** tab on GitHub, or `gh run list --workflow deploy.yml`.
- **Re-run without changes**: **Actions → Test and deploy → Run workflow**, or `gh workflow run deploy.yml --ref master`.

### Rolling back

Revert the bad commit on `master` (`git revert <commit>`, or the **Revert** button on the merged pull request) and merge it. That deploys the previous version.

### One-time setup

In the repository's **Settings → Pages**, **Source** must be **GitHub Actions**. This is already set.

## Keeping it up to date

### Dependency updates

Dependabot opens pull requests on its own. For each one:

1. Wait for the green check (the full test suite runs on it).
2. Merge it. The site redeploys automatically.

If a check fails, the update broke something; leave it open and look at the failed run, or close it to skip that version.

### Broken links

The monthly link check opens a `broken-links` issue listing what failed and where to fix it (usually `src/data.js`). Sites that refuse automated checks (SSRN, sometimes LinkedIn or Cisco) are listed separately as "blocked", not broken; open those in a browser to confirm. To run the check any time: `npm run check-links`.

### Content

Every quarter a `content-refresh` issue arrives with a checklist: new CVS work (with numbers), new skills, projects or papers, the résumé PDF, and whether "open to opportunities" is still accurate. Make the changes in `src/data.js`, run `npm run test:all`, open a pull request, and close the issue.

## Analytics

Visitor counts use [GoatCounter](https://www.goatcounter.com), which sets no cookies and stores no personal data. Stats are at https://ankurgokhale05.goatcounter.com. The site code `ankurgokhale05` is set in `index.html`.

Besides page views, the site records these events:

| Event | When |
| --- | --- |
| `resume-open` | The résumé viewer opens, including from `/#resume` |
| `click-github`, `click-linkedin`, `click-mail` | A social icon is clicked |
| `click-email-footer` | The email link in the footer is clicked |
| `click-open-to-work` | The "Open to new opportunities" badge is clicked |
| `slides-open` | A publication's slides are opened |

Visits from `localhost` aren't counted.
