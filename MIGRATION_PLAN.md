# План миграции Vite + TanStack Start → Next.js 15

## Исходные данные

**Источник:** `vorobiev-premium-build-main` (Vite + TanStack Start)
**Цель:** `vorobiev_nextjs` (Next.js 15 App Router)

## Статус: В работе

## Задачи миграции

### ✅ 1. Подготовка

- [x] Папка `src/` скопирована из Vite проекта
- [ ] Установить недостающие зависимости
- [ ] Настроить TypeScript и конфигурационные файлы

### 📦 2. Установка зависимостей

**Radix UI компоненты:**
```bash
bun add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio
bun add @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible
bun add @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu
bun add @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar
bun add @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress
bun add @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select
bun add @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot
bun add @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle
bun add @radix-ui/react-toggle-group @radix-ui/react-tooltip
```

**Остальные UI библиотеки:**
```bash
bun add class-variance-authority clsx cmdk date-fns embla-carousel-react
bun add input-otp lucide-react react-day-picker react-hook-form
bun add react-resizable-panels recharts sonner tailwind-merge vaul
```

**Формы и валидация:**
```bash
bun add @hookform/resolvers zod
```

**Dev зависимости (если нужны):**
```bash
bun add -d prettier eslint-config-prettier eslint-plugin-prettier
```

### 🏗️ 3. Структура проекта Next.js

```
vorobiev_nextjs/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (заменяет __root.tsx)
│   ├── page.tsx                 # Главная страница (из routes/index.tsx)
│   ├── globals.css              # Глобальные стили (из styles.css)
│   └── not-found.tsx            # 404 страница
├── src/
│   ├── components/              # UI компоненты
│   │   ├── ui/                  # shadcn/ui компоненты
│   │   └── site/                # Кастомные компоненты (Reveal, BeforeAfter)
│   ├── lib/                     # Утилиты
│   │   └── utils.ts             # cn() и другие хелперы
│   ├── hooks/                   # React хуки
│   └── assets/                  # Изображения
├── public/                       # Статические файлы
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

### 🔄 4. Миграция файлов

#### 4.1 Root Layout (app/layout.tsx)
- [ ] Мигрировать `__root.tsx` → `app/layout.tsx`
- [ ] Убрать TanStack Router специфику
- [ ] Добавить метатеги из head()
- [ ] Подключить шрифты Google Fonts
- [ ] Добавить Toaster для уведомлений

#### 4.2 Главная страница (app/page.tsx)
- [ ] Мигрировать `routes/index.tsx` → `app/page.tsx`
- [ ] Убрать `createFileRoute` и TanStack Router импорты
- [ ] Добавить `export const metadata` для SEO
- [ ] Сделать компонент Server Component по умолчанию
- [ ] Обернуть интерактивные части в 'use client' если нужно

#### 4.3 Глобальные стили
- [ ] Мигрировать `src/styles.css` → `app/globals.css`
- [ ] Проверить CSS-переменные и Tailwind конфигурацию

#### 4.4 Компоненты
- [ ] Перенести все из `src/components/` без изменений
- [ ] Убедиться что пути импортов работают (`@/components/...`)

#### 4.5 Утилиты и хуки
- [ ] Перенести `src/lib/` (utils.ts и другие)
- [ ] Перенести `src/hooks/`

#### 4.6 Изображения
- [ ] Переместить изображения из `src/assets/` в `public/images/`
- [ ] Обновить импорты изображений для Next.js
- [ ] Использовать `next/image` вместо `<img>`

### 🗑️ 5. Удалить файлы специфичные для Vite/TanStack

- [ ] Удалить `src/router.tsx`
- [ ] Удалить `src/routeTree.gen.ts`
- [ ] Удалить `src/server.ts`
- [ ] Удалить `src/start.ts`
- [ ] Удалить `src/routes/` (контент перенесен в app/)
- [ ] Удалить `src/lib/lovable-error-reporting.ts` (если есть)

### ⚙️ 6. Конфигурация

#### 6.1 TypeScript (tsconfig.json)
- [ ] Обновить paths для алиасов
- [ ] Убедиться что `@/*` указывает на `./src/*`

#### 6.2 Tailwind CSS
- [ ] Создать `tailwind.config.ts` из Vite конфигурации
- [ ] Проверить что CSS переменные корректны
- [ ] Добавить кастомные цвета (bronze, ink, chalk и т.д.)

#### 6.3 Next.js (next.config.ts)
- [ ] Настроить обработку изображений
- [ ] Добавить webpack алиасы если нужно

### 🐛 7. Исправление специфичных для Next.js проблем

#### 7.1 Client Components
- [ ] Добавить 'use client' где используется:
  - useState, useEffect и другие React хуки
  - event handlers (onClick, onChange и т.д.)
  - Browser APIs (window, document)
  - Компоненты форм с интерактивностью

#### 7.2 Image Optimization
- [ ] Заменить `<img>` на `<Image>` из `next/image`
- [ ] Добавить width/height для изображений
- [ ] Настроить loader для статических импортов

#### 7.3 Metadata и SEO
- [ ] Перенести head() метаданные в export const metadata
- [ ] Настроить динамические метатеги если нужно

### 🧪 8. Тестирование

- [ ] `bun dev` - проверить запуск dev сервера
- [ ] Проверить главную страницу
- [ ] Проверить все секции:
  - [ ] Hero
  - [ ] Services
  - [ ] Prices
  - [ ] About
  - [ ] Portfolio (фильтрация)
  - [ ] Form (валидация)
  - [ ] Contacts
  - [ ] Mobile navigation
- [ ] Проверить responsive дизайн
- [ ] Проверить анимации (Reveal, transitions)
- [ ] Проверить Before/After слайдер
- [ ] Проверить форму отправки заявки
- [ ] `bun build` - проверить production build

### 🚀 9. Финализация

- [ ] Удалить неиспользуемые файлы
- [ ] Обновить README.md
- [ ] Commit изменений в git

## Критические моменты

1. **Client vs Server Components:** Форма и интерактивные элементы должны быть Client Components
2. **Image paths:** В Next.js изображения из public/ доступны напрямую через `/images/...`
3. **CSS Variables:** Проверить что все кастомные цвета работают
4. **Animations:** Tailwind анимации должны работать без изменений
5. **Fonts:** Google Fonts должны быть оптимизированы через next/font

## Следующий шаг

Начать с установки зависимостей.
