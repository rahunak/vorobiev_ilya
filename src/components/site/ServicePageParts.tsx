import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MessageCircle,
  MapPin,
  Phone,
  Ruler,
  Send,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Reveal } from "@/src/components/site/Reveal";
import { ContactForm } from "@/src/components/site/ContactForm";
import { SITE_NAME, SITE_URL } from "@/src/lib/site";
import {
  PHONE_A1,
  PHONE_A1_RAW,
  PHONE_MTS,
  PHONE_MTS_RAW,
  INSTAGRAM,
  TELEGRAM,
  TELEGRAM_BUILD,
  VK,
  WA,
  SERVICE_LINKS,
  COMPANY_SHORT,
  UNP,
} from "@/src/lib/contact";

/* ------------------------------------------------------------------ types */

export interface PriceGroup {
  id: string;
  title: string;
  rows: [string, string][];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Benefit {
  icon: LucideIcon;
  t: string;
  d: string;
}

export interface ServicePageData {
  /** URL slug, e.g. "remont-vannoj" */
  slug: string;
  eyebrow: string;
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  lead: string;
  heroImage: string;
  heroAlt: string;
  benefits: Benefit[];
  intro: { title: string; paragraphs: string[] };
  includes?: { title: string; items: string[] };
  prices: PriceGroup[];
  faq: FaqItem[];
  /** Опционально: переопределить перелинковку в футере (по умолчанию — все услуги из SERVICE_LINKS). */
  crossLinks?: { href: string; label: string }[];
}

/* ------------------------------------------------------------------ meta */

export function serviceMetadata(d: ServicePageData): Metadata {
  return {
    title: d.title,
    description: d.description,
    keywords: d.keywords,
    alternates: { canonical: `/${d.slug}` },
    openGraph: {
      title: d.title,
      description: d.description,
      type: "website",
      locale: "ru_RU",
      url: `${SITE_URL}/${d.slug}`,
      siteName: SITE_NAME,
    },
  };
}

/* ------------------------------------------------------------------ header */

export function ServiceHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-ink text-sm font-semibold text-bronze-soft transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 group-active:scale-95">
            ВИ
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-semibold sm:text-base">
              {COMPANY_SHORT}
            </span>
            <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex">
              <MapPin className="h-3 w-3 shrink-0 text-accent" />
              Полоцк • Новополоцк • РБ и РФ
            </span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden flex-col gap-1 lg:flex">
            <a
              href={`tel:${PHONE_MTS_RAW}`}
              title={`Позвонить на МТС: ${PHONE_MTS}`}
              className="motion-link text-sm font-semibold tracking-tight hover:text-accent"
            >
              {PHONE_MTS}
            </a>
            <a
              href={`tel:${PHONE_A1_RAW}`}
              title={`Позвонить на А1: ${PHONE_A1}`}
              className="motion-link text-xs text-muted-foreground hover:text-accent"
            >
              {PHONE_A1}
            </a>
          </div>
          <Button
            asChild
            size="sm"
            className="pressable bronze-sweep bg-ink text-chalk hover:bg-ink-soft"
          >
            <Link href="/#form">
              <Ruler className="h-4 w-4" />
              <span className="hidden sm:inline">Вызвать замерщика</span>
              <span className="sm:hidden">Замер</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="border-t border-border/60 bg-ink px-4 py-1.5 text-center text-[10px] tracking-[0.2em] text-chalk/70 uppercase sm:hidden">
        Полоцк • Новополоцк • РБ и РФ
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ hero */

export function ServiceHero({ d }: { d: ServicePageData }) {
  return (
    <section className="relative overflow-hidden bg-ink text-chalk">
      <Image
        src={d.heroImage}
        alt={d.heroAlt}
        fill
        priority
        className="image-depth object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/80 to-ink" />
      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 md:pt-20 md:pb-20">
        <Reveal>
          <p className="eyebrow text-bronze-soft">{d.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-[1.4rem] leading-[1.18] font-semibold hyphens-auto text-balance sm:text-4xl sm:leading-[1.12] md:text-5xl">
            {d.h1}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-chalk/75 sm:text-base">
            {d.lead}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="pressable bronze-sweep h-12 bg-bronze text-ink hover:bg-bronze-soft"
            >
              <Link href="#zayavka">
                Рассчитать стоимость <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="pressable bronze-sweep h-12 border-chalk/30 bg-transparent text-chalk hover:bg-chalk hover:text-ink"
            >
              <a href={WA} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Написать в WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-chalk/15 bg-chalk/15 sm:grid-cols-3">
            {d.benefits.map((b) => (
              <li
                key={b.t}
                className="group flex items-start gap-3 bg-ink p-5 transition-colors duration-500 hover:bg-ink-soft"
              >
                <b.icon className="mt-0.5 h-5 w-5 shrink-0 text-bronze transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{b.t}</p>
                  <p className="mt-1 text-xs text-chalk/60">{b.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ intro */

export function ServiceIntro({ d }: { d: ServicePageData }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-accent">Об услуге</p>
          <h2 className="mt-3 text-2xl leading-tight font-semibold text-balance sm:text-4xl">
            {d.intro.title}
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {d.intro.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </Reveal>
        {d.includes && (
          <Reveal delay={120}>
            <h3 className="text-lg font-semibold">{d.includes.title}</h3>
            <ul className="mt-5 grid gap-px overflow-hidden border border-border bg-border">
              {d.includes.items.map((item, i) => (
                <li key={item} className="motion-card group flex items-start gap-3 bg-card p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-ink text-[11px] font-semibold text-bronze-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-muted-foreground">{item}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ prices */

export function ServicePrices({ d }: { d: ServicePageData }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: d.eyebrow,
        item: `${SITE_URL}/${d.slug}`,
      },
    ],
  };

  return (
    <section id="prices" className="bg-ink text-chalk">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <p className="eyebrow text-bronze-soft">Прайс-лист</p>
          <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">
            Ориентировочные цены на 2026 год
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-8">
            {d.prices.map((g) => (
              <AccordionItem key={g.id} value={g.id} className="border-chalk/15">
                <AccordionTrigger className="group py-5 text-left font-display text-base font-medium transition-all duration-500 hover:pl-2 hover:text-bronze-soft hover:no-underline active:scale-[0.99]">
                  {g.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="divide-y divide-chalk/10">
                    {g.rows.map(([label, price]) => (
                      <li
                        key={label}
                        className="flex items-baseline justify-between gap-4 py-3 text-sm"
                      >
                        <span className="min-w-0 text-chalk/75">{label}</span>
                        <span className="shrink-0 font-semibold text-bronze-soft">{price}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 border-l-2 border-bronze bg-chalk/5 p-4 text-sm text-chalk/80">
            Точная смета фиксируется в договоре после бесплатного замера.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */

export function ServiceFaq({ d }: { d: ServicePageData }) {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20">
      <Reveal>
        <p className="eyebrow text-accent">Вопросы и ответы</p>
        <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">
          Частые вопросы
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <Accordion type="single" collapsible className="mt-8">
          {d.faq.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-display text-base font-medium hover:no-underline hover:text-accent">
                {f.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ CTA + form */

export function ServiceCta({ d }: { d: ServicePageData }) {
  return (
    <section id="zayavka" className="bg-secondary">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <p className="eyebrow text-accent">Расчёт стоимости</p>
          <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">
            Бесплатный замер и точная смета
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Перезвоним в течение рабочего дня и согласуем удобное время выезда. Замер и
            консультация — бесплатно, без обязательств.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <ContactForm source={d.eyebrow} />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ footer */

export function ServiceFooter({ d }: { d: ServicePageData }) {
  const links = (d.crossLinks ?? ALL_SERVICE_LINKS).filter(
    (l) => !l.href.endsWith(`/${d.slug}`),
  );
  return (
    <footer className="bg-ink text-chalk">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="eyebrow text-bronze-soft">Другие услуги</p>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="motion-link hover:text-bronze-soft">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-bronze-soft">Мессенджеры</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Написать в WhatsApp"
                  className="motion-link hover:text-bronze-soft"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={WA} className="motion-link hidden" aria-hidden="true">
                  whatsapp
                </a>
                <a
                  href={TELEGRAM}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="motion-link hover:text-bronze-soft"
                >
                  Telegram — ремонт
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_BUILD}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="motion-link hover:text-bronze-soft"
                >
                  Telegram — строительство
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
            <a
              href={`tel:${PHONE_A1_RAW}`}
              title={`Позвонить на А1: ${PHONE_A1}`}
              className="motion-link mt-2 block w-fit font-display text-xl font-medium text-chalk/80 hover:text-bronze-soft"
            >
              {PHONE_A1}
            </a>
            <p className="mt-3 text-sm text-chalk/60">Полоцк, Новополоцк.</p>
            <p className="mt-1 text-sm text-chalk/60">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="motion-link hover:text-bronze-soft"
              >
                Instagram
              </a>{" "}
              ·{" "}
              <a
                href={VK}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="motion-link hover:text-bronze-soft"
              >
                ВКонтакте
              </a>{" "}
              ·{" "}
              <a href={`tel:${PHONE_MTS_RAW}`} className="motion-link inline-flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-bronze" /> Позвонить
              </a>
            </p>
          </div>
        </div>
        <div className="hairline my-10" />
        <div className="space-y-1 text-xs text-chalk/55">
          <p>
            {COMPANY_SHORT} · УНП {UNP} · Работаем по договору подряда
          </p>
          <p>Республика Беларусь, Витебская область, г. Полоцк</p>
          <p className="pt-3">© {new Date().getFullYear()} {COMPANY_SHORT}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ mobile bar */

export function ServiceMobileBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-chalk/10 bg-ink text-chalk md:hidden">
      <a
        href={`tel:${PHONE_MTS_RAW}`}
        title={`Позвонить на МТС: ${PHONE_MTS}`}
        className="pressable flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-wider uppercase active:bg-ink-soft"
      >
        <Phone className="h-5 w-5 text-bronze" />
        Позвонить
      </a>
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        title="Написать в WhatsApp"
        className="pressable flex flex-col items-center gap-1 border-x border-chalk/10 py-2.5 text-[10px] tracking-wider uppercase active:bg-ink-soft"
      >
        <MessageCircle className="h-5 w-5 text-bronze" />
        WhatsApp
      </a>
      <a
        href="#zayavka"
        className="pressable flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-wider uppercase active:bg-ink-soft"
      >
        <Ruler className="h-5 w-5 text-bronze" />
        Замер
      </a>
    </nav>
  );
}

/* ------------------------------------------------------------------ page shell */

export function ServicePage({ d }: { d: ServicePageData }) {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <ServiceHeader />
      <ServiceHero d={d} />
      <ServiceIntro d={d} />
      <ServicePrices d={d} />
      <ServiceFaq d={d} />
      <ServiceCta d={d} />
      <ServiceFooter d={d} />
      <ServiceMobileBar />
      {/* VS: Send import kept for icon parity with the home page */}
      <span className="hidden">
        <Send className="h-3 w-3" />
      </span>
    </div>
  );
}

export const ALL_SERVICE_LINKS = SERVICE_LINKS;
