// Bilingual Wikipedia-style shell.
// All per-site values come from `site.config.js` at the project root —
// fork the template and edit that file, not this one.

import SearchBox from "./SearchBox";
import { siteConfig } from "../site.config.js";

const GH_OWNER = siteConfig.github.owner;
const GH_REPO = siteConfig.github.repo;
const GH_BASE = `https://github.com/${GH_OWNER}/${GH_REPO}`;
const HOME_SLUG = siteConfig.homepageSlug;

const STRINGS = {
  en: {
    siteName: siteConfig.siteName,
    siteTagline: siteConfig.siteTagline.en,
    article: "Article",
    talk: "Talk",
    viewSource: "View source",
    history: "History",
    nav: "Navigation",
    mainPage: "Main page",
    contents: "Contents",
    contribute: "Contribute",
    emailAuthor: "Email the author",
    githubProfile: "GitHub",
    linkedin: "LinkedIn",
    talkTitle: "Open a GitHub issue to discuss this page",
    sourceTitle: "Edit this page on GitHub",
    historyTitle: "View this page's commit history on GitHub",
    footerEdited: siteConfig.footerEdited.en,
    footerLicense:
      "Text is available under the personal responsibility of its author; additional terms may apply. Colarpedia is a stylistic tribute to Wikipedia and not affiliated with the Wikimedia Foundation.",
    contact: "Contact",
    langToggle: "中文",
    langToggleTitle: "切换到中文版本",
  },
  zh: {
    siteName: siteConfig.siteName,
    siteTagline: siteConfig.siteTagline.zh,
    article: "文章",
    talk: "讨论",
    viewSource: "查看源代码",
    history: "查看历史",
    nav: "导航",
    mainPage: "主页",
    contents: "目录",
    contribute: "参与贡献",
    emailAuthor: "联系作者",
    githubProfile: "GitHub",
    linkedin: "LinkedIn",
    talkTitle: "在 GitHub 上打开 Issue 讨论本页",
    sourceTitle: "在 GitHub 上编辑本页",
    historyTitle: "在 GitHub 上查看本页提交历史",
    footerEdited: siteConfig.footerEdited.zh,
    footerLicense:
      "本站文本由作者个人维护，版权归作者所有。Colarpedia 是对维基百科视觉风格的致敬作品，与维基媒体基金会无任何关联。",
    contact: "联系方式",
    langToggle: "EN",
    langToggleTitle: "Switch to English",
  },
};

function wikiHref(slug, lang) {
  return lang === "zh" ? `/zh/wiki/${slug}/` : `/wiki/${slug}/`;
}

export function WikiTopBar({ slug, pages, lang = "en" }) {
  const t = STRINGS[lang] || STRINGS.en;

  const otherLang = lang === "zh" ? "en" : "zh";
  const otherSlug = slug || HOME_SLUG;
  const otherUrl = wikiHref(otherSlug, otherLang);

  const fileName = lang === "zh" ? `${slug}.zh.md` : `${slug}.md`;
  const fileEditUrl = slug
    ? `${GH_BASE}/edit/main/wiki/${fileName}`
    : `${GH_BASE}`;
  const fileHistoryUrl = slug
    ? `${GH_BASE}/commits/main/wiki/${fileName}`
    : `${GH_BASE}/commits/main`;
  const issuesUrl = slug
    ? `${GH_BASE}/issues/new?title=${encodeURIComponent(`Talk: ${slug}`)}`
    : `${GH_BASE}/issues`;

  return (
    <>
      <div className="wiki-topbar">
        <div className="wiki-topbar-inner">
          <a
            href={wikiHref(HOME_SLUG, lang)}
            className="wiki-logo"
            style={{ textDecoration: "none" }}
          >
            {t.siteName}
          </a>
          <a
            href={otherUrl}
            title={t.langToggleTitle}
            className="lang-toggle"
          >
            {t.langToggle}
          </a>
          <SearchBox pages={pages || []} lang={lang} />
        </div>
      </div>
      <div className="wiki-tabs">
        <div className="wiki-tabs-inner">
          <a href="#" className="active">
            {t.article}
          </a>
          <a
            href={issuesUrl}
            className="external"
            target="_blank"
            rel="noreferrer"
            title={t.talkTitle}
          >
            {t.talk}
          </a>
          <a
            href={fileEditUrl}
            className="external"
            target="_blank"
            rel="noreferrer"
            title={t.sourceTitle}
          >
            {t.viewSource}
          </a>
          <a
            href={fileHistoryUrl}
            className="external"
            target="_blank"
            rel="noreferrer"
            title={t.historyTitle}
          >
            {t.history}
          </a>
        </div>
      </div>
    </>
  );
}

export function WikiSidebar({ lang = "en" }) {
  const t = STRINGS[lang] || STRINGS.en;
  const sections = (siteConfig.sidebar[lang] || siteConfig.sidebar.en).filter(
    (s) => s.items && s.items.length > 0
  );
  const { email, linkedin, githubProfile } = siteConfig.contact;

  return (
    <aside className="wiki-sidebar" aria-label={t.nav}>
      <h4>{t.nav}</h4>
      <ul>
        <li><a href={wikiHref(HOME_SLUG, lang)}>{t.mainPage}</a></li>
        <li><a href={`${wikiHref(HOME_SLUG, lang)}#see-also`}>{t.contents}</a></li>
      </ul>

      {sections.map((section) => (
        <div key={section.heading}>
          <h4>{section.heading}</h4>
          <ul>
            {section.items.map((item) => (
              <li key={item.slug}>
                <a href={wikiHref(item.slug, lang)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {(email || linkedin || githubProfile) && (
        <>
          <h4>{t.contribute}</h4>
          <ul>
            {linkedin && (
              <li>
                <a href={linkedin} className="external" target="_blank" rel="noreferrer">
                  {t.linkedin}
                </a>
              </li>
            )}
            {githubProfile && (
              <li>
                <a href={githubProfile} className="external" target="_blank" rel="noreferrer">
                  {t.githubProfile}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`}>{t.emailAuthor}</a>
              </li>
            )}
          </ul>
        </>
      )}
    </aside>
  );
}

export function WikiFooter({ lang = "en" }) {
  const t = STRINGS[lang] || STRINGS.en;
  const { email, linkedin, githubProfile } = siteConfig.contact;
  const hasContact = email || linkedin || githubProfile;

  return (
    <footer className="wiki-footer">
      <p>{t.footerEdited}</p>
      <p>{t.footerLicense}</p>
      {hasContact && (
        <p>
          {linkedin && (
            <a href={linkedin} className="external" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {linkedin && (email || githubProfile) && " · "}
          {email && <a href={`mailto:${email}`}>{t.contact}</a>}
          {email && githubProfile && " · "}
          {githubProfile && (
            <a href={githubProfile} className="external" target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </p>
      )}
    </footer>
  );
}

export function EditLink() {
  return (
    <span className="edit-link">
      <a href={`${GH_BASE}/edit/main/wiki`} target="_blank" rel="noreferrer">
        edit
      </a>
    </span>
  );
}
