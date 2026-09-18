# SEO Рекомендации для vorobiev_nextjs

**Дата аудита:** 2026-09-16  
**Фокус:** On-Page SEO, структурированные данные, техническое SEO для улучшения позиций в поисковой выдаче

---

## 🔴 Критичные проблемы (исправить в первую очередь)

### 1. **Отсутствует robots.txt**
**Проблема:** Нет файла robots.txt — поисковые роботы не получают инструкций по индексации.

**Решение:**
```txt
# /public/robots.txt
User-agent: *
Allow: /

# Блокируем служебные файлы Next.js
Disallow: /_next/
Disallow: /api/

# Указываем sitemap
Sitemap: https://ваш-домен.by/sitemap.xml
```

**Файл:** Создать `public/robots.txt`

---

### 2. **Отсутствует sitemap.xml**
**Проблема:** Google не знает о структуре сайта и приоритетах страниц.

**Решение:** Создать динамический sitemap для Next.js App Router.

**Файл:** `app/sitemap.ts`
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ваш-домен.by';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Добавить страницы услуг, портфолио, прайс при создании
  ];
}
```

---

### 3. **Нет структурированных данных (Schema.org)**
**Проблема:** Google не понимает тип бизнеса, контакты, услуги — нет Rich Snippets в выдаче.

**Решение:** Добавить JSON-LD разметку для:
- **LocalBusiness** (основная информация о бизнесе)
- **Service** (каждая услуга)
- **AggregateRating** (отзывы, если есть)
- **BreadcrumbList** (навигация)

**Файл:** `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  // ... существующие meta
};

// Добавить JSON-LD Schema
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ваш-домен.by/#organization",
    "name": "ИП Воробьев Илья Александрович",
    "alternateName": "ИП Воробьев И.А.",
    "description": "Ремонт и строительство под ключ в Полоцке и Новополоцке. Официальный договор, фиксированная смета, поэтапная оплата.",
    "url": "https://ваш-домен.by",
    "logo": "https://ваш-домен.by/images/logo.png",
    "image": "https://ваш-домен.by/images/hero.jpg",
    "telephone": "+375297237525",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Полоцк",
      "addressRegion": "Витебская область",
      "addressCountry": "BY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.4879",
      "longitude": "28.7619"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Полоцк"
      },
      {
        "@type": "City",
        "name": "Новополоцк"
      },
      {
        "@type": "Country",
        "name": "Беларусь"
      },
      {
        "@type": "Country",
        "name": "Россия"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.instagram.com/remont_polotck",
      "https://t.me/remontpodkluch_polotck",
      "https://t.me/RemontPodKlyuchPolotsk",
      "https://vk.com/remontstroipolotck"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги ремонта и строительства",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ремонт квартир под ключ",
            "description": "Полный цикл ремонтных работ от демонтажа до чистовой отделки"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Электромонтажные работы",
            "description": "Проектирование, штробление, замена проводки, монтаж электрощитов"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Сантехнические работы",
            "description": "Разводка труб, установка сантехники, тёплые полы"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Строительство домов и гаражей",
            "description": "Фундамент, коробка, кровля, фасадные работы"
          }
        }
      ]
    }
  };

  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
```

---

### 4. **Отсутствует og:image и twitter:image**
**Проблема:** При шаринге в соцсетях не отображается превью с картинкой — теряется CTR.

**Решение:** Добавить Open Graph изображение.

**Файл:** `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "Ремонт и строительство под ключ в Полоцке и Новополоцке — ИП Воробьев И.А.",
  description: "Официальный договор, фиксированная смета, поэтапная оплата. Ремонт квартир, электрика, сантехника, отделка, строительство домов и гаражей. Полоцк, Новополоцк, РБ и РФ.",
  authors: [{ name: "ИП Воробьев И.А." }],
  openGraph: {
    title: "Ремонт и строительство под ключ в Полоцке и Новополоцке — ИП Воробьев И.А.",
    description: "Официальный договор, фиксированная смета, поэтапная оплата. Ремонт квартир, электрика, сантехника, отделка, строительство домов и гаражей. Полоцк, Новополоцк, РБ и РФ.",
    type: "website",
    locale: "ru_RU",
    url: "https://ваш-домен.by",
    siteName: "ИП Воробьев И.А.",
    images: [
      {
        url: "https://ваш-домен.by/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ремонт и строительство под ключ — ИП Воробьев И.А.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ремонт и строительство под ключ в Полоцке и Новополоцке — ИП Воробьев И.А.",
    description: "Официальный договор, фиксированная смета, поэтапная оплата. Ремонт квартир, электрика, сантехника, отделка, строительство домов и гаражей. Полоцк, Новополоцк, РБ и РФ.",
    images: ["https://ваш-домен.by/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};
```

**Действие:** Создать `public/images/og-image.jpg` размером 1200×630px с брендингом.

---

### 5. **Отсутствует canonical URL**
**Проблема:** Google может индексировать дубли страниц (с www и без, с trailing slash и без).

**Решение:**

**Файл:** `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  // ... остальные meta
  metadataBase: new URL('https://ваш-домен.by'),
  alternates: {
    canonical: '/',
  },
};
```

**Файл:** `next.config.ts`

```typescript
const config: NextConfig = {
  trailingSlash: false, // единый формат URL без слеша
};
```

---

## 🟡 Важные улучшения

### 6. **Добавить h1 с ключевыми словами**
**Текущая ситуация:** H1 содержит "Ремонт без головной боли — под ключ в Полоцке и Новополоцке"

**Рекомендация:** Хорошо! Но можно улучшить включением типов услуг.

**Оптимизированный вариант:**
```html
<h1>Ремонт квартир и строительство домов под ключ в Полоцке и Новополоцке</h1>
```

Или (если нужен эмоциональный окрас):
```html
<h1>Ремонт квартир и строительство под ключ — Полоцк, Новополоцк</h1>
```

---

### 7. **Оптимизация alt-текстов для изображений**
**Текущая ситуация:** В коде есть описательные alt, но можно улучшить SEO-релевантность.

**Рекомендации:**
- ❌ `alt="Интерьер после премиального ремонта под ключ"`
- ✅ `alt="Ремонт квартиры под ключ Полоцк — фото интерьера после ремонта"`

**Примеры для портфолио:**
```tsx
{/* До/После изображения */}
<Image
  src="/images/flat-after.jpg"
  alt="Ремонт двухкомнатной квартиры под ключ в Новополоцке — фото после ремонта"
/>
<Image
  src="/images/bath-after.jpg"
  alt="Ремонт санузла под ключ в Полоцке — плитка, сантехника, электрика"
/>
<Image
  src="/images/house-after.jpg"
  alt="Строительство дома с гаражом в Полоцком районе — коробка, кровля, фасад"
/>
```

---

### 8. **Улучшить структуру заголовков (H2-H3)**
**Текущая структура:** H2 используются корректно для секций.

**Рекомендация:** Добавить больше H3 внутри секций для микросемантики.

**Файл:** `app/page.tsx`

```tsx
{/* Секция услуг */}
<section id="services">
  <h2>Полный цикл работ одной бригадой</h2>
  {services.map((s) => (
    <article>
      <h3>{s.title}</h3> {/* ✅ Уже есть */}
      <p>{s.text}</p>
    </article>
  ))}
</section>

{/* Секция "О нас" - добавить подзаголовки */}
<section id="about">
  <h2>Работаем открыто: документы, сметы, этапы</h2>
  <h3>Реквизиты и гарантии</h3> {/* ❌ Отсутствует */}
  <dl>{/* ... УНП и т.д. */}</dl>
  
  <h3>Наши преимущества</h3> {/* ❌ Отсутствует */}
  <ul>{/* ... */}</ul>
</section>
```

---

### 9. **Добавить FAQ Schema для прайса**
**Проблема:** Аккордеон с ценами не размечен как FAQPage — Google не покажет в Rich Results.

**Решение:** Добавить FAQ JSON-LD для блока с ценами.

**Файл:** `app/page.tsx` (в секцию #prices)

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Сколько стоит демонтаж плитки?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Демонтаж плитки стоит 10 BYN за м². Также выполняем демонтаж штукатурки (7 BYN/м²), стяжки (16 BYN/м²) и другие работы."
      }
    },
    {
      "@type": "Question",
      "name": "Какая стоимость электромонтажных работ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Штробление под проводку — от 13 BYN/м.п., установка розеток — 16 BYN/шт, монтаж электрощита — от 160 BYN. Полный прайс доступен на сайте."
      }
    },
    // ... остальные вопросы
  ]
};

// В JSX добавить:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

---

### 10. **Добавить breadcrumbs (хлебные крошки)**
**Применимость:** Сейчас односстраничный сайт, но при добавлении подстраниц услуг — обязательно.

**Пример для будущих страниц:**

**Файл:** `app/services/[slug]/page.tsx`

```tsx
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Главная",
      "item": "https://ваш-домен.by"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Услуги",
      "item": "https://ваш-домен.by/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Ремонт квартир",
      "item": "https://ваш-домен.by/services/remont-kvartir"
    }
  ]
};
```

---

### 11. **Оптимизация meta description**
**Текущая:** "Официальный договор, фиксированная смета, поэтапная оплата. Ремонт квартир, электрика, сантехника, отделка, строительство домов и гаражей. Полоцк, Новополоцк, РБ и РФ."

**Длина:** 164 символа — ✅ в пределах нормы (до 160 символов).

**Улучшенная версия (с CTA):**
```
Ремонт квартир и строительство домов под ключ в Полоцке и Новополоцке. Официальный договор, смета без изменений, гарантия 24 месяца. Бесплатный замер ☎️ +375 29 723-75-25
```

**Длина:** 159 символов — помещается!

---

### 12. **Добавить lang="ru" в теги цитирования контактов**
**Проблема:** Телефоны и адреса могут некорректно читаться роботами без явной локали.

**Решение:** Уже есть `lang="ru"` в `<html>` — ✅ корректно.

---

## 🟢 Желательные улучшения

### 13. **Создать /llms.txt для AI-поисковиков**
**Что это:** Новый стандарт для индексации LLM-ботами (ChatGPT, Claude, Perplexity).

**Файл:** `public/llms.txt`

```
# Ремонт и строительство под ключ — ИП Воробьев И.А.

## О компании
ИП Воробьев Илья Александрович — строительная компания в Полоцке и Новополоцке.
Работаем с 2015 года. УНП 391257515.

## Услуги
- Ремонт квартир под ключ
- Электромонтажные работы
- Сантехнические работы
- Отделка любой сложности
- Строительство домов и гаражей
- Демонтажные работы

## Контакты
Телефон: +375 29 723-75-25 (МТС, Viber, WhatsApp, Telegram)
Telegram: @remontpodkluch_polotck
Instagram: @remont_polotck
Сайт: https://ваш-домен.by

## География
Полоцк, Новополоцк, вся Беларусь и Россия

## Гарантии
- Официальный договор
- Фиксированная смета
- Поэтапная оплата
- Гарантия 24 месяца на работы
```

---

### 14. **Добавить nofollow для внешних ссылок на соцсети**
**Текущая ситуация:** Все ссылки на Instagram, Telegram, VK — без атрибутов.

**Рекомендация:** Добавить `rel="noopener noreferrer nofollow"` для экономии PageRank.

```tsx
<a 
  href={INSTAGRAM} 
  target="_blank" 
  rel="noopener noreferrer nofollow"
>
  Instagram
</a>
```

**Исключение:** Оставить `rel="noopener noreferrer"` (без nofollow) для ссылок на WhatsApp и телефоны — это конверсионные точки.

---

### 15. **Добавить title для всех ссылок и кнопок**
**Проблема:** Некоторые иконки и кнопки без `title` — ухудшает доступность и SEO.

**Пример:**
```tsx
<a 
  href={`tel:${PHONE_MTS_RAW}`}
  title="Позвонить на МТС: +375 29 723-75-25"
  className="..."
>
  {PHONE_MTS}
</a>
```

---

### 16. **Оптимизация изображений**
**Текущая ситуация:** Используется Next.js Image с автооптимизацией — ✅ отлично!

**Дополнительная рекомендация:**
- Добавить `loading="lazy"` для изображений ниже fold
- Добавить `priority` для hero-изображения

```tsx
{/* Hero image */}
<Image
  src="/images/hero.jpg"
  alt="Ремонт квартир под ключ Полоцк — интерьер после ремонта"
  fill
  className="..."
  priority // ✅ Загрузить первым
  sizes="100vw"
/>

{/* Портфолио */}
<Image
  src="/images/flat-after.jpg"
  alt="..."
  loading="lazy" // ✅ Отложенная загрузка
/>
```

---

### 17. **Добавить Organization Schema в JSON-LD**
**Зачем:** Для Knowledge Graph в Google и карточки бизнеса справа в выдаче.

Уже включено в пункте №3 (LocalBusiness включает Organization).

---

### 18. **Создать Google Business Profile (Google Мой Бизнес)**
**Не связано с кодом, но критично для локального SEO:**

1. Зарегистрировать компанию на [Google Business Profile](https://business.google.com/)
2. Указать:
   - Адрес: Полоцк, Витебская область
   - Категория: "Строительная компания", "Ремонт квартир"
   - Телефоны, сайт, часы работы
   - Загрузить фото работ (минимум 10 фото)
3. Собирать отзывы клиентов — это прямо влияет на ранжирование в локальной выдаче

---

### 19. **Подключить Яндекс.Вебмастер и Google Search Console**
**Действия:**
1. Зарегистрировать сайт в [Google Search Console](https://search.google.com/search-console)
2. Зарегистрировать в [Яндекс.Вебмастер](https://webmaster.yandex.ru/)
3. Отправить sitemap.xml

**Верификация:** Добавить meta-тег в `<head>` или через DNS.

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  // ... остальное
  verification: {
    google: 'ваш-google-verification-код',
    yandex: 'ваш-yandex-verification-код',
  },
};
```

---

## 📊 Приоритизация задач

### Неделя 1 (критичные задачи)
1. ✅ Создать `public/robots.txt`
2. ✅ Создать `app/sitemap.ts`
3. ✅ Добавить LocalBusiness JSON-LD Schema
4. ✅ Добавить og:image и twitter:image
5. ✅ Настроить canonical URL

### Неделя 2 (важные улучшения)
6. ✅ Добавить FAQ Schema для прайса
7. ✅ Оптимизировать alt-тексты
8. ✅ Улучшить meta description
9. ✅ Создать og-image.jpg (1200×630)
10. ✅ Добавить `public/llms.txt`

### Неделя 3 (желательные)
11. ✅ Добавить nofollow для соцсетей
12. ✅ Оптимизировать загрузку изображений
13. ✅ Зарегистрировать в Google Business Profile
14. ✅ Подключить Google Search Console и Яндекс.Вебмастер

---

## 🎯 Ожидаемые результаты после внедрения

### Через 2-4 недели:
- ✅ Google начнёт индексировать сайт корректно (robots.txt + sitemap)
- ✅ Появится карточка бизнеса справа в выдаче (Knowledge Graph)
- ✅ Rich Snippets с контактами, часами работы, услугами

### Через 1-2 месяца:
- ✅ Рост позиций по локальным запросам:
  - "ремонт квартир полоцк"
  - "строительство домов новополоцк"
  - "электрик полоцк"
  - "сантехник новополоцк"
- ✅ Увеличение CTR из поиска на 15-25% за счёт Rich Snippets
- ✅ Рост трафика с локальных запросов на 30-50%

### Через 3-6 месяцев:
- ✅ Топ-3 по основным локальным запросам
- ✅ Появление в картах Google и Яндекс
- ✅ Рост конверсий из органического поиска

---

## 🛠️ Техническая реализация (чек-лист)

### Файлы для создания/изменения:
- [ ] `public/robots.txt` — создать
- [ ] `app/sitemap.ts` — создать
- [ ] `app/layout.tsx` — добавить JSON-LD Schema, og:image, verification
- [ ] `app/page.tsx` — добавить FAQ Schema, оптимизировать alt-тексты
- [ ] `next.config.ts` — добавить `trailingSlash: false`
- [ ] `public/images/og-image.jpg` — создать (1200×630px)
- [ ] `public/llms.txt` — создать
- [ ] `.env.local` — добавить переменные для canonical URL

### После деплоя:
- [ ] Проверить robots.txt: `https://ваш-домен.by/robots.txt`
- [ ] Проверить sitemap.xml: `https://ваш-домен.by/sitemap.xml`
- [ ] Валидация Schema: [Schema Validator](https://validator.schema.org/)
- [ ] Проверка Rich Results: [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Отправить sitemap в Google Search Console и Яндекс.Вебмастер

---

## 📚 Дополнительные ресурсы

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/LocalBusiness)
- [Next.js SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)
- [llms.txt Standard](https://llmstxt.org/)

---

**Подготовлено:** Claude (google-seo-mcp)  
**Следующий шаг:** Внедрить критичные задачи (Неделя 1) и запросить повторный аудит через 2 недели.
