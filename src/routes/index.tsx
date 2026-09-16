import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Phone,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Wallet,
  PackageCheck,
  Hammer,
  Zap,
  Droplets,
  PaintRoller,
  Home,
  Trash2,
  Send,
  Instagram,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { cn } from "@/lib/utils";

import heroImg from "@/assets/hero.jpg";
import flatBefore from "@/assets/flat-before.jpg";
import flatAfter from "@/assets/flat-after.jpg";
import bathBefore from "@/assets/bath-before.jpg";
import bathAfter from "@/assets/bath-after.jpg";
import houseBefore from "@/assets/house-before.jpg";
import houseAfter from "@/assets/house-after.jpg";

const TITLE = "Ремонт и строительство под ключ в Полоцке и Новополоцке — ИП Воробьев И.А.";
const DESC =
  "Официальный договор, фиксированная смета, поэтапная оплата. Ремонт квартир, электрика, сантехника, отделка, строительство домов и гаражей. Полоцк, Новополоцк, РБ и РФ.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHONE = "+375 29 723-75-25";
const PHONE_RAW = "+375297237525";
const WA = "https://wa.me/375297237525";
const VIBER = "viber://chat?number=%2B375297237525";

const services = [
  {
    icon: Hammer,
    title: "Ремонт под ключ",
    text: "Полный цикл: от дизайн-решения и черновых работ до финальной уборки и передачи объекта.",
  },
  {
    icon: Trash2,
    title: "Демонтажные работы",
    text: "Аккуратный демонтаж перегородок, стяжки, плитки и старой отделки с вывозом мусора.",
  },
  {
    icon: Zap,
    title: "Электромонтаж",
    text: "Проектирование, штробление, замена проводки, щиты и слаботочные сети по нормам.",
  },
  {
    icon: Droplets,
    title: "Сантехнические работы",
    text: "Разводка труб, перенос стояков, установка сантехники, тёплые полы и водоснабжение.",
  },
  {
    icon: PaintRoller,
    title: "Отделка любой сложности",
    text: "Штукатурка под правило, декоративные покрытия, плитка крупного формата, лепнина.",
  },
  {
    icon: Home,
    title: "Строительство домов и гаражей",
    text: "Фундамент, коробка, кровля, фасад. Дома, гаражи, пристройки и хозпостройки.",
  },
];

const priceGroups = [
  {
    id: "demolition",
    title: "Демонтажные работы",
    rows: [
      ["Демонтаж керамической плитки", "от 8 BYN / м²"],
      ["Демонтаж кирпичной перегородки", "от 18 BYN / м²"],
      ["Демонтаж цементной стяжки", "от 22 BYN / м²"],
      ["Вывоз строительного мусора", "от 90 BYN / рейс"],
    ],
  },
  {
    id: "electric",
    title: "Электромонтаж",
    rows: [
      ["Монтаж подрозетника с высверливанием", "от 12 BYN / шт"],
      ["Штробление стен под кабель", "от 9 BYN / м.п."],
      ["Прокладка кабеля в гофре", "от 4 BYN / м.п."],
      ["Сборка и подключение щита", "от 250 BYN"],
    ],
  },
  {
    id: "plumbing",
    title: "Сантехника",
    rows: [
      ["Разводка водоснабжения (точка)", "от 130 BYN"],
      ["Установка унитаза / инсталляции", "от 150 BYN"],
      ["Монтаж душевой кабины", "от 220 BYN"],
      ["Тёплый пол водяной", "от 30 BYN / м²"],
    ],
  },
  {
    id: "finish",
    title: "Отделка",
    rows: [
      ["Штукатурка стен по маякам", "от 22 BYN / м²"],
      ["Шпатлёвка под покраску", "от 16 BYN / м²"],
      ["Укладка плитки", "от 38 BYN / м²"],
      ["Поклейка обоев", "от 10 BYN / м²"],
    ],
  },
  {
    id: "turnkey",
    title: "Комплексный ремонт и строительство",
    rows: [
      ["Косметический ремонт квартиры", "от 180 BYN / м²"],
      ["Капитальный ремонт под ключ", "от 420 BYN / м²"],
      ["Ремонт санузла под ключ", "от 2 600 BYN"],
      ["Строительство гаража / дома", "расчёт по проекту"],
    ],
  },
];

const portfolio = [
  {
    cat: "Квартиры",
    title: "Двухкомнатная квартира, Новополоцк",
    meta: "62 м² · капитальный ремонт · 11 недель",
    before: flatBefore,
    after: flatAfter,
  },
  {
    cat: "Санузлы",
    title: "Санузел под ключ, Полоцк",
    meta: "6 м² · перепланировка · 4 недели",
    before: bathBefore,
    after: bathAfter,
  },
  {
    cat: "Строительство",
    title: "Дом с гаражом, Полоцкий район",
    meta: "168 м² · коробка, кровля, фасад",
    before: houseBefore,
    after: houseAfter,
  },
];

const categories = ["Все", "Квартиры", "Санузлы", "Строительство"] as const;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  if (!digits) return "";
  const cc = digits.startsWith("375") ? "375" : digits.startsWith("7") ? "7" : "";
  if (!cc) return `+${digits}`;
  const rest = digits.slice(cc.length);
  const parts = [rest.slice(0, 2), rest.slice(2, 5), rest.slice(5, 7), rest.slice(7, 9)].filter(
    Boolean,
  );
  return `+${cc}${parts.length ? " " + parts.join(" ") : ""}`;
}

function Index() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Все");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const visible = portfolio.filter((p) => filter === "Все" || p.cat === filter);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Укажите имя", { description: "Минимум 2 символа." });
      return;
    }
    if (phone.replace(/\D/g, "").length < 11) {
      toast.error("Проверьте номер телефона", { description: "Формат +375 XX XXX XX XX." });
      return;
    }
    toast.success("Заявка отправлена", {
      description: "Свяжемся с вами в течение рабочего дня и согласуем бесплатный замер.",
    });
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="group flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-ink text-sm font-semibold text-bronze-soft transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 group-active:scale-95">
              ВИ
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-sm font-semibold sm:text-base">
                ИП Воробьев И.А.
              </span>
              <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex">
                <MapPin className="h-3 w-3 shrink-0 text-accent" />
                Полоцк • Новополоцк • РБ и РФ
              </span>
            </span>
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${PHONE_RAW}`}
              className="motion-link hidden text-sm font-semibold tracking-tight hover:text-accent lg:block"
            >
              {PHONE}
            </a>
            <Button asChild size="sm" className="pressable bronze-sweep bg-ink text-chalk hover:bg-ink-soft">
              <a href="#form">
                <Ruler className="h-4 w-4" />
                <span className="hidden sm:inline">Вызвать замерщика</span>
                <span className="sm:hidden">Замер</span>
              </a>
            </Button>
          </div>
        </div>
        <div className="border-t border-border/60 bg-ink px-4 py-1.5 text-center text-[10px] tracking-[0.2em] text-chalk/70 uppercase sm:hidden">
          Полоцк • Новополоцк • РБ и РФ
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden bg-ink text-chalk">
        <img
          src={heroImg}
          alt="Интерьер после премиального ремонта под ключ"
          width={1536}
          height={1024}
          className="image-depth absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink" />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 md:pt-24 md:pb-24">
          <Reveal>
            <p className="eyebrow text-bronze-soft">Строительство и ремонт с 2015 года</p>
            <h1 className="mt-5 max-w-3xl text-[1.5rem] leading-[1.15] font-semibold hyphens-auto text-balance sm:text-5xl sm:leading-[1.08] md:text-6xl">
              Профессиональный ремонт и строительство под ключ в Полоцке и Новополоцке
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-chalk/75 sm:text-base">
              Работаем по официальному договору с фиксированной сметой. Сроки, объёмы и стоимость
              закреплены на бумаге, качество — на уровне премиальных объектов.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="pressable bronze-sweep h-12 bg-bronze text-ink hover:bg-bronze-soft"
              >
                <a href="#form">
                  Рассчитать стоимость <ArrowRight className="h-4 w-4" />
                </a>
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
              {[
                { icon: ShieldCheck, t: "Официальный договор", d: "ИП с УНП 391257515" },
                { icon: Wallet, t: "Поэтапная оплата", d: "Платите за принятый этап" },
                { icon: PackageCheck, t: "Материалы со скидкой", d: "Закупка по ценам поставщиков" },
              ].map((i) => (
                <li key={i.t} className="group flex items-start gap-3 bg-ink p-5 transition-colors duration-500 hover:bg-ink-soft">
                  <i.icon className="mt-0.5 h-5 w-5 shrink-0 text-bronze transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{i.t}</p>
                    <p className="mt-1 text-xs text-chalk/60">{i.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <p className="eyebrow text-accent">Услуги</p>
          <h2 className="mt-3 max-w-2xl text-2xl leading-tight font-semibold text-balance sm:text-4xl">
            Полный цикл работ одной бригадой
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
               <article className="motion-card group h-full bg-card p-6 hover:bg-ink hover:text-chalk sm:p-8">
                 <s.icon className="h-7 w-7 text-accent transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110" />
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-chalk/70">
                  {s.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs tracking-widest text-accent uppercase">
                   Обсудить <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-2" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="bg-ink text-chalk">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <p className="eyebrow text-bronze-soft">Прайс-лист</p>
            <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">
              Ориентировочные цены на 2026 год
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Accordion type="single" collapsible className="mt-8" defaultValue="demolition">
              {priceGroups.map((g) => (
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

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-accent">О нас и прозрачность</p>
            <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">
              Работаем открыто: документы, сметы, этапы
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Каждый объект ведёт один ответственный прораб. Вы получаете график работ, перечень
              материалов с ценами и фотоотчёт по каждому этапу. Скрытых доплат нет — любое изменение
              оформляется дополнительным соглашением.
            </p>
            <dl className="mt-8 space-y-4 border-t border-border pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Исполнитель</dt>
                <dd className="text-right font-semibold">ИП Воробьев Илья Александрович</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">УНП</dt>
                <dd className="text-right font-semibold">391257515</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">База</dt>
                <dd className="text-right font-semibold">Полоцк, Новополоцк</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">География выезда</dt>
                <dd className="text-right font-semibold">Вся Беларусь и Россия</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-px overflow-hidden border border-border bg-border">
              {[
                ["Бесплатный замер", "Выезд, обмеры и смета без обязательств."],
                ["Фиксированная смета", "Цена закреплена договором до конца работ."],
                ["Поэтапная оплата", "Оплата только за принятый вами этап."],
                ["Гарантия на работы", "24 месяца на выполненные работы."],
              ].map(([t, d]) => (
                <li key={t} className="motion-card group bg-card p-6">
                  <p className="font-display text-base font-semibold">{t}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <Reveal>
            <p className="eyebrow text-accent">Портфолио</p>
            <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">До и после</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Потяните ползунок, чтобы увидеть результат.
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                type="button"
                variant="outline"
                onClick={() => setFilter(c)}
                className={cn(
                  "pressable h-auto rounded-sm border px-4 py-2 text-xs tracking-widest uppercase",
                  filter === c
                    ? "border-ink bg-ink text-chalk"
                    : "border-border bg-background text-muted-foreground hover:border-accent hover:text-accent",
                )}
              >
                {c}
              </Button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article className="motion-card group overflow-hidden border border-border bg-card">
                  <BeforeAfter before={p.before} after={p.after} alt={p.title} />
                  <div className="p-5">
                    <p className="eyebrow text-accent">{p.cat}</p>
                    <h3 className="mt-2 text-base font-semibold">{p.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{p.meta}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <p className="eyebrow text-accent">Расчёт стоимости</p>
          <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">
            Оставьте заявку — посчитаем смету
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Перезвоним в течение рабочего дня и согласуем удобное время бесплатного замера.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <form onSubmit={submit} className="mt-8 grid gap-4 border border-border bg-card p-6 transition-shadow duration-700 focus-within:border-bronze/50 focus-within:shadow-[0_18px_50px_color-mix(in_oklab,var(--ink)_10%,transparent)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-xs tracking-widest uppercase">
                  Имя
                </label>
                <Input
                  id="name"
                  value={name}
                  maxLength={60}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                  className="h-12 rounded-sm"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-xs tracking-widest uppercase">
                  Телефон (РБ / РФ)
                </label>
                <Input
                  id="phone"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="+375 29 000 00 00"
                  className="h-12 rounded-sm"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="msg" className="text-xs tracking-widest uppercase">
                Описание задачи
              </label>
              <Textarea
                id="msg"
                value={message}
                maxLength={1000}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Объект, площадь, сроки, что нужно сделать"
                className="min-h-32 rounded-sm"
              />
            </div>
            <Button type="submit" size="lg" className="pressable bronze-sweep group h-12 bg-ink text-chalk hover:bg-ink-soft">
              Получить расчёт сметы <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи по заявке.
            </p>
          </form>
        </Reveal>
      </section>

      {/* CONTACTS + FOOTER */}
      <footer id="contacts" className="bg-ink text-chalk">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="eyebrow text-bronze-soft">Контакты</p>
              <a
                href={`tel:${PHONE_RAW}`}
                className="motion-link mt-4 block w-fit font-display text-2xl font-semibold hover:text-bronze-soft"
              >
                {PHONE}
              </a>
              <p className="mt-3 text-sm text-chalk/60">
                Полоцк, Новополоцк. Выезд по всей Беларуси и России.
              </p>
            </div>
            <div>
              <p className="eyebrow text-bronze-soft">Мессенджеры</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                   <a href={WA} target="_blank" rel="noopener noreferrer" className="motion-link hover:text-bronze-soft">
                    WhatsApp
                  </a>
                </li>
                <li>
                   <a href={VIBER} className="motion-link hover:text-bronze-soft">
                    Viber
                  </a>
                </li>
                <li>
                   <a href={`tel:${PHONE_RAW}`} className="motion-link hover:text-bronze-soft">
                    Max
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-bronze-soft">Соцсети</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                   <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="motion-link inline-flex items-center gap-2 hover:text-bronze-soft">
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                </li>
                <li>
                   <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="motion-link inline-flex items-center gap-2 hover:text-bronze-soft">
                    <Send className="h-4 w-4" /> Telegram — ремонт
                  </a>
                </li>
                <li>
                   <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="motion-link inline-flex items-center gap-2 hover:text-bronze-soft">
                    <Send className="h-4 w-4" /> Telegram — строительство
                  </a>
                </li>
                <li>
                   <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="motion-link hover:text-bronze-soft">
                    ВКонтакте
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="hairline my-10" />

          <div className="space-y-1 text-xs text-chalk/55">
            <p>ИП Воробьев Илья Александрович</p>
            <p>УНП 391257515</p>
            <p>Республика Беларусь, Витебская область, г. Полоцк</p>
            <p>Телефон: {PHONE} · Работаем по договору подряда</p>
            <p className="pt-3">© {new Date().getFullYear()} ИП Воробьев И.А. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE QUICK BAR */}
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-chalk/10 bg-ink text-chalk md:hidden">
        <a href={`tel:${PHONE_RAW}`} className="pressable flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-wider uppercase active:bg-ink-soft">
          <Phone className="h-5 w-5 text-bronze" />
          Позвонить
        </a>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="pressable flex flex-col items-center gap-1 border-x border-chalk/10 py-2.5 text-[10px] tracking-wider uppercase active:bg-ink-soft">
          <MessageCircle className="h-5 w-5 text-bronze" />
          WhatsApp
        </a>
        <a href="#form" className="pressable flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-wider uppercase active:bg-ink-soft">
          <Ruler className="h-5 w-5 text-bronze" />
          Замер
        </a>
      </nav>
    </div>
  );
}
