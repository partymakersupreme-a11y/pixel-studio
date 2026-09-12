# Pixel Studio — сайт-визитка

Стек: Vite + React 18 + TypeScript + Tailwind + shadcn/ui + framer-motion.

## Запуск

```
npm install
npm run dev
```

Сборка продакшена — `npm run build`, посмотреть результат — `npm run preview`.

## Деплой

Пушится в `main` → GitHub Actions (`.github/workflows/deploy.yml`) собирает и
публикует на GitHub Pages автоматически.

## Где править контент

| Файл | Что внутри |
| --- | --- |
| `src/data/services.ts` | Список услуг |
| `src/data/cases.ts` | Кейсы портфолио |

## Заявки — как подключить приём (Formspree)

Форма (`src/components/features/ContactForm.tsx`) отправляет POST-запрос на
адрес из `VITE_LEAD_WEBHOOK_URL` и дублирует заявку в `localStorage` браузера
клиента. Пока переменная не задана — заявки видно только локально, до
владельца они не доходят.

Самый простой рабочий вариант — [Formspree](https://formspree.io) (бесплатный
тариф хватает с запасом):

1. Зарегистрироваться на formspree.io, подтвердить почту.
2. Создать новую форму (New Form) — Formspree выдаст endpoint вида
   `https://formspree.io/f/xxxxxxxx`.
3. Добавить его как секрет репозитория: **Settings → Secrets and variables →
   Actions → New repository secret**, имя `LEAD_WEBHOOK_URL`, значение —
   этот endpoint.
4. Перезапустить деплой (**Actions → Deploy to GitHub Pages → Run workflow**,
   либо просто запушить любой коммит) — сборка подставит секрет в бандл.

После этого заявки будут приходить на почту, привязанную к аккаунту
Formspree, и видны в его личном кабинете (там же история всех заявок).

Для локальной разработки тот же endpoint кладётся в `.env` как
`VITE_LEAD_WEBHOOK_URL` (см. `.env.example`).

## Личный кабинет `/dashboard`

Приватный инструмент владельца — работает только на его машине (нужен
локальный WebSocket-мост к управляемому браузеру). На GitHub Pages эта часть
не функционирует, это ожидаемо.
