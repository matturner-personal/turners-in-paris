# Turners in Paris

Our stroller-friendly Paris plan for 26–28 Nov 2026: day-by-day timings, a pan-and-zoom map, food stops and snack ideas, and how to pay for every bus, metro and funicular ride.

It's a single static page with no build step, so it can be hosted anywhere that serves files.

## Put it live with GitHub Pages

1. Push these files to the `main` branch of a public repo called `turners-in-paris`.
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then pick `main` and `/ (root)`, and press **Save**.
4. After a minute or two the app is live at `https://<your-username>.github.io/turners-in-paris/`.

It also works on Vercel or Netlify: import the repo, leave the build command empty, and set the output folder to the repo root.

## Install it on your phone

- **iPhone:** open the link in Safari, tap **Share**, then **Add to Home Screen**.
- **Android:** open the link in Chrome and tap **Install** (or go to ⋮ → **Add to Home screen**).

Once you've opened it once, it works offline, which is handy on the metro or abroad without data.

## Updating the plan

Edit `index.html`, then change `VERSION` in `sw.js` (for example to `tip-v2`) so installed copies pick up the change.

## Files

- `index.html`: the whole app (styles, data and script in one file)
- `manifest.webmanifest`: the app's name, colours and icons for installing
- `sw.js`: offline support
- `icons/`: the family icon (the source is `icon.svg`)
