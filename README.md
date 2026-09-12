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

## Заявки

Форма (`src/components/features/ContactForm.tsx`) отправляет POST-запрос на
адрес из `VITE_LEAD_WEBHOOK_URL` (n8n webhook или Formspree endpoint) и
дублирует заявку в `localStorage` браузера клиента.

Для GitHub Pages адрес прописывается как секрет репозитория
`LEAD_WEBHOOK_URL` (Settings → Secrets and variables → Actions) — workflow
подставляет его при сборке. Для локальной разработки — переменная в `.env`
(см. `.env.example`).

Если `VITE_LEAD_WEBHOOK_URL` не задан, заявки сохраняются только локально.

## Личный кабинет `/dashboard`

Приватный инструмент владельца — работает только на его машине (нужен
локальный WebSocket-мост к управляемому браузеру). На GitHub Pages эта часть
не функционирует, это ожидаемо.
