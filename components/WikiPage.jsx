// WikiPage — renders a single wiki article from parsed markdown.
// Lang-aware: when lang === 'zh', the [edit] link points to the
// .zh.md file and infobox/wikilink prefixes use /zh/wiki/.

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import Infobox from "@/components/Infobox";
import { preprocessWikiLinks } from "@/lib/wiki";
import { siteConfig } from "@/site.config.js";

const GITHUB_EDIT_BASE = `https://github.com/${siteConfig.github.owner}/${siteConfig.github.repo}/edit/main/wiki`;

const STRINGS = {
  en: { edit: "edit" },
  zh: { edit: "编辑" },
};

export default function WikiPage({ slug, frontmatter, body, slugsSet, lang = "en" }) {
  const processed = preprocessWikiLinks(body, slugsSet, lang);

  const {
    title = slug.replace(/_/g, " "),
    subtitle,
    infobox,
  } = frontmatter || {};

  const fileName = lang === "zh" ? `${slug}.zh.md` : `${slug}.md`;
  const editHref = `${GITHUB_EDIT_BASE}/${fileName}`;
  const t = STRINGS[lang] || STRINGS.en;

  return (
    <main className="wiki-main" id="main-content">
      <h1 className="wiki-title">
        {title}
        <span className="edit-link" style={{ fontSize: "12px" }}>
          <a href={editHref} target="_blank" rel="noreferrer">
            {t.edit}
          </a>
        </span>
      </h1>
      {subtitle && <p className="wiki-title-sub">{subtitle}</p>}

      {infobox && <Infobox data={infobox} />}

      <div className="wiki-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          components={{
            h2: ({ node, children, ...props }) => (
              <h2 {...props}>
                {children}
                <span className="edit-link">
                  <a href={editHref} target="_blank" rel="noreferrer">
                    {t.edit}
                  </a>
                </span>
              </h2>
            ),
            a: ({ node, href, className, children, ...props }) => {
              const isExternal =
                href &&
                (href.startsWith("http://") ||
                  href.startsWith("https://") ||
                  href.startsWith("mailto:"));
              const isRedlink = className && className.includes("redlink");
              const classes = [];
              if (isExternal) classes.push("external");
              if (isRedlink) classes.push("redlink");
              return (
                <a
                  href={href}
                  className={classes.join(" ") || undefined}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  {...props}
                >
                  {children}
                </a>
              );
            },
            blockquote: ({ node, ...props }) => <blockquote {...props} />,
          }}
        >
          {processed}
        </ReactMarkdown>
      </div>
    </main>
  );
}
