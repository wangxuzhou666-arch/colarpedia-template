# Colarpedia — wiki maintenance schema

This file tells future Claude Code sessions how to maintain **your**
Colarpedia fork. Per-site values (name, homepage slug, GitHub repo,
contact links, sidebar structure) live in `site.config.js` at the
project root — edit that file first, not individual components.

> Pattern reference: Andrej Karpathy, "LLM Wiki" (gist 442a6bf…)
> Template source: <https://github.com/wangxuzhou666-arch/colarpedia-template>

---

## Architecture

Three layers:

1. **`/wiki`** — the markdown wiki. Every `.md` file (except `index.md`
   and `log.md`) becomes a page at `/wiki/<slug>/`. You own this layer.
2. **`/app`, `/components`, `/lib`** — the Next.js rendering layer. Do
   **not** touch unless you explicitly want a visual or structural
   change. Per-site text and links are not here — they come from
   `site.config.js`.
3. **`site.config.js`** — owner / repo / homepage slug / contact /
   sidebar. Edit this when your identity changes, not the rendering
   layer.

---

## Page types

| Type | Slug example | Contents |
|---|---|---|
| **Biography (root)** | `Jane_Doe` | The main article. Full infobox, lead, links to every other page. Exactly one page of this type — its slug must match `siteConfig.homepageSlug`. |
| **Product** | `Project_One` | Shipped products. Product-style infobox (type, developer, launch, platform, website). |
| **Experience** | `Your_University`, `Your_Company` | Education / employment. Experience infobox (role, dates, location, focus). |
| **Concept** | `Your_Methodology` | Methods and views. Concept infobox (type, applied in, first cited). |

---

## Required frontmatter

Every page begins with YAML frontmatter. The `infobox` field is
structured and drives the right-floated Wikipedia-style box — do not
hand-write HTML for the infobox; use the `rows:` array.

```yaml
---
title: Page Title
subtitle: one-line italic tagline under the title
description: used for <meta> description
infobox:
  title: Page Title
  image: /portrait.jpg          # optional; omit for placeholder
  image_caption: short caption
  rows:
    - label: Born
      value: |
        multi-line values use a
        literal block scalar
    - label: Known for
      html: '<a href="/wiki/Project_One/">Project One</a>'
    - section: Contact            # section divider row
    - label: Email
      value: ...
---
```

Rules:

- **`value:`** for plain text (newlines preserved via `whiteSpace: pre-line`)
- **`html:`** only when you need inline links or formatting
- **`section:`** rows render as a grey divider with the text centered

---

## Wikilinks

Inside markdown bodies, link between wiki pages using `[[...]]` syntax:

- `[[Project_One]]` → blue link to `/wiki/Project_One/`
- `[[Project_One|the product]]` → link with custom display text
- `[[Nonexistent_Page]]` → automatic red link (Wikipedia convention for
  pages that don't exist yet) — use this intentionally to mark future
  work

The preprocessor is in `lib/wiki.js → preprocessWikiLinks`. It resolves
slugs case-sensitively and replaces spaces with underscores.

---

## Voice and style — restrained Wikipedia

- **Third person always.** "Doe has described…", not "I described…".
- **Understatement over hype.** "known for" not "famous for"; "argues that"
  not "proved that"; no "pioneer", "widely regarded", "influential".
- **Dates are absolute.** "Summer 2026", not "next summer".
- **Numbers need a context clause.** Don't drop a "33% annual return" with
  no framing — write "a simulated backtest achieved approximately 33
  percent annualized under a high-frequency regime."
- **Footnotes.** Use numbered references via markdown footnote syntax
  (`[^1]` and `[^1]: ...` at the bottom). Prefer real citations.
  Use `_Internal correspondence._` for private sources.
- **No emoji. No exclamation marks. No second-person.**

---

## Operations

### Ingest (add a new experience / project)

When the user says "I just joined X" or "I shipped Y":

1. **Create the entity page** (`wiki/<new_slug>.md`) with full frontmatter
   and body.
2. **Update the main biography page** (the file named after
   `siteConfig.homepageSlug`):
   - Add a section under Career or Notable works linking to the new page
   - Update the `Known for` / `Employer` rows in the infobox if relevant
3. **Add back-links** from related existing pages (e.g. if the new project
   uses concepts from a methodology page, add a `See also` link there).
4. **Append to `log.md`**:
   ```
   ## [YYYY-MM-DD] ingest | <what happened>
   - created: wiki/<slug>.md
   - updated: wiki/<homepage>.md (section: Career)
   - updated: wiki/<related>.md (See also)
   ```
5. **Update `index.md`** to list the new page under the correct category.
6. **Update `site.config.js` → sidebar** so the new page shows in the
   left-hand navigation (optional, only for pages worth surfacing).

### Update (life event on existing page)

When status changes ("I graduated", "I shipped v2"):

1. Edit the entity page.
2. If the change affects the main bio (e.g. `incoming` → `current`),
   update the biography page infobox and prose.
3. Append to `log.md` with type `update`.

### Lint (periodic health check)

Run on request. Check for:

- Orphan pages (no inbound links)
- Red links that should be created
- Stale claims (e.g. "incoming" after the start date has passed)
- Contradictions between pages (dates, titles, affiliations)
- Pages listed in `index.md` but missing from `/wiki`, or vice versa

---

## Do not

- Do **not** put résumé-style bullet lists in wiki pages. Wikipedia is
  prose. Bullets are acceptable only for `See also`, `References`, and
  explicit enumerations (e.g. a list of coursework).
- Do **not** hard-code HTML in markdown bodies except when the wikilink
  preprocessor has already emitted it. Use `[[...]]` for wiki links
  and standard markdown `[text](url)` for external links.
- Do **not** modify `/app`, `/components`, `/lib`, or CSS unless the user
  explicitly asks for a visual change. The rendering layer is stable.
  Per-site text belongs in `site.config.js`.
- Do **not** delete pages. If content is obsolete, move it to a `History`
  section on the same page or to a new `Former_*` page.
