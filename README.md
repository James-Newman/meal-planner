# Meal Planner

A 4-week rolling dinner menu for a household of 4 (2 adults, 2 kids), built to make
shopping lists easier and cut down on daily "what's for tea" decisions.

## Household pattern

Most days everyone eats the same dinner. Three days differ:

- **Wednesday** — kids have a meal deal from the local shop; adults eat together separately.
- **Thursday** — kids eat early; adults have a quick microwave meal.
- **Friday** — everyone eats a quick pasta dinner together.

## Structure

```
data/menu.json        4-week menu data (the source of truth)
index.html            Site entry point
assets/styles.css     Styling
assets/app.js         Renders the menu from data/menu.json
.github/workflows/    GitHub Pages deployment
```

## Editing the menu

Edit `data/menu.json` directly. Each week has 7 days; each day is either:

- `"type": "family"` with a single `"meal"` field, or
- `"type": "split"` with a `"meals"` object containing `"kids"` and `"adults"`.

Empty string `""` means the meal hasn't been planned yet — it renders as "TBD" on the site.

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which publishes the site
to GitHub Pages. Enable Pages for this repo under **Settings → Pages → Source: GitHub
Actions** (one-off, manual step).

## Roadmap

- Generate a shopping list from the current week's planned meals.
- Highlight the current week/day when viewing the site.
- Recipe links/notes per meal.
