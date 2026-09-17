"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  MapPin,
  ArrowRight,
  Trees,
  Fence,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Reveal } from "@/src/components/site/Reveal";
import { BeforeAfter } from "@/src/components/site/BeforeAfter";
import { cn } from "@/src/lib/utils";


import {
  PHONE_MTS,
  PHONE_MTS_RAW,
  PHONE_A1,
  PHONE_A1_RAW,
  WA,
  VIBER,
  TELEGRAM,
  TELEGRAM_BUILD,
  INSTAGRAM,
  VK,
} from "@/src/lib/contact";
import { ContactForm } from "@/src/components/site/ContactForm";

const services = [
  {
    icon: Hammer,
    title: "Ремонт под ключ",
    text: "Полный цикл: от дизайн-решения и черновых работ до финальной уборки и передачи объекта.",
    href: "/remont-pod-klyuch",
  },
  {
    icon: Droplets,
    title: "Ремонт ванной и санузла",
    text: "Гидроизоляция, плитка, сантехника и электрика. Санузел под ключ за 3–4 недели.",
    href: "/remont-vannoj",
  },
  {
    icon: Zap,
    title: "Электромонтаж",
    text: "Замена проводки, щиты с УЗО, розетки и свет. По нормам, с фотоотчётом трасс.",
    href: "/elektrika",
  },
  {
    icon: Droplets,
    title: "Сантехнические работы",
    text: "Замена труб и стояков, сантехника, тёплые полы, котлы. Точка под ключ — 112 BYN.",
    href: "/santehnika",
  },
  {
    icon: PaintRoller,
    title: "Отделка любой сложности",
    text: "Штукатурка по маякам, обои, плитка, стяжка, потолки, декоративные покрытия.",
    href: "/otdelka",
  },
  {
    icon: Trees,
    title: "Срубы ручной рубки",
    text: "Бани и дома в русскую и канадскую чашу. Зимнее бревно, сруб бани — от 7 000 BYN.",
    href: "/sruby",
  },
  {
    icon: Fence,
    title: "Заборы под ключ",
    text: "Профлист, металлопрофиль, 3D-секции, ворота и калитки. Цена за метр — в договоре.",
    href: "/zabory",
  },
  {
    icon: Home,
    title: "Строительство домов и гаражей",
    text: "Фундамент, коробка, кровля, фасад. Дома, гаражи, пристройки и хозпостройки.",
    href: "/stroitelstvo",
  },
  {
    icon: Trash2,
    title: "Демонтажные работы",
    text: "Аккуратный демонтаж перегородок, стяжки, плитки и старой отделки с вывозом мусора.",
    href: "/demontazh",
  },
];

const priceGroups = [
  {
    id: "demolition",
    title: "Демонтажные работы",
    rows: [
      ["Демонтаж плитки", "10 BYN / м²"],
      ["Демонтаж штукатурки", "7 BYN / м²"],
      ["Демонтаж стяжки", "16 BYN / м²"],
      ["Удаление перегородок из монолита и кирпича", "16 BYN / м²"],
      ["Демонтаж дверного и оконного блока", "16 BYN / шт"],
      ["Резка перегородок и стен (кирпич, бетон)", "32 BYN / м.п."],
      ["Демонтаж обоев", "7 BYN / м²"],
      ["Смывка побелки", "10 BYN / м²"],
      ["Очистка от масляной краски или иного покрытия", "13 BYN / м²"],
      ["Демонтаж дверей", "32 BYN / шт"],
      ["Демонтаж линолеума и ковролина", "10 BYN / м²"],
      ["Демонтаж деревянных полов", "13-16 BYN / м²"],
      ["Демонтаж окон", "32-48 BYN / шт"],
      ["Демонтаж унитаза, умывальника и т.д.", "32 BYN / шт"],
      ["Демонтаж полотенцесушителя", "32-48 BYN / шт"],
      ["Демонтаж ванны чугунной", "160 BYN / шт"],
    ],
  },
  {
    id: "electric",
    title: "Электромонтаж",
    rows: [
      ["Штроба под проводку, кирпич бетон", "16-23 BYN / м.п."],
      ["Штроба под проводку силикат.", "13-19 BYN / м.п."],
      ["Укладка кабеля", "10 BYN / м.п."],
      ["Заделка штроб", "7 BYN / м.п."],
      ["Отверстие для электро точки кирпич бетон", "32 BYN / шт"],
      ["Отверстие для электро точки силикат", "26 BYN / шт"],
      ["Отверстие для электро точки ГКЛ", "23 BYN / шт"],
      ["Монтаж подрозетника", "13 BYN / шт"],
      ["Монтаж розетки, выкл. и т.д.", "23 BYN / шт"],
      ["Монтаж распред коробок", "29 BYN / шт"],
      ["Коммутация провода", "3 BYN / шт"],
      ["Укладка гофры и короба под провод", "3 BYN / м.п."],
      ["Монтаж точечного светильника", "13 BYN / шт"],
      ["Навес люстр и бра", "80 BYN / шт"],
      ["Монтаж светодиодной ленты", "16 BYN / м.п."],
      ["Монтаж вентилятора", "32 BYN / шт"],
      ["Монтаж электро теплого пола", "26 BYN / м²"],
      ["Монтаж регулятора теплого пола", "29 BYN / шт"],
      ["Монтаж автомата, УЗО, ДИФ и т.д.", "29-38 BYN / шт"],
      ["Монтаж электро шкафа", "256-384 BYN / комплекс"],
    ],
  },
  {
    id: "plumbing",
    title: "Сантехника",
    rows: [
      ["Штроба в кирпиче и бетоне", "32 BYN / м.п."],
      ["Штроба в силикате", "16 BYN / м.п."],
      ["Точка водопровода канализация гор. вода+холодная", "112 BYN / шт"],
      ["Монтаж счетчиков воды", "112 BYN / шт"],
      ["Монтаж полотенцесушителя", "160 BYN / шт"],
      ["Нарезка резьбы на чугунную трубу", "80 BYN / шт"],
      ["Монтаж и подключение коллектора (гребенки)", "128 BYN / шт"],
      ["Монтаж полотенцесушителя с переносом", "288 BYN / шт"],
      ["Перенос коммуникации, воды канализации", "64-112 BYN / шт"],
      ["Монтаж радиаторов отопления, снятие и установка", "64 BYN / шт"],
      ["Монтаж радиаторов отопления, замена перенос", "192 BYN / шт"],
      ["Монтаж теплых водяных полов", "112 BYN / м²"],
      ["Установка отопительного котла", "480 BYN / шт"],
      ["Обвязка котла", "480 BYN / комплекс"],
      ["Монтаж чугунной ванны", "224 BYN / шт"],
      ["Монтаж акриловой ванны", "192 BYN / шт"],
      ["Установка смесителя", "80 BYN / шт"],
      ["Установка сифона", "48 BYN / шт"],
      ["Монтаж душевой кабины + сборка", "544 BYN / шт"],
      ["Монтаж унитаза сборка установка", "112 BYN / шт"],
      ["Монтаж умывальника", "48-64 BYN / шт"],
      ["Монтаж мебели сан. узлы, тумбачки+шкафы", "96-128 BYN / шт"],
      ["Установка + подключение стиральных машин", "64 BYN / шт"],
      ["Установка посудомоечных машин", "80 BYN / шт"],
      ["Монтаж душевой стойки", "48-80 BYN / шт"],
      ["Монтаж инсталляции", "192 BYN / шт"],
      ["Монтаж биде", "96 BYN / шт"],
    ],
  },
  {
    id: "finish",
    title: "Отделочные работы любой сложности",
    rows: [
      ["Перегородки из газосиликатных блоков", "38-48 BYN / м²"],
      ["Перегородки из кирпича", "48 BYN / м²"],
      ["Перегородки из гипсокартона - зашивка 2-ух сторон", "32 BYN / м²"],
      ["Штукатурка стен 90°", "38 BYN / м²"],
      ["Штукатурка стен", "32 BYN / м²"],
      ["Армирование штукатурки металлосеткой", "16 BYN / м²"],
      ["Штукатурка откосов", "29 BYN / м²"],
      ["Армирование штукатурной сеткой", "10 BYN / м²"],
      ["Грунтовка стен", "1,6 BYN / м²"],
      ["Шпатлевка стен 1-слой", "5 BYN / м²"],
      ["Шпаклевка стен финишная", "7 BYN / м²"],
      ["Поклейка стеклохолста на стены", "7 BYN / м²"],
      ["Малярка стен под покраску + стеклохолст", "38 BYN / м²"],
      ["Установка перфорированного уголка стены", "10 BYN / м.п."],
      ["Выравнивание граней стены", "13 BYN / м.п."],
      ["Покраска", "13 BYN / м²"],
      ["Оклейка обоями стен", "13 BYN / м²"],
      ["Декоративное покрытие стен", "29-64 BYN / м²"],
      ["Утепление", "48-54 BYN / м²"],
      ["Стяжка пола по маякам", "29 BYN / м²"],
      ["Стяжка пола нивелир", "13 BYN / м²"],
      ["Установка и демонтаж маяка", "7 BYN / м.п."],
      ["Гидроизоляция", "38 BYN / м²"],
      ["Грунтовка пола", "7 BYN / м²"],
      ["Укладка фанеры", "38 BYN / м²"],
      ["Укладка ламината", "13 BYN / м²"],
      ["Укладка ламината по диагонали", "19 BYN / м²"],
      ["Настил линолеума и ковролина", "26 BYN / м²"],
      ["Укладка инженерной доски", "48 BYN / м²"],
      ["Укладка полов доска массив. и паркета", "83-112 BYN / м²"],
      ["Укладка паркета ёлочка", "54 BYN / м²"],
      ["Укладка лиственницы", "54 BYN / м²"],
      ["Монтаж деревянных полов + шлифовка + лак", "64 BYN / м²"],
      ["Монтаж полового плинтуса мдф", "10 BYN / м.п."],
      ["Монтаж деревянной лестницы", "112 BYN / м.п."],
      ["Монтаж полового плинтуса", "10-23 BYN / м.п."],
      ["Утепление полов", "16-26 BYN / м²"],
      ["Армирование полов", "13 BYN / м²"],
      ["Облицовка плиткой потолка", "128-160 BYN / м²"],
      ["Облицовка декоративным камнем стен", "80-96 BYN / м²"],
      ["Облицовка глиняной плиткой полов+стен", "45 BYN / м²"],
      ["Укладка плитки", "38 BYN / м²"],
      ["Укладка керамической плитки", "45 BYN / м²"],
      ["Укладка клинкерной плитки", "45 BYN / м²"],
      ["Укладка плитки кабанчик", "51 BYN / м²"],
      ["Укладка керамогранита", "45 BYN / м²"],
      ["Укладка широкоформатной плитки", "96 BYN / м²"],
      ["Облицовка сигар, бордюра, фреза", "13 BYN / м.п."],
      ["Укладка керамогранита по диагонали", "51 BYN / м²"],
      ["Монтаж плиточного уголка", "10 BYN / м.п."],
      ["Монтаж пластикового люка", "16-32 BYN / шт"],
      ["Монтаж скрытого люка", "112 BYN / шт"],
      ["Монтаж экрана под ванную", "96-128 BYN / шт"],
      ["Укладка ступений", "48 BYN / м.п."],
      ["Укладка сапожка", "26 BYN / м.п."],
      ["Монтаж гидроизоляционной ленты", "5 BYN / м.п."],
      ["Монтаж демферной ленты", "7 BYN / м.п."],
      ["Укладка камня искусственного", "42 BYN / м²"],
      ["Укладка натурального камня", "51 BYN / м²"],
      ["Облицовка плиткой к.гранит сложной расклад. полов и стен", "58 BYN / м²"],
      ["Облицовка плиткой малого формата полов и стен", "80-96 BYN / м²"],
      ["Облицовка мозаикой", "90-112 BYN / м²"],
      ["Облицовка мозаикой сложной геометрии", "128 BYN / м²"],
      ["Подрезка черновая", "8 BYN / м.п."],
      ["Подрезка чистовая", "16 BYN / м.п."],
      ["Укладка декора и фризов", "13-16 BYN / м²"],
      ["Зарезка стыков плитки под 45° гр", "35 BYN / м.п."],
      ["Отверстие в плитке глиняной", "16 BYN / шт"],
      ["Отверстие в плитке граните", "19 BYN / шт"],
      ["Фуга цементная", "3 BYN / м²"],
      ["Фуга эпоксидная", "26 BYN / м²"],
      ["Потолок из гипсокартона сплошной", "32 BYN / м²"],
      ["Потолок из гипсокартона многоуровневый", "54-64 BYN / м²"],
      ["Потолок из гипсокартона сложной геометрии", "80 BYN / м²"],
      ["Потолок из ПВХ или иного материала", "29 BYN / м²"],
      ["Штукатурка потолка", "29 BYN / м²"],
      ["Армирование сеткой потолка", "16 BYN / м²"],
      ["Грунтовка потолка", "3 BYN / м²"],
      ["Шпатлевка потолка (1-слой)", "5 BYN / м²"],
      ["Шлифовка шпатлевки потолка", "10 BYN / м²"],
      ["Малярка стен под компрессорную окраску", "58 BYN / м²"],
      ["Нанесение декоративной штукатурки типа (мокрый шёлк)", "58 BYN / м²"],
      ["Нанесение декоративной штукатурки типа (Травертин)", "64 BYN / м²"],
      ["Нанесение фактурных декоративных штукатурок", "48 BYN / м²"],
      ["Поклейка стеклохолста на потолок", "7 BYN / м²"],
      ["Установка перфорированного уголка потолок", "10 BYN / м.п."],
      ["Выравнивание граней потолка", "13 BYN / м.п."],
      ["Покраска потолка", "13 BYN / м²"],
      ["Монтаж потолочного плинтуса", "23 BYN / м.п."],
      ["Оклейка обоями потолка", "29 BYN / м²"],
      ["Декоративное покрытие потолка", "80 BYN / м²"],
      ["Утепление пенополексом", "26 BYN / м²"],
    ],
  },
  {
    id: "turnkey",
    title: "Комплексный ремонт и строительство",
    rows: [
      ["Дизайн проект - 3D визуализация", "64-96 BYN / м²"],
      ["Ремонт квартир (стандарт)", "480 BYN / м²"],
      ["Ремонт квартир (премиум)", "640 BYN / м²"],
      ["Ремонт квартир (люкс)", "960 BYN / м²"],
      ["Ремонт домов", "960 BYN / м²"],
      ["Строительство домов под ключ", "1 760 BYN / м²"],
      ["Монолитные работы", "384 BYN / м³"],
      ["Архитектурные перепланировки", "160 BYN / м²"],
      ["Ведение проектов и решение некачественных монтажей", "48-64 BYN / м²"],
      ["Реконструкция зданий", "896-1024 BYN / м²"],
      ["Ландшафтные работы", "96-208 BYN / м²"],
      ["Геодезические работы", "480 BYN / комплекс"],
      ["Работы на высоте - (промышленный альпинизм)", "224 BYN / комплекс"],
    ],
  },
];

const portfolio = [
  {
    cat: "Квартиры",
    title: "Двухкомнатная квартира, Новополоцк",
    meta: "62 м² · капитальный ремонт · 11 недель",
    alt: "Ремонт двухкомнатной квартиры под ключ в Новополоцке",
    before: "/images/flat-before.jpg",
    after: "/images/flat-after.jpg",
  },
  {
    cat: "Санузлы",
    title: "Санузел под ключ, Полоцк",
    meta: "6 м² · перепланировка · 4 недели",
    alt: "Ремонт санузла под ключ в Полоцке — плитка, сантехника, электрика",
    before: "/images/bath-before.jpg",
    after: "/images/bath-after.jpg",
  },
  {
    cat: "Строительство",
    title: "Дом с гаражом, Полоцкий район",
    meta: "168 м² · коробка, кровля, фасад",
    alt: "Строительство дома с гаражом в Полоцком районе — коробка, кровля, фасад",
    before: "/images/house-before.jpg",
    after: "/images/house-after.jpg",
  },
];

const categories = ["Все", "Квартиры", "Санузлы", "Строительство"] as const;

// FAQ Schema для блока цен — см. docs/SEO_RECOMMENDATIONS.md, п. 9
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько стоит демонтаж плитки?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Демонтаж плитки стоит 10 BYN за м². Также выполняем демонтаж штукатурки (7 BYN/м²), стяжки (16 BYN/м²), перегородок из кирпича и монолита (16 BYN/м²) и другие работы.",
      },
    },
    {
      "@type": "Question",
      name: "Какая стоимость электромонтажных работ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Штробление под проводку — от 13 BYN/м.п., монтаж розеток и выключателей — 23 BYN/шт, монтаж электрощита — от 256 BYN. Полный прайс доступен на сайте.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоит ремонт квартиры под ключ в Полоцке?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Капитальный ремонт квартиры под ключ — от 480 BYN за м² (стандарт), премиум — 640 BYN/м², люкс — 960 BYN/м². Точная смета фиксируется в договоре после бесплатного замера.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоит укладка плитки?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Укладка керамической плитки и керамогранита — 45 BYN за м², плитки кабанчик — 51 BYN/м², широкоформатной плитки — 96 BYN/м², мозаики — от 90 BYN/м².",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоят сантехнические работы?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Точка водопровода и канализации — 112 BYN/шт, установка смесителя — 80 BYN, монтаж акриловой ванны — 192 BYN, унитаза — 112 BYN, душевой кабины — 544 BYN.",
      },
    },
    {
      "@type": "Question",
      name: "Как фиксируется цена ремонта?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "После бесплатного замера составляется смета, которая фиксируется в официальном договоре и не меняется в процессе работ. Оплата поэтапная — за принятый вами этап. Гарантия на работы — 24 месяца.",
      },
    },
  ],
};

export default function HomePage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Все");

  const visible = portfolio.filter((p) => filter === "Все" || p.cat === filter);

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
        <Image
          src="/images/hero.jpg"
          alt="Ремонт квартир под ключ в Полоцке — интерьер после ремонта"
          fill
          priority
          className="image-depth object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink" />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 md:pt-24 md:pb-24">
          <Reveal>
            <p className="eyebrow text-bronze-soft">Строительство и ремонт с 2015 года</p>
            <h1 className="mt-5 max-w-3xl text-[1.5rem] leading-[1.15] font-semibold hyphens-auto text-balance sm:text-5xl sm:leading-[1.08] md:text-6xl">
              Ремонт квартир и строительство домов под ключ в Полоцке и Новополоцке — гарантия 24 месяца
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-chalk/75 sm:text-base">
              Работаем по официальному договору с фиксированной сметой. Помощь в выборе и доставке материала.
              Выезд на замер и консультацию — бесплатно.
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
            Услуги ремонта и строительства в Полоцке и Новополоцке
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const CardInner = (
              <>
                <s.icon className="h-7 w-7 text-accent transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110" />
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-chalk/70">
                  {s.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs tracking-widest text-accent uppercase">
                  {s.href ? "Подробнее" : "Обсудить"}{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-2" />
                </span>
              </>
            );
            const cardCls =
              "motion-card group block h-full bg-card p-6 hover:bg-ink hover:text-chalk sm:p-8";
            return (
              <Reveal key={s.title} delay={i * 60}>
                {s.href ? (
                  <Link href={s.href} className={cardCls}>
                    {CardInner}
                  </Link>
                ) : (
                  <a href="#form" className={cardCls}>
                    {CardInner}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="bg-ink text-chalk">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <h3 className="mt-8 text-lg font-semibold">Реквизиты и гарантии</h3>
            <dl className="mt-4 space-y-4 border-t border-border pt-6 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Исполнитель</dt>
                <dd className="text-right font-semibold">ИП Воробьев Илья Александрович</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">УНП</dt>
                <dd className="text-right font-semibold">391257515</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Регистрация</dt>
                <dd className="text-right font-semibold">17.11.2020</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Опыт работы</dt>
                <dd className="text-right font-semibold">С 2015 года</dd>
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
            <h3 className="text-lg font-semibold">Наши преимущества</h3>
            <ul className="mt-5 grid gap-px overflow-hidden border border-border bg-border">
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
            <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">Наши работы: до и после</h2>
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
                  <BeforeAfter before={p.before} after={p.after} alt={p.alt} />
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
          <ContactForm source="Главная" />
        </Reveal>
      </section>

      {/* CONTACTS + FOOTER */}
      <footer id="contacts" className="bg-ink text-chalk">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
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
              <p className="mt-1 text-sm text-chalk/60">
                Полоцк, Новополоцк.
              </p>
              <p className="mt-1 text-sm text-chalk/60">
                Выезд по всей Беларуси и России.
              </p>
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
                  <a
                    href={VIBER}
                    title="Написать в Viber"
                    className="motion-link hover:text-bronze-soft"
                  >
                    Viber
                  </a>
                </li>
                <li>
                  <a
                    href={TELEGRAM}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    title="Написать в Telegram"
                    className="motion-link hover:text-bronze-soft"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a href={`tel:${PHONE_MTS_RAW}`} className="motion-link hover:text-bronze-soft">
                    Позвонить (МТС)
                  </a>
                </li>
                <li>
                  <a href={`tel:${PHONE_A1_RAW}`} className="motion-link hover:text-bronze-soft">
                    Позвонить (А1)
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-bronze-soft">Соцсети</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    title="Мы в Instagram — @remont_polotck"
                    className="motion-link inline-flex items-center gap-2 hover:text-bronze-soft"
                  >
                    <Image src="/images/instagram.svg" alt="Instagram" width={16} height={16} className="h-4 w-4" /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={TELEGRAM}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    title="Telegram-канал про ремонт"
                    className="motion-link inline-flex items-center gap-2 hover:text-bronze-soft"
                  >
                    <Send className="h-4 w-4" /> Telegram — ремонт
                  </a>
                </li>
                <li>
                  <a
                    href={TELEGRAM_BUILD}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    title="Telegram-канал про строительство"
                    className="motion-link inline-flex items-center gap-2 hover:text-bronze-soft"
                  >
                    <Send className="h-4 w-4" /> Telegram — строительство
                  </a>
                </li>
                <li>
                  <a
                    href={VK}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    title="Мы ВКонтакте"
                    className="motion-link hover:text-bronze-soft"
                  >
                    ВКонтакте
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="hairline my-10" />

          <div className="space-y-1 text-xs text-chalk/55">
            <p>ИП Воробьев Илья Александрович УНП 391257515 · Зарегистрирован 17.11.2020 · Работаем по договору подряда</p>
            <p>Республика Беларусь, Витебская область, г. Полоцк</p>
            <p>Телефоны: {PHONE_MTS}, {PHONE_A1} </p>
            <p className="pt-3">© {new Date().getFullYear()} ИП Воробьев И.А. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* MOBILE QUICK BAR */}
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-chalk/10 bg-ink text-chalk md:hidden">
        <a href={`tel:${PHONE_MTS_RAW}`} title={`Позвонить на МТС: ${PHONE_MTS}`} className="pressable flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-wider uppercase active:bg-ink-soft">
          <Phone className="h-5 w-5 text-bronze" />
          Позвонить
        </a>
        <a href={WA} target="_blank" rel="noopener noreferrer" title="Написать в WhatsApp" className="pressable flex flex-col items-center gap-1 border-x border-chalk/10 py-2.5 text-[10px] tracking-wider uppercase active:bg-ink-soft">
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
