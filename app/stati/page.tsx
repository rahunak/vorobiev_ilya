import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Reveal } from "@/src/components/site/Reveal";
import { ServiceHeader, ServiceFooter, ServiceMobileBar } from "@/src/components/site/ServicePageParts";
import { HUB_SCHEMA } from "@/src/components/site/ArticlePageParts";
import { ARTICLES, formatDate } from "@/src/data/articles";
import { SITE_URL } from "@/src/lib/site";

export const metadata: Metadata = {
  title: "Статьи по ремонту и строительству — Полоцк, Новополоцк",
  description:
    "Статьи по ремонту и строительству: отмостка, штукатурка по маякам, поклейка обоев, тёплый пол, ремонт ванной в хрущевке, забор из профнастила. Практика подрядчика в Полоцке и Новополоцке.",
  keywords: [
    "ремонт статьи полоцк",
    "отмостка вокруг дома",
    "штукатурка стен по маякам",
    "поклейка обоев технология",
    "тёплый пол водяной или электрический",
    "ремонт ванной в хрущевке",
    "забор из профнастила",
  ],
  alternates: { canonical: "/stati" },
  openGraph: {
    title: "Статьи по ремонту и строительству — Полоцк, Новополоцк",
    description:
      "Практические статьи подрядчика по ремонту и строительству в Полоцке и Новополоцке: технологии, этапы работ, расценки.",
    type: "website",
    locale: "ru_RU",
    url: `${SITE_URL}/stati`,
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Статьи по ремонту и строительству",
  itemListElement: ARTICLES.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: a.h1,
    url: `${SITE_URL}/stati/${a.slug}`,
  })),
};

export default function StatiPage() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <ServiceHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HUB_SCHEMA) }}
      />
      <section className="bg-ink text-chalk">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <Reveal immediate>
            <p className="eyebrow text-bronze-soft">Блог подрядчика</p>
            <h1 className="mt-4 max-w-3xl text-2xl leading-tight font-semibold text-balance sm:text-4xl md:text-5xl">
              Статьи по ремонту и строительству: технологии, этапы и расценки
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-chalk/75 sm:text-base">
              Пишем о том, как делаем сами на объектах в Полоцке и Новополоцке:
              без теорий «из интернета» — только то, что проверено на работах.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={i * 60}>
              <Link
                href={`/stati/${a.slug}`}
                className="group motion-card flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={a.heroImage ?? "/images/hero.jpg"}
                    alt={a.heroAlt ?? a.h1}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="image-depth object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow text-accent">{a.eyebrow}</p>
                  <h2 className="mt-2 text-base leading-snug font-semibold text-balance group-hover:text-accent">
                    {a.h1}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{a.lead}</p>
                  <p className="mt-auto pt-4 text-xs text-muted-foreground">
                    {formatDate(a.publishedAt)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      {/* Футер сервисных страниц переиспользуем: услуги + контакты, перелинковка полная */}
      <ServiceFooter
        d={{
          slug: "stati",
          eyebrow: "Статьи",
          h1: "",
          title: "",
          description: "",
          keywords: [],
          lead: "",
          heroImage: "",
          heroAlt: "",
          benefits: [],
          intro: { title: "", paragraphs: [] },
          prices: [],
          faq: [],
        }}
      />
      <ServiceMobileBar />
    </div>
  );
}
