import type { NextConfig } from "next";

// Security-заголовки (аудит, категория «Security») + кэш для статики
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // GSC «Страница с переадресацией»: единый канонический хост.
  // www-поддомен резолвится в Vercel, но его сертификат покрывает только
  // apex-домен, поэтому HTTPS-цепочка там рвётся. Гарантируем 308
  // www → apex на уровне приложения, независимо от DNS-настройки хостинга.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.komfortremont.by" }],
        destination: "https://komfortremont.by/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // Долгий кэш для статических ассетов с хешем в имени
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
