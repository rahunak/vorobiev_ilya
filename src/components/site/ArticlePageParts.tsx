import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock3, Phone } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Reveal } from "@/src/components/site/Reveal";
import { ContactForm } from "@/src/components/site/ContactForm";
import { ServiceHeader, ServiceMobileBar } from "@/src/components/site/ServicePageParts";
import {
  SITE_NAME,
  SITE_URL,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from "@/src/lib/site";
import {
  PHONE_MTS,
  PHONE_MTS_RAW,
  COMPANY_SHORT,
  UNP,
} from "@/src/lib/contact";
import type { ArticleData, ArticleTable } from "@/src/data/articles";
import { formatDate, otherArticles } from "@/src/data/articles";

/* ------------------------------------------------------------------ meta */

const dateISO = (d: ArticleData, field: "publishedAt" | "updatedAt") =>
  `${d[field]}T09:00:00+03:00`;

export function articleMetadata(d: ArticleData): Metadata {
  return {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    alternates: { canonical: `/stati/${d.slug}` },
    openGraph: {
      title: d.title,
      description: d.description,
      type: "article",
      locale: "ru_RU",
      url: `${SITE_URL}/stati/${d.slug}`,
      siteName: SITE_NAME,
      publishedTime: dateISO(d, "publishedAt"),
      modifiedTime: dateISO(d, "updatedAt"),
      images: [
        {
          url: d.ogImage ?? OG_IMAGE_PATH,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: d.heroAlt,
        },
      ],
    },
  };
}

/* ------------------------------------------------------------------ json-ld */

export function articleJsonLd(d: ArticleData) {
  const post = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: d.h1,
    description: d.description,
    datePublished: dateISO(d, "publishedAt"),
    dateModified: dateISO(d, "updatedAt"),
    inLanguage: "ru-RU",
    author: { "@type": "Organization", name: COMPANY_SHORT, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/stati/${d.slug}`,
    },
    image: [`${SITE_URL}${d.ogImage ?? OG_IMAGE_PATH}`],
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Статьи", item: `${SITE_URL}/stati` },
      {
        "@type": "ListItem",
        position: 3,
        name: d.eyebrow,
        item: `${SITE_URL}/stati/${d.slug}`,
      },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [post, breadcrumbs, faq];
}

const HUB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Статьи по ремонту и строительству — Полоцк, Новополоцк",
  inLanguage: "ru-RU",
};

/* ------------------------------------------------------------------ hero */

export function ArticleHero({ d }: { d: ArticleData }) {
  return (
    <section className="bg-ink text-chalk">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <Reveal immediate>
          <Breadcrumb>
            <BreadcrumbList className="eyebrow text-bronze-soft">
              <BreadcrumbItem>
                <Link href="/" className="transition-colors hover:text-chalk">
                  Главная
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-chalk/40 [&>svg]:h-3 [&>svg]:w-3" />
              <BreadcrumbItem>
                <Link href="/stati" className="transition-colors hover:text-chalk">
                  Статьи
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-chalk/40 [&>svg]:h-3 [&>svg]:w-3" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-bronze-soft">{d.eyebrow}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-5 max-w-3xl text-[1.4rem] leading-[1.18] font-semibold hyphens-auto text-balance sm:text-4xl sm:leading-[1.12] md:text-5xl">
            {d.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-chalk/75 sm:text-base">
            {d.lead}
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs text-chalk/50">
            <Clock3 className="h-3.5 w-3.5 text-bronze" />
            {formatDate(d.publishedAt)}
            {d.updatedAt !== d.publishedAt && <> · обновлено {formatDate(d.updatedAt)}</>}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ body */

function SectionTable({ table }: { table: ArticleTable }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[420px] text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            {table.head.map((h, i) => (
              <th
                key={h}
                className={
                  i === 0
                    ? "py-2 pr-4 font-display font-medium"
                    : "py-2 pr-4 font-display font-medium"
                }
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {table.rows.map((row, r) => (
            <tr key={row[0] ?? r}>
              {row.map((cell, c) => (
                <td
                  key={`${r}-${c}`}
                  className={
                    c === 0
                      ? "py-2 pr-4 text-muted-foreground"
                      : "py-2 pr-4 font-semibold text-accent"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.caption && (
        <p className="mt-2 text-xs text-muted-foreground">{table.caption}</p>
      )}
    </div>
  );
}

export function ArticleBody({ d }: { d: ArticleData }) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
      {d.heroImage && d.heroAlt && (
        <div className="relative mb-10 aspect-[16/7] overflow-hidden hidden sm:block">
          <Image
            src={d.heroImage}
            alt={d.heroAlt}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="image-depth object-cover"
          />
        </div>
      )}
      <div className="space-y-10">
        {d.sections.map((s, i) => (
          <section key={s.h2} className={i === 0 ? undefined : "border-t border-border/60 pt-8"}>
            <h2 className="text-xl leading-tight font-semibold text-balance sm:text-3xl">
              {s.h2}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {s.paragraphs?.map((p) => <p key={p.slice(0, 48)}>{p}</p>)}
              {s.bullets && (
                <ul className="grid gap-2">
                  {s.bullets.map((b) => (
                    <li key={b.slice(0, 48)} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.table && <SectionTable table={s.table} />}
              {s.note && (
                <p className="border-l-2 border-bronze bg-secondary/60 p-4 text-sm text-foreground/80">
                  {s.note}
                </p>
              )}
            </div>
            {s.link && (
              <Link
                href={s.link.href}
                className="motion-link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                {s.link.label} →
              </Link>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ see also */

export function ArticleSeeAlso({ d }: { d: ArticleData }) {
  if (!d.related.length) return null;
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="eyebrow text-accent">Полезное рядом</p>
        <h2 className="mt-2 text-xl font-semibold sm:text-2xl">Статьи и услуги по теме</h2>
        <ul className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {d.related.map((r) => (
            <li key={r.href} className="bg-card p-5">
              <Link href={r.href} className="motion-link font-medium hover:text-accent">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ CTA */

export function ArticleCta({ d }: { d: ArticleData }) {
  return (
    <section id="zayavka" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20">
      <Reveal>
        <p className="eyebrow text-accent">Замер и консультация</p>
        <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">
          Нужно сделать не читая статьи?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Мы делаем {d.ctaService.toLowerCase()} под ключ в Полоцке и Новополоцке:
          официальный договор, фиксированная смета, гарантия 24 месяца. Выезд на замер
          и консультация — бесплатно.
        </p>
      </Reveal>
      <Reveal delay={100}>
        <ContactForm source={d.ctaService} />
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ footer */

export function ArticleFooter({
  d,
  otherArticles,
}: {
  d: ArticleData;
  otherArticles: { href: string; label: string }[];
}) {
  return (
    <footer className="bg-ink text-chalk">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="eyebrow text-bronze-soft">Другие статьи</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/stati" className="motion-link text-bronze-soft">
                  Все статьи редакции
                </Link>
              </li>
              {otherArticles.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="motion-link hover:text-bronze-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-bronze-soft">Если статья понравилась</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="https://t.me/remontpodkluch_polotck"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="motion-link hover:text-bronze-soft"
                >
                  Telegram — ремонт
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/remont_polotck"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="motion-link hover:text-bronze-soft"
                >
                  Instagram — фото работ «до/после»
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/375297237525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-link hover:text-bronze-soft"
                >
                  Вопрос в WhatsApp редактору
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-bronze-soft">Контакты</p>
            <a
              href={`tel:${PHONE_MTS_RAW}`}
              title={`Позвонить на МТС: ${PHONE_MTS}`}
              className="motion-link mt-4 block w-fit font-display text-2xl font-semibold hover:text-bronze-soft"
            >
              {PHONE_MTS}
            </a>
            <p className="mt-3 text-sm text-chalk/60">Полоцк, Новополоцк.</p>
            <p className="mt-1 text-sm text-chalk/60">
              <a href={`tel:${PHONE_MTS_RAW}`} className="motion-link inline-flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-bronze" /> Позвонить
              </a>
            </p>
          </div>
        </div>
        <div className="hairline my-10" />
        <div className="space-y-1 text-xs text-chalk/55">
          <p>
            {COMPANY_SHORT} · УНП {UNP} · Работаем по договору подряда · РБ, Витебская область,
            г. Полоцк
          </p>
          <p>© {new Date().getFullYear()} {COMPANY_SHORT}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ page shell */

export function ArticlePage({ d }: { d: ArticleData }) {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <ServiceHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(d)) }}
      />
      <ArticleHero d={d} />
      <ArticleBody d={d} />
      <ArticleSeeAlso d={d} />
      <ArticleCta d={d} />
      <ArticleFooter d={d} otherArticles={otherArticles(d.slug)} />
      <ServiceMobileBar />
    </div>
  );
}

export { HUB_SCHEMA };
