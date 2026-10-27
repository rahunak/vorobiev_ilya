import type { ArticleData } from "./types";
import { otmostka } from "./otmostka";
import { shtukaturka } from "./shtukaturka";
import { teplyjPol } from "./teplyj-pol";
import { xrushevka } from "./xrushevka";
import { zaborProfnastil } from "./zabor-profnastil";
import { poklejkaOboev } from "./poklejka-oboev";

export type { ArticleData, ArticleTable, ArticleSection, ArticleLinkRef } from "./types";

/**
 * Все статьи блога. Порядок = порядок на хабе /stati и в перелинковке.
 * Новую статью достаточно добавить в этот массив — pages/sitemap подхватят её сами.
 */
export const ARTICLES: ArticleData[] = [
  otmostka,
  shtukaturka,
  teplyjPol,
  xrushevka,
  zaborProfnastil,
  poklejkaOboev,
];

export function getArticle(slug: string): ArticleData | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Ссылки на другие статьи (используются в футере и «по теме»). */
export function otherArticles(currentSlug: string): { href: string; label: string }[] {
  return ARTICLES.filter((a) => a.slug !== currentSlug).map((a) => ({
    href: `/stati/${a.slug}`,
    label: a.eyebrow,
  }));
}

const MONTHS_GEN = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
] as const;

/** "2026-10-27" → "27 октября 2026" для даты публикации под заголовком. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS_GEN[(m ?? 1) - 1]} ${y}`;
}
