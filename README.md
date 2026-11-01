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
├── .github/workflows/    The GitHub Actions pipeline
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
| `Header.jsx` | Left column: name, title, tagline, section nav, Résumé button, social icons |
| `Section.jsx` | Wrapper for each section; adds the sticky section title on phones |
| `Experience.jsx` | Job cards. Also exports `Logo`, used by Education too |
| `Education.jsx` | School cards with GPA and coursework |
| `Projects.jsx` | Project cards with thumbnails |
| `TechList.jsx` | The teal skill tags |
| `Icons.jsx` | SVG icons (GitHub, LinkedIn, email, arrows) |
| `ResumeViewer.jsx` | Full-screen, read-only résumé viewer. Uses PDF.js to draw each page as an image, so the text can't be selected or edited |

### `public/` — static files

Everything here is copied unchanged into the built site, at the same path.

| Path | What it is |
| --- | --- |
| `logos/` | Company and school logos |
| `projects/` | Project thumbnails (WebP, about 640 px wide) |
| `resume.pdf` | The résumé shown in the viewer |
| `og-image.png` | 1200×630 preview card shown when the link is shared |
| `favicon.svg`, `apple-touch-icon.png` | Browser-tab and iPhone home-screen icons |
| `404.html` | "Page not found" page; sends visitors home after 4 seconds |
| `about.html`, `work.html`, `contact.html` | Redirects from the old site's pages to the matching section |

### `e2e/` — browser tests

`site.spec.js` holds the end-to-end tests. See [Tests](#tests).

### `.github/workflows/` — automation

`deploy.yml` runs the tests on every pull request, and on `master` it also builds and publishes the site. See [Deployment](#deployment).

## Editing content

Almost everything on the page comes from [`src/data.js`](src/data.js):

| What | Where in `data.js` |
| --- | --- |
| Name, title, tagline, email, résumé file | `profile` |
| Social icons | `socials` |
| About paragraphs | `about` (only `<b>` tags are allowed, for highlights) |
| Jobs, newest first | `experience`: `date`, `title`, `company`, `location`, `url`, `logo`, `bullets`, `tech` |
| Schools | `education`: `date`, `school`, `degree`, `location`, `url`, `logo`, `details`, `coursework` |
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
| `components/Education.test.jsx` | Degrees, GPA, coursework, school logos |
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

## Analytics

Visitor counts use [GoatCounter](https://www.goatcounter.com), which sets no cookies and stores no personal data. Stats are at https://ankurgokhale05.goatcounter.com. The site code `ankurgokhale05` is set in `index.html`.

Besides page views, the site records these events:

| Event | When |
| --- | --- |
| `resume-open` | The résumé viewer opens, including from `/#resume` |
| `click-github`, `click-linkedin`, `click-mail` | A social icon is clicked |
| `click-email-footer` | The email link in the footer is clicked |

Visits from `localhost` aren't counted.
