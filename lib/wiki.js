// Wiki reader — reads markdown files from /wiki at build time.
// Bilingual: each slug has an English file <slug>.md and an optional
// Chinese file <slug>.zh.md. The Chinese file falls back to the
// English file if missing.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WIKI_DIR = path.join(process.cwd(), "wiki");

// Files that exist in /wiki but should not become pages.
const NON_PAGE_FILES = new Set(["index.md", "log.md", "index.zh.md"]);

// Returns canonical (English) slugs only — these define the page set.
// Chinese files (.zh.md) are co-located but not separate pages.
export function getAllSlugs() {
  if (!fs.existsSync(WIKI_DIR)) return [];
  return fs
    .readdirSync(WIKI_DIR)
    .filter((f) => f.endsWith(".md") && !f.endsWith(".zh.md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPageSlugs() {
  return getAllSlugs().filter((s) => !NON_PAGE_FILES.has(`${s}.md`));
}

export function getSlugsSet() {
  return new Set(getPageSlugs());
}

// getPage(slug, lang) — lang is "en" (default) or "zh".
// In Chinese mode, falls back to the English file if no .zh.md exists.
export function getPage(slug, lang = "en") {
  const tryFiles =
    lang === "zh"
      ? [`${slug}.zh.md`, `${slug}.md`]
      : [`${slug}.md`];
  for (const fname of tryFiles) {
    const filePath = path.join(WIKI_DIR, fname);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      return { slug, frontmatter: data || {}, body: content || "", lang };
    }
  }
  return null;
}

// Resolve [[WikiLink]] and [[WikiLink|display]] inside a markdown body.
// The link prefix follows the current language: zh pages link to /zh/wiki/...
export function preprocessWikiLinks(body, slugsSet, lang = "en") {
  const prefix = lang === "zh" ? "/zh/wiki" : "/wiki";
  return body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, label) => {
    const slug = target.trim().replace(/\s+/g, "_");
    const display = (label || target).trim();
    const exists = slugsSet.has(slug);
    const href = `${prefix}/${slug}/`;
    if (exists) {
      return `<a href="${href}">${display}</a>`;
    }
    return `<a href="${href}" class="redlink">${display}</a>`;
  });
}

export function getIndexBody() {
  const p = path.join(WIKI_DIR, "index.md");
  if (!fs.existsSync(p)) return "";
  return fs.readFileSync(p, "utf8");
}

// Build-time helper for the search box. Lang-aware: uses the title and
// subtitle from the corresponding language file, falling back to English.
export function getAllPagesForSearch(lang = "en") {
  return getPageSlugs()
    .map((slug) => {
      const page = getPage(slug, lang);
      if (!page) return null;
      return {
        slug,
        title: page.frontmatter?.title || slug.replace(/_/g, " "),
        subtitle: page.frontmatter?.subtitle || "",
      };
    })
    .filter(Boolean);
}
