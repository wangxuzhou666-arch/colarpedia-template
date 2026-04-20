// Dynamic route for every wiki page.
// Reads markdown from /wiki/<slug>.md at build time and renders it.

import { notFound } from "next/navigation";
import {
  getPage,
  getPageSlugs,
  getSlugsSet,
  getAllPagesForSearch,
} from "@/lib/wiki";
import WikiPage from "@/components/WikiPage";
import { WikiTopBar, WikiSidebar, WikiFooter } from "@/components/WikiChrome";

// Static export: pre-render all known slugs at build time.
export function generateStaticParams() {
  return getPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return { title: "Not found - Colarpedia" };
  const title = page.frontmatter?.title || slug.replace(/_/g, " ");
  return {
    title: `${title} - Colarpedia`,
    description: page.frontmatter?.description || page.frontmatter?.subtitle || "",
  };
}

export default async function WikiArticle({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return notFound();

  const slugsSet = getSlugsSet();
  const allPages = getAllPagesForSearch();

  return (
    <>
      <WikiTopBar slug={slug} pages={allPages} />
      <div className="wiki-shell">
        <WikiSidebar />
        <WikiPage
          slug={slug}
          frontmatter={page.frontmatter}
          body={page.body}
          slugsSet={slugsSet}
        />
      </div>
      <WikiFooter />
    </>
  );
}
