# Atelier Expression — Coming Soon

Static GitHub Pages landing page built with Vite + SCSS.

## Local start

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
npm run preview
```

## Email capture

This is a static GitHub Pages site. It cannot store emails by itself.

The form is ready for Formspree by default:

1. Create a Formspree form.
2. Copy the endpoint URL.
3. Replace `https://formspree.io/f/TON_ID_FORMSPREE` in `index.html`.
4. Commit and push.

You can also replace the form action with a Brevo, Mailchimp, ConvertKit, Buttondown, or custom API endpoint.

## GitHub Pages deployment

1. Create a GitHub repository.
2. Push this project to the `main` branch.
3. In GitHub: **Settings → Pages → Source → GitHub Actions**.
4. Push again or run the workflow manually from the **Actions** tab.

The workflow builds `dist/` and deploys it to GitHub Pages.

## Customize quickly

- Main copy: `index.html`
- Colors, layout, animation, responsive behavior: `src/styles/main.scss`
- Form behavior: `src/js/main.js`
- Deploy workflow: `.github/workflows/deploy.yml`
