export interface ArticleTable {
  head: string[];
  rows: string[][];
  caption?: string;
}

export interface ArticleLinkRef {
  href: string;
  label: string;
}

export interface ArticleSection {
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: ArticleTable;
  note?: string;
  /** Перелинковка со страницей услуги или другой статьёй. */
  link?: ArticleLinkRef;
}

export interface ArticleData {
  slug: string;
  /** Короткий ярлык для хлебных крошек и CTA. */
  eyebrow: string;
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  lead: string;
  heroImage?: string;
  heroAlt?: string;
  /** Переопределить OG-превью статьи (по умолчанию — общий og_image). */
  ogImage?: string;
  /** ISO-дата без времени, например "2026-10-27". */
  publishedAt: string;
  updatedAt: string;
  serviceSlug: string;
  /** Название услуги для CTA-блока, например "отмостка вокруг дома". */
  ctaService: string;
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
  /** Блок «Статьи и услуги по теме» на странице статьи. */
  related: ArticleLinkRef[];
  /** Колонка «Другие статьи» в футере. */
  footerArticles: ArticleLinkRef[];
}
