# AGENTS.md

Context for future agents working on this repo.

## What this is

A personal (non-Snyk) project: a 4-week rolling dinner menu for James's household, used to
plan meals and simplify shopping lists. Static site, no build step, deployed to GitHub Pages.

## Household constants (do not infer differently)

- 4 people: 2 adults, 2 kids.
- Only the **evening meal** is tracked — no breakfast/lunch placeholders.
- Weekly pattern is fixed and repeats across all 4 weeks:
  - Monday, Tuesday, Sunday: one family meal, everyone eats the same thing.
  - Wednesday: kids have a meal deal from the local shop (not a planned meal); adults eat
    a separate meal together.
  - Thursday: kids eat early (separate from adults); adults have a quick microwave meal.
  - Friday: all 4 eat together — quick pasta, rotating across the 4 weeks (bacon cheese,
    meatballs, bolognese, cheesy).
  - Saturday: all 4 eat together — takeaway night, rotating across the 4 weeks (Chinese,
    Curry, Chip Shop, Fancy Pizza).
- This split (`"family"` vs `"split"` day types) is structural, not a placeholder — don't
  collapse Wednesday/Thursday into single family meals when filling in data.

## Data model

`data/menu.json` is the single source of truth. Shape:

```json
{
  "household": { "adults": 2, "kids": 2 },
  "weeks": [
    {
      "week": 1,
      "days": {
        "monday": { "type": "family", "meal": "" },
        "wednesday": { "type": "split", "meals": { "kids": "...", "adults": "" } }
      }
    }
  ]
}
```

- `"meal"` / `"meals.*"` values of `""` are unplanned placeholders — the frontend renders
  these as "TBD". Don't invent meal names to fill placeholders unless asked.
- Day keys must stay lowercase full day names (`monday`...`sunday`) — `assets/app.js`
  (`DAY_ORDER`) depends on this.

## Site

Plain HTML/CSS/JS, no framework, no build step, no dependencies:

- `index.html` — shell, loads `assets/app.js`.
- `assets/app.js` — fetches `data/menu.json` and renders weeks/days client-side.
- `assets/styles.css` — styling.

Keep it dependency-free unless there's a real reason to add a framework — the whole point
is that this is a small, low-maintenance static page.

## Workflow

Commit and push directly to `main`. No PRs, no feature branches — this is a solo,
low-ceremony personal project.

## Deployment

`.github/workflows/deploy-pages.yml` deploys `main` to GitHub Pages via
`actions/upload-pages-artifact` + `actions/deploy-pages`. `.nojekyll` is present so GitHub
doesn't run the Jekyll build step on the raw static files.

## Roadmap / not yet built

- Shopping list generation from planned meals.
- Current-week/current-day highlighting.
- Recipe notes/links per meal.

Don't build these speculatively — the current scope is the framework and placeholders only.
