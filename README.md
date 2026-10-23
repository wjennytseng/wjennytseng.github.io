# Jenny Tseng — Personal Website

Personal site for Pei-Hui (Jenny) Tseng, a training specialist in learning and leadership development across Taiwan and Southeast Asia, preparing for graduate study in organizational behavior and leadership on the path to organizational analysis and leadership consulting.

Live site: https://wjennytseng.github.io/

## Structure

This is a static site with no build step. GitHub Pages publishes the root of the `main` branch.

| File | What it holds |
| --- | --- |
| `index.html` | All page content: hero, about, selected work, next chapter, experience, contact, and search/social metadata |
| `cv.html` | The web version of the CV. It is also the source for the PDF |
| `assets/css/style.css` | Colors, type, layout, dark mode, and mobile styles for the main site |
| `assets/css/cv.css` | Screen and print styles for the CV |
| `assets/js/main.js` | Header, theme toggle, mobile menu, scroll reveals, count-up numbers, copy-email button |
| `assets/docs/Jenny-Tseng-CV.pdf` | The downloadable CV, printed from `cv.html` |
| `assets/img/` | Portrait, favicon, Apple touch icon, and the 1200×630 social sharing image |
| `assets/fonts/` | Self-hosted Instrument Serif and Inter (SIL Open Font License, included) |

## Editing

- **Text:** edit `index.html`. Each section is marked with a comment (`<!-- About -->`, `<!-- Work -->`, and so on).
- **Colors:** change the tokens at the top of `assets/css/style.css` (`--accent`, `--ink`, `--bg`, …). Dark-mode values are defined just below them.
- **Portrait:** replace `assets/img/jenny-tseng.jpg` with a square photo. 800×800 px or larger looks sharpest on high-resolution screens.

## Updating the CV PDF

1. Edit `cv.html`.
2. Preview locally (see below) and open http://localhost:8000/cv.html.
3. Regenerate the PDF with Chrome, either with **Print → Save as PDF** (paper size Letter, margins Default, headers and footers off), or from the terminal:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=4000 --print-to-pdf=assets/docs/Jenny-Tseng-CV.pdf http://localhost:8000/cv.html
```

## Preview locally

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publishing

Commit and push to `main`; GitHub Pages redeploys in about a minute.

## Content note

The graduate-study and consulting sections describe future direction. They do not claim enrollment, completed graduate study in those subjects, or an existing consulting practice. Review job dates and certification periods when updating.
