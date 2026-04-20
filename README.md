# Colarpedia — a Wikipedia-styled personal résumé template

Most personal sites are single pages of hand-written HTML. **Colarpedia**
is a **wiki**: a directory of interlinked markdown files
(`wiki/*.md`) about a single person, rendered in a faithful Wikipedia
visual style. Every project, job, school, and concept gets its own
page. Pages link to each other with `[[WikiLink]]` syntax. Redlinks
exist for pages that haven't been written yet.

> Visual homage to Wikipedia · architecture inspired by Andrej
> Karpathy's [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
> pattern.

This is the open-source **template** — fork it, swap the content with
your own, and deploy in ~5 minutes. Original live example:
<https://colar-wiki.vercel.app/wiki/Colar_Wang/>

---

## Why a wiki and not a one-pager

Because your life keeps adding pages. A static résumé is frozen the
moment it's written; a wiki grows. When you start at a new company,
ship a new product, or read a book that changes how you think, the
right response is _add a page_, not _rewrite the homepage_. If you
keep Claude Code (or any LLM) wired up, it'll do the bookkeeping —
updating cross-references, bumping statuses, appending the change log.

---

## Stack

- **Next.js 15** (App Router, `output: 'export'` → fully static)
- **react-markdown** + **remark-gfm** + **rehype-raw** + **rehype-slug**
- **gray-matter** for YAML frontmatter
- Custom `[[WikiLink]]` preprocessor with automatic red links
- Bilingual (English + 中文) out of the box, with a top-left language
  toggle. Chinese pages are optional — English files serve as fallback.
- Zero client-side JavaScript beyond the root redirect

---

## Quick start (fork → deploy in ~5 min)

### 1. Fork and clone

Click **Fork** at the top of this repo on GitHub, then:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev          # http://localhost:3000
```

You should see a placeholder page about "Jane Doe" — that's the seed
content. Your job now is to replace it.

### 2. Edit `site.config.js`

This is the single source of truth for per-site configuration.
Update:

- `siteName` — what appears in the top bar (you can leave it as
  "Colarpedia" or rename it to your own, e.g. "Doepedia").
- `homepageSlug` — rename from `Jane_Doe` to `Your_Name` (use
  underscores, not spaces). You'll rename the file in step 3.
- `meta.title`, `meta.description`, `meta.baseUrl` — used for
  `<title>` and Open Graph previews.
- `github.owner`, `github.repo` — drives the "View source" / "Talk"
  / "History" tabs.
- `contact.email` / `linkedin` / `githubProfile` — any field you
  leave empty is hidden.
- `sidebar.en` and `sidebar.zh` — left-nav sections. Empty sections
  are hidden automatically.

### 3. Replace the wiki content

```bash
cd wiki
mv Jane_Doe.md <Your_Name>.md
mv Jane_Doe.zh.md <Your_Name>.zh.md       # optional
```

Now edit the file: replace the frontmatter and body with your own
biography. The `site.config.js → homepageSlug` must match the new
filename.

Add more pages as you go:

```bash
touch wiki/<New_Page>.md
```

Follow the frontmatter shape in `Jane_Doe.md`. Link to new pages from
your biography with `[[New_Page]]` syntax. Page types and voice rules
are documented in `CLAUDE.md`.

### 4. Add your photo

Drop a square JPEG (e.g. 400×400) at `public/portrait.jpg`, then add

```yaml
infobox:
  image: /portrait.jpg
  image_caption: You, somewhere, sometime
```

to your main page's frontmatter.

### 5. Deploy to Vercel

1. Push your fork to GitHub.
2. Go to <https://vercel.com/new>, import the repo, accept defaults.
   Next.js is auto-detected.
3. In **Project → Settings → Environment Variables**: nothing needed.
   The site is fully static.
4. First deploy takes ~1 minute. Subsequent pushes auto-deploy in ~30s.

To use your own domain, add it under **Project → Domains** and point
your DNS to Vercel.

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
```

---

## Add a new page (recap)

1. Create `wiki/<Page_Name>.md` with frontmatter (see `Jane_Doe.md`).
2. (Optional) Create `wiki/<Page_Name>.zh.md` for Chinese translation.
3. Link to it from relevant places with `[[Page_Name]]`.
4. Add an entry to `wiki/index.md`.
5. Append to `wiki/log.md`.
6. Optionally: add to `site.config.js → sidebar` for left-nav surface.

Or just ask Claude Code: _"add a page for X and update my main bio."_
`CLAUDE.md` tells it exactly how.

---

## Directory layout

```
.
├── site.config.js       # per-site settings — edit this
├── wiki/                # markdown source of truth
│   ├── <homepage>.md    # your biography (matches homepageSlug)
│   ├── <homepage>.zh.md # optional Chinese mirror
│   ├── <other pages>.md
│   ├── index.md         # page catalog
│   └── log.md           # change log
├── app/                 # Next.js App Router routes
├── components/          # rendering layer (don't touch unless needed)
├── lib/wiki.js          # markdown reader + wikilink preprocessor
├── public/              # static assets (portrait.jpg, logos, etc.)
├── CLAUDE.md            # LLM maintenance schema
└── README.md            # this file
```

---

## License

MIT for the template code. Your own wiki content is yours.

---

## Credit

- Pattern: Andrej Karpathy, _LLM Wiki_ (2026).
- Visual system: Wikipedia (Wikimedia Foundation). Colarpedia is a
  stylistic tribute and is not affiliated with the Wikimedia
  Foundation.
- Template authored by **[Colar Wang](https://github.com/wangxuzhou666-arch)**
  — the original live instance is
  <https://colar-wiki.vercel.app/wiki/Colar_Wang/>.
