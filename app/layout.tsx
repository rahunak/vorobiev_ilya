import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/src/components/ui/sonner";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
} from "@/src/lib/site";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ogImageUrl = `${SITE_URL}${OG_IMAGE_PATH}`;

export const viewport: Viewport = {
  themeColor: "#171511",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "ремонт квартир Полоцк",
    "ремонт квартир Новополоцк",
    "ремонт под ключ Полоцк",
    "строительство домов Полоцк",
    "строительство домов под ключ Беларусь",
    "отделочные работы Полоцк",
    "электромонтажные работы Полоцк",
    "сантехнические работы Полоцк",
    "демонтажные работы Полоцк",
    "ремонт квартир цена Полоцк",
    "строительная компания Витебская область",
  ],

  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: "Ремонт и строительство под ключ — ИП Воробьев И.А.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [ogImageUrl],
  },  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  formatDetection: { telephone: true, address: true },
  category: "construction",
  icons: {
    icon: "/favicon.ico",
  },
};

// Schema.org — см. docs/SEO_RECOMMENDATIONS.md, п. 3 и 17
const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "ИП Воробьев Илья Александрович",
  alternateName: "ИП Воробьев И.А.",
  description:
    "Ремонт и строительство под ключ в Полоцке и Новополоцке. Официальный договор, фиксированная смета, поэтапная оплата.",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  image: ogImageUrl,
  telephone: "+375297237525",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Полоцк",
    addressRegion: "Витебская область",
    addressCountry: "BY",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "55.4879",
    longitude: "28.7619",
  },
  areaServed: [
    { "@type": "City", name: "Полоцк" },
    { "@type": "City", name: "Новополоцк" },
    { "@type": "Country", name: "Беларусь" },
    { "@type": "Country", name: "Россия" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/remont_polotck",
    "https://t.me/remontpodkluch_polotck",
    "https://t.me/RemontPodKlyuchPolotsk",
    "https://vk.com/remontstroipolotck",
  ],
  knowsAbout: [
    "Ремонт квартир под ключ",
    "Строительство домов под ключ",
    "Электромонтажные работы",
    "Сантехнические работы",
    "Отделочные работы",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Услуги ремонта и строительства",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ремонт квартир под ключ",
          description: "Полный цикл ремонтных работ от демонтажа до чистовой отделки",
          url: `${SITE_URL}/`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ремонт ванной и санузла под ключ",
          description: "Демонтаж, гидроизоляция, плитка, сантехника и электрика в санузле",
          url: `${SITE_URL}/remont-vannoj`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Сантехнические работы",
          description: "Замена труб и стояков, установка сантехники, тёплые полы, котлы",
          url: `${SITE_URL}/santehnika`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Электромонтажные работы",
          description: "Замена проводки, штробление, сборка электрощитов, освещение",
          url: `${SITE_URL}/elektrika`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Отделочные работы",
          description: "Штукатурка по маякам, шпаклевка, обои, плитка, стяжка, потолки",
          url: `${SITE_URL}/otdelka`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Срубы ручной рубки",
          description: "Срубы бань и домов в русскую и канадскую чашу, лафет",
          url: `${SITE_URL}/sruby`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Заборы и ворота под ключ",
          description: "Профлист, металлопрофиль, 3D-секции, ворота и калитки",
          url: `${SITE_URL}/zabory`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Строительство домов и гаражей под ключ",
          description: "Фундамент, коробка, кровля, фасад, инженерия и отделка",
          url: `${SITE_URL}/stroitelstvo`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Демонтажные работы",
          description: "Демонтаж отделки и перегородок, резка проёмов, вывоз мусора",
          url: `${SITE_URL}/demontazh`,
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
