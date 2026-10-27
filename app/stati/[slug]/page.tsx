import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ArticlePage,
  articleMetadata,
} from "@/src/components/site/ArticlePageParts";
import { ARTICLES, getArticle } from "@/src/data/articles";

/** Роут "stati/[slug]": все статьи из реестра строятся статически. */
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

type ArticleRouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: ArticleRouteProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return undefined;
  return articleMetadata(article);
}

export default async function ArticleRoute({
  params,
}: ArticleRouteProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <ArticlePage d={article} />;
}
