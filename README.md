# Midnight Marquee

A retro horror movie recommendation tool for Halloween. Answer 20 questions across five acts, then choose a lineup of 3–5 classics from a curated 30-film catalog spanning 1922–1999. Results explain the matches and include content notes and film lookup links.

## Run locally

No build, dependencies, credentials, or backend required.

```sh
cd /workspace/CodexDemo
python -m http.server 8000
```

Open the local server in your browser. The app also works by opening `index.html` directly. Fonts load from Google Fonts when available; system fonts are the fallback. Answers stay in memory and are cleared on refresh. No tracking or external recommendation API is used.

## GitHub Pages

Push these files to the `main` branch. In the repository’s **Settings → Pages → Build and deployment**, select **GitHub Actions**. The included workflow deploys on pushes to `main` or manual runs. All app asset links are relative, so a repository project site works without path configuration. Alternatively, choose **Deploy from a branch**, `main`, `/ (root)`.

## Recommendation model

Each answer matches curated movie tags. Movies earn one point per matching answer, with penalties for films outside an explicitly selected low-gore or gentle-intensity preference. Results use release year as a deterministic tie breaker. Preferences influence ranking, but are not hard content filters; content notes help viewers make their own decisions. This is a discovery tool, not an age-rating or safety guarantee. Film runtimes refer to common releases and can vary by edition.

## Validation

Run the catalog and recommendation checks with `node --test tests/recommendations.test.cjs`.
