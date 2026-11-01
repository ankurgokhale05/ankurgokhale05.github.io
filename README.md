# ankurgokhale05.github.io

Personal portfolio of Ankur Gokhale, live at **https://ankurgokhale05.github.io**.

Built with React, Vite, and Tailwind CSS. Deployed to GitHub Pages by GitHub Actions.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # dev server with live reload at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Editing content

Almost everything on the page comes from [`src/data.js`](src/data.js):

| What | Where in `data.js` |
| --- | --- |
| Name, title, tagline, email | `profile` |
| Social icons | `socials` |
| About paragraphs | `about` (supports `<b>` for highlights) |
| Jobs | `experience` — `date`, `title`, `company`, `location`, `url`, `logo`, `bullets`, `tech` |
| Schools | `education` |
| Projects | `projects` — `image` points to a file in `public/projects/` |

Images and files:

- **Company and school logos** go in `public/logos/` and are referenced as `logos/<file>`. Without a logo, the card shows the company's initials.
- **Résumé**: replace `public/resume.pdf`, keeping the same name. It opens in a read-only viewer on the site, and `/#resume` links straight to it. Set `profile.resume` to `''` to hide it.
- **Link preview image** (shown when the URL is shared on LinkedIn, Slack, etc.): `public/og-image.png`, 1200×630. Text for the preview is in the `<meta>` tags in `index.html`.
- **Browser tab icon**: `public/favicon.svg` and `public/apple-touch-icon.png`.

## Project structure

```
index.html              page shell, meta tags, analytics script
public/                 static files copied as-is (logos, project images, résumé, icons)
src/
  data.js               all site content
  App.jsx               page layout, section tracking, cursor spotlight
  analytics.js          GoatCounter event helper
  components/
    Header.jsx          left column: name, nav, social links
    Experience.jsx      job cards (also exports the shared Logo)
    Education.jsx       school cards
    Projects.jsx        project cards
    ResumeViewer.jsx    read-only PDF viewer (PDF.js)
    Section.jsx, TechList.jsx, Icons.jsx
.github/workflows/deploy.yml   build and deploy to GitHub Pages
```

## Deployment

Every push to `master` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it to GitHub Pages. This takes about 30 seconds.

In the repository's **Settings → Pages**, the source must be **GitHub Actions**.

## Analytics

Visitor counts use [GoatCounter](https://www.goatcounter.com), which sets no cookies and stores no personal data. Stats are at https://ankurgokhale05.goatcounter.com.

Besides page views, the site records when someone opens the résumé or clicks a social or email link. Visits from `localhost` aren't counted.
