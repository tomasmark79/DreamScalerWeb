# Website editing

This is a static, single-page English website. No build process is required.

## Content

- Edit the introduction, kit price and order email in `index.html`.
- Feature descriptions and screenshot paths are in `app.js`. Keep the initial
  Scales panel in `index.html` in sync with its JavaScript entry.
- Product photos and original app screenshots live in `assets/`.
- The creator's story and optional Bitwig Studio extension are in `index.html`.
  The kit + standalone software costs €169; the bundle including Bitwig costs
  €199. Both order links prefill email drafts. The extension is not sold separately.
- The kit costs €169 including software. The existing email contact handles
  orders; shipping is quoted separately. No payment integration is configured.

## Appearance

Dark is the default. Theme colours match the standalone app, with light colours
under `:root[data-theme=light]` in `styles.css`. The visitor's explicit selection
is stored under `dreamscaler-web-theme`. Screenshots retain their original colours.

The feature gallery supports clicks, Left/Right arrows, Home and End. Mobile
layouts stack the content and let the feature tabs scroll horizontally.

## Preview and publish

Serve the repository root using any static HTTP server. For example:

```sh
python -m http.server 8767 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8767`. The repository root is also ready for GitHub
Pages with `.nojekyll`. Publishing is a separate step from local editing.

Both bundles are offered as non-binding pre-orders. Email drafts state that no
payment or commitment to purchase is required. Prices remain EUR 169 and EUR 199.
