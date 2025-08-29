# big-react-app — учебно‑боевой монорепозиторий фронтенда

Полная конфигурация проекта «с нуля»: Webpack + React + TypeScript + Babel + SCSS/CSS‑modules + Vite + Prettier + ESlint/Stylelint. С нуля настроены **юнит/компонентные/e2e‑тесты** (Jest, React Testing Library, Storybook + Loki, Cypress), CI/CD, pre‑commit хуки, динамические редьюсеры, i18n, темизация и обширная библиотека UI‑компонентов.

> Проект задуман как «большое реальное приложение», в котором собраны современные практики архитектуры, производительности и DX.

---

## Содержание

* [Демо и скриншоты](#демо-и-скриншоты)
* [Технологии](#технологии)
* [Быстрый старт](#быстрый-старт)
* [Скрипты](#скрипты)
* [Переменные окружения](#переменные-окружения)
* [Структура проекта](#структура-проекта)
* [Архитектура и подходы](#архитектура-и-подходы)
* [UI‑библиотека](#ui-библиотека)
* [Тестирование](#тестирование)
* [Оптимизация производительности](#оптимизация-производительности)
* [i18n](#i18n)
* [Линтинг и форматирование](#линтинг-и-форматирование)
* [Codegen (Plop)](#codegen-plop)
* [CI/CD](#cicd)
* [Mock API / JSON‑Server](#mock-api--json-server)
* [Деплой и Nginx](#деплой-и-nginx)
* [Roadmap](#roadmap)

---

## Демо и скриншоты



---

## Технологии

**Базис:** React 18, TypeScript, Webpack 5, Vite (альтернативная сборка), Babel.

**Стили:** SCSS + CSS Modules, три темы (светлая/тёмная/оранжевая), дизайн‑токены и переменные CSS.

**Состояние и данные:** Redux Toolkit (slices, async thunks), **динамическая подгрузка редьюсеров** (reducer manager), RTK Query, axios‑инстанс, нормализация через `createEntityAdapter`.

**Тесты:** Jest (юнит), React Testing Library (компоненты), Storybook + Loki (скриншотные), Cypress (e2e).

**Инструменты DX:** ESlint + **кастомный eslint‑плагин** для архитектурных правил, Stylelint, Prettier, Husky (pre‑commit), commit hooks, Webpack Bundle Analyzer.

**i18n:** i18next, lazy‑загрузка namespace‑ов, babel‑плагин авто‑экстракции ключей (генерация в `/extractedTranslations`).

**Автоматизация:** Plop‑генераторы фич/сущностей, скрипты для AST‑рефакторинга.

**Сервер/инфра:** JSON‑Server для моков, Nginx‑конфиг для прод‑деплоя.

---

## Быстрый старт

1. Установите зависимости:

```bash
# рекомендуемый менеджер — yarn
yarn
# или npm
npm ci
```

2. Создайте `.env` (см. пример ниже).
3. Запустите dev‑сервер:

```bash
yarn dev        # webpack‑dev‑server (по умолчанию http://localhost:3000)
```

4. Откройте Storybook:

```bash
yarn storybook  # http://localhost:6006
```

> **Node.js ≥ 18** рекомендуется. Если будут несовпадения, уточните версии в `package.json`.

---

## Скрипты

> Названия могут немного отличаться — смотрите `package.json`. Ниже — типовой набор и назначение.

```bash
# Запуск/сборка приложения
yarn dev                 # старт dev‑сервера (Webpack)
yarn build:dev           # сборка dev
yarn build:prod          # сборка prod (минимизация, чанк‑сплиттинг)
yarn analyze             # анализ бандла (webpack-bundle-analyzer)

# Storybook и скриншотные тесты (Loki)
yarn storybook           # запуск Storybook
yarn build-storybook     # сборка Storybook статикой
yarn loki:test           # прогон визуальных регрессионных тестов
yarn loki:approve        # апрув новых эталонов

# Юнит/RTL и e2e
yarn test                # юнит‑тесты (Jest)
yarn test:watch          # юнит‑тесты в watch‑режиме
yarn test:ui             # компонентные тесты (RTL)
yarn cypress:open        # интерактивный Cypress
yarn cypress:run         # headless‑запуск e2e

# Линтинг/форматирование
yarn lint                # eslint (TS/TSX)
yarn lint:fix            # eslint с автофиксами
yarn stylelint           # проверка стилей
yarn stylelint:fix       # автофиксы стилей
yarn format              # prettier

# Локальный Mock API
yarn json:server         # поднять json‑server (см. json-server/db.json)

# i18n
yarn i18n:extract        # извлечение ключей переводов из кода (babel‑плагин)

# Генераторы
yarn generate            # Plop‑генераторы фич/сущностей/виджетов
```

---

## Переменные окружения

Создайте файл `.env` в корне проекта. Часто используются:

```dotenv
# Порты/режимы
PORT=3000
NODE_ENV=development # или production
PROJECT=frontend     # имя проекта/пресета

# API/моки
API_URL=http://localhost:8000
USE_MOCKS=true

# Флаги сборки
ENABLE_ANALYZE=false
```

> Точный список и дефолты смотрите в конфиге сборки (`/config`) и скриптах (`/scripts`).

---

## Структура проекта

```
.big-react-app
├─ .github/workflows/           # CI пайплайны
├─ .husky/                      # pre-commit хуки
├─ .loki/                       # эталоны скриншотных тестов
├─ config/                      # конфигурация сборки (webpack/vite/env)
├─ extractedTranslations/       # авто‑собранные ключи i18n
├─ json-server/                 # моки API (db.json, маршруты)
├─ plop-templates/              # шаблоны кодогенерации
├─ public/                      # статические ассеты
├─ scripts/                     # служебные скрипты/cli
├─ src/
│  ├─ app/                      # инициализация приложения (роутинг, провайдеры)
│  ├─ pages/                    # страницы (лениво грузятся)
│  ├─ widgets/                  # крупные композиции из фич/сущностей
│  ├─ features/                 # фичи (логика + UI)
│  ├─ entities/                 # бизнес‑сущности (User, Article, Comment, ...)
│  ├─ shared/                   # переиспользуемые модули: ui, lib, api, config
│  └─ index.tsx                 # точка входа
├─ babel.config.json
├─ tsconfig.json
├─ webpack.config.ts
├─ plopfile.js
└─ package.json
```

---

## Архитектура и подходы

* **Слоистая структура** в духе Feature‑Sliced Design: `shared` → `entities` → `features` → `widgets` → `pages` → `app`.
* **Слабое зацепление, сильная связность:** каждый слой импортирует только «вниз». Кросс‑импорты ограничиваются публичными API модулей.
* **Переиспользование:** публичные интерфейсы модулей (`index.ts`) и стабильные алиасы через `tsconfig`.
* **Изоляция:**

  * динамическая инъекция редьюсеров (reducer manager) на уровне страниц/фич;
  * ленивые страницы/фичи для **code‑splitting**;
  * инъекция RTK‑эндпоинтов «по требованию», чтобы сохранять минимальный бандл.
* **Нормализация данных:** `createEntityAdapter`; селекторы построены через `createSelector`.
* **Обработка ошибок:** `ErrorBoundary` + fallback UI, централизованный `Axios` перехватчик.
* **Роутинг:** `react-router-dom v6`, защищённые маршруты по ролям/авторизации.

---

## UI‑библиотека

> 20+ компонентов: модальные окна (порталы), дропдауны/меню, сайдбар, кнопки с темами, скелетоны, попапы, ленивые изображения, drawer, аватары, вертикальные/горизонтальные стеки и др.

**Принципы:**

* семантика и доступность (ARIA‑атрибуты, focus‑trap);
* «headless‑подход»: часть компонентов построена на безголовых библиотеках, часть — полностью кастом;
* строгий публичный API каждого компонента + сторис и тесты для всех состояний.

---

## Тестирование

* **Unit (Jest):** функции, селекторы, редьюсеры, async‑thunks.
* **RTL:** рендер компонентов, мок роутера/хранилища, снэпшоты.
* **Storybook + Loki:** визуальные регрессионные тесты; отчёты и апрув эталонов в CI.
* **Cypress (e2e):** сценарии «сквозь весь стек»: авторизация, фильтры, сортировки, бесконечные ленты, комментарии и т.п.

**Полезные команды:** см. раздел [Скрипты](#скрипты). В CI прогоняется три набора тестов + линтеры + сборки приложения и сторибука.

---

## Оптимизация производительности

* контроль **перерисовок**: `React.memo`, `useMemo/useCallback`, разбиение пропов;
* **асинхронные компоненты/редьюсеры**, изоляция модулей;
* **bundle‑analyzer**, треш‑шейкинг, кэш‑группы, prefetch/preload;
* `throttle`/`debounce` для сетевых и UI‑ивентов;
* «ленивая» подгрузка тяжёлых библиотек (анимации, DnD) только на нужных экранах.

---

## i18n

* i18next с **lazy‑namespaces**;
* plural‑формы и ICU‑подходы (где нужно);
* babel‑плагин, автоматически извлекающий ключи переводов в JSON (см. `/extractedTranslations`).

---

## Линтинг и форматирование

* **ESlint** (TS/React) + **кастомный архитектурный плагин** с автофиксом правил (изоляция модулей, доступ к слоям, алиасы);
* **Stylelint** для SCSS/CSS‑modules;
* **Prettier** — единый стиль кода;
* **Husky** — pre‑commit хуки (линтеры/тесты/типчек по необходимости).

---

## Codegen (Plop)

* CLI‑генераторы для `feature/entity/widget/page` с готовой FSD‑структурой, тестами, сторис и стилями;
* возможность расширять шаблоны в `/plop-templates`.

Пример:

```bash
yarn generate
# далее выбрать: feature / entity / widget / page ...
```

---

## CI/CD

* GitHub Actions: lint → unit/rtl/loki → build app/storybook → публикация отчётов/превью;
* артефакты: отчёты юнит/скриншотных тестов;
* возможность автопубликации Storybook на GitHub Pages.

> Проверьте имя workflow‑файла и включите «Badges» в шапке README.

---

## Mock API / JSON‑Server

Локальные моки для быстрой разработки.

```bash
yarn json:server
# по умолчанию: http://localhost:8000, источник: json-server/db.json
```

Можно проксировать запросы через dev‑сервер Webpack, чтобы избежать CORS.

---

## Деплой и Nginx

Пример конфига:

```nginx
server {
  listen 80;
  server_name your.domain.com;

  root /var/www/app;
  index index.html;

  location / {
    try_files $uri /index.html;
  }

  # прокси для API
  location /api/ {
    proxy_pass http://localhost:8000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  gzip on;
  gzip_types text/plain application/javascript text/css application/json image/svg+xml;
}
```

---

## Roadmap

* [x] Webpack 5 + React 18 + TS
* [x] Vite как альтернативная сборка
* [x] 3 темы UI
* [x] Динамические редьюсеры / RTK Query endpoints injection
* [x] Storybook + Loki / Jest + RTL / Cypress
* [x] CI + Husky
* [ ] SSR/Streaming (рассмотреть)
* [ ] Мобильные рендеры по user‑agent (вариативные компоненты)
* [ ] Улучшенная аналитика бандла/статистика импортов
* [ ] Автоудаление legacy‑дизайна скриптом

---


