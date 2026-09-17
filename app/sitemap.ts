import type { MetadataRoute } from "next";
import { SITE_URL, OG_IMAGE_PATH } from "@/src/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const services: {
    path: string;
    priority: number;
    image: string;
  }[] = [
    { path: "/remont-pod-klyuch", priority: 1, image: "/images/hero-remont-pod-klyuch.jpg" },
    { path: "/remont-vannoj", priority: 0.9, image: "/images/hero-remont-vannoj.jpg" },
    { path: "/sruby", priority: 0.9, image: "/images/hero-sruby.jpg" },
    { path: "/zabory", priority: 0.9, image: "/images/hero-zabory.jpg" },
    { path: "/stroitelstvo", priority: 0.9, image: "/images/hero-stroitelstvo.jpg" },
    { path: "/santehnika", priority: 0.8, image: "/images/hero-santehnika.jpg" },
    { path: "/elektrika", priority: 0.8, image: "/images/hero-elektrika.jpg" },
    { path: "/otdelka", priority: 0.8, image: "/images/hero-otdelka.jpg" },
    { path: "/demontazh", priority: 0.7, image: "/images/hero-demontazh.jpg" },
  ];

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}${OG_IMAGE_PATH}`],
    },
    ...services.map((s) => ({
      url: `${SITE_URL}${s.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: s.priority,
      images: [`${SITE_URL}${s.image}`],
    })),
  ];
}
