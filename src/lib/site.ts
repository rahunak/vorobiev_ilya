const FALLBACK_SITE_URL = "https://komfortremont.by";

function normalizeUrl(value: string) {
  return value.trim().replace(/\/+$/, "");
}

/**
 * Канонический URL сайта без завершающего слеша.
 * Задаётся через NEXT_PUBLIC_SITE_URL (см. .env.example);
 * до настройки используется FALLBACK_SITE_URL — замените его на боевой домен.
 */
export const SITE_URL = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL,
);

export const SITE_NAME = "ИП Воробьев И.А. — ремонт и строительство";

// ~78 символов — ключи впереди («ремонт квартир», «строительство домов»),
// город продублирован в «Полоцк/Новополоцк» для гео-запросов.
export const SITE_TITLE =
  "Ремонт квартир и строительство домов под ключ в Полоцке — ИП Воробьев И.А.";

// ~158 символов: услуги + города, УТП (договор, фиксированная смета, гарантия),
// призыв к действию и телефон — всё, что показывается в сниппете выдачи.
export const SITE_DESCRIPTION =
  "Ремонт квартир, домов и строительство под ключ в Полоцке и Новополоцке. Договор с фиксированной сметой, гарантия 24 месяца. Бесплатный замер — звоните: +375 29 723-75-25";

export const OG_IMAGE_PATH = "/images/og-image.jpg";
