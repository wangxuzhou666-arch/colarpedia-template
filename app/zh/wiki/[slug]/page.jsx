// Chinese (zh) mirror of the dynamic wiki route. Reads <slug>.zh.md
// (falling back to <slug>.md when no Chinese file exists) and renders
// it through the same chrome with lang="zh".

import { notFound } from "next/navigation";
import {
  getPage,
  getPageSlugs,
  getSlugsSet,
  getAllPagesForSearch,
} from "@/lib/wiki";
import WikiPage from "@/components/WikiPage";
import { WikiTopBar, WikiSidebar, WikiFooter } from "@/components/WikiChrome";

export function generateStaticParams() {
  return getPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPage(slug, "zh");
  if (!page) return { title: "未找到 - Colarpedia" };
  const title = page.frontmatter?.title || slug.replace(/_/g, " ");
  return {
    title: `${title} - Colarpedia`,
    description: page.frontmatter?.description || page.frontmatter?.subtitle || "",
  };
}

export default async function WikiArticleZh({ params }) {
  const { slug } = await params;
  const page = getPage(slug, "zh");
  if (!page) return notFound();

  const slugsSet = getSlugsSet();
  const allPages = getAllPagesForSearch("zh");

  return (
    <>
      <WikiTopBar slug={slug} pages={allPages} lang="zh" />
      <div className="wiki-shell">
        <WikiSidebar lang="zh" />
        <WikiPage
          slug={slug}
          frontmatter={page.frontmatter}
          body={page.body}
          slugsSet={slugsSet}
          lang="zh"
        />
      </div>
      <WikiFooter lang="zh" />
    </>
  );
}
