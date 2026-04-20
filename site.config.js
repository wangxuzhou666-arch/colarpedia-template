// Colarpedia template — single source of truth for per-site config.
// Fork this template and replace these values with your own.

export const siteConfig = {
  // Shown in the top bar, <title>, and footer.
  siteName: "Colarpedia",
  siteTagline: {
    en: "The Free Résumé",
    zh: "自由的个人百科",
  },

  // The biography page that `/` redirects to, and the default link
  // target for the "main page" sidebar item. Must match a file
  // `wiki/<homepageSlug>.md` (and optionally `.zh.md`).
  homepageSlug: "Jane_Doe",

  // HTML <head> metadata. Pages override per-page via frontmatter.
  meta: {
    title: "Your Name — Colarpedia",
    description:
      "A Wikipedia-styled personal résumé built as an LLM-maintained multi-page wiki.",
    ogType: "profile",
    // Used for absolute URLs in <meta>. Change after you deploy.
    baseUrl: "https://example.com",
  },

  // GitHub repo that hosts your fork. Drives the "View source" / "History" /
  // "Talk" tabs at the top of every article.
  github: {
    owner: "YOUR_GITHUB_USERNAME",
    repo: "YOUR_REPO_NAME",
  },

  // Contact links in the sidebar and footer. Leave a field empty to hide it.
  contact: {
    email: "",                 // e.g. "you@example.com"
    linkedin: "",              // full URL, e.g. "https://www.linkedin.com/in/you/"
    githubProfile: "",         // full URL, e.g. "https://github.com/you"
  },

  // Sidebar sections. Each item links to a wiki page.
  // Add/remove sections freely — empty sections are hidden.
  sidebar: {
    en: [
      {
        heading: "Notable works",
        items: [
          // { slug: "Project_One", label: "Project One" },
        ],
      },
      {
        heading: "Experience",
        items: [
          // { slug: "Your_Company", label: "Your Company" },
        ],
      },
      {
        heading: "Education",
        items: [
          // { slug: "Your_University", label: "Your University" },
        ],
      },
      {
        heading: "Concepts",
        items: [],
      },
    ],
    zh: [
      {
        heading: "代表作品",
        items: [],
      },
      {
        heading: "工作经历",
        items: [],
      },
      {
        heading: "教育背景",
        items: [],
      },
      {
        heading: "理念",
        items: [],
      },
    ],
  },

  // Footer "last edited" line (static). Update on major site refreshes.
  footerEdited: {
    en: "This page is maintained by its author. See GitHub for the true edit history.",
    zh: "本页面由作者本人维护。详细修订记录见 GitHub。",
  },
};

export default siteConfig;
