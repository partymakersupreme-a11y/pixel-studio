/**
 * ЗАГОТОВКА под Instagram Graph API. Сейчас НЕ ПОДКЛЮЧЕНА и намеренно
 * возвращает состояние «не подключено» — никаких выдуманных цифр.
 *
 * ПОЧЕМУ ТАК:
 *   Instagram Basic Display API окончательно выключен 4 декабря 2024 года.
 *   Метрики профиля (подписчики, охваты, показы) и лента доступны только
 *   через Instagram Graph API / Instagram API with Instagram Login, и только
 *   для Business- или Creator-аккаунта, привязанного к приложению в Meta.
 *
 *   Встраивание отдельных ПУБЛИЧНЫХ постов и reels через blockquote +
 *   //www.instagram.com/embed.js токена не требует — именно так сейчас
 *   работает InstagramPanel.
 *
 * ЧТОБЫ ВКЛЮЧИТЬ НАСТОЯЩИЕ МЕТРИКИ — пошаговая инструкция в README.md,
 * раздел «Instagram: как включить настоящие метрики».
 *
 * ВАЖНО: долгоживущий токен нельзя класть в этот файл и вообще во фронтенд —
 * он попадёт в бандл и станет публичным. Запрос к Graph API должен уходить
 * с сервера (см. предложенный прокси-эндпоинт в README).
 */

export interface InstagramProfileStats {
  username: string;
  followersCount: number;
  followsCount: number;
  mediaCount: number;
  /** Охват за последние 28 дней, если доступен */
  reach28d?: number;
}

export interface InstagramMediaItem {
  id: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  likeCount?: number;
  commentsCount?: number;
}

export type InstagramConnectionState =
  | { status: "not_configured"; reason: string }
  | { status: "connected"; stats: InstagramProfileStats }
  | { status: "error"; reason: string };

/**
 * Адрес серверного прокси, который держит токен у себя.
 * Пока пусто — панель показывает «не подключено».
 *
 * TODO(владелец): указать VITE_INSTAGRAM_PROXY_URL в .env, когда появится
 * бэкенд-эндпоинт (например /api/instagram/stats).
 */
const PROXY_URL = "";

/**
 * Заглушка. Когда появится прокси — заменить тело на реальный fetch:
 *
 *   const res = await fetch(`${PROXY_URL}/stats`);
 *   if (!res.ok) return { status: "error", reason: `HTTP ${res.status}` };
 *   return { status: "connected", stats: await res.json() };
 */
export async function fetchProfileStats(): Promise<InstagramConnectionState> {
  if (!PROXY_URL) {
    return {
      status: "not_configured",
      reason:
        "Graph API не подключён: нужен Business/Creator-аккаунт, приложение в Meta и серверный прокси с токеном.",
    };
  }
  return {
    status: "error",
    reason: "Прокси указан, но обработчик ещё не реализован.",
  };
}

/**
 * Заглушка ленты. Реальный вызов пойдёт на тот же прокси:
 *   GET `${PROXY_URL}/media` → InstagramMediaItem[]
 *
 * Пока лента в кабинете собирается из ссылок в src/data/instagram.ts
 * через штатный embed, которому токен не нужен.
 */
export async function fetchRecentMedia(): Promise<InstagramMediaItem[]> {
  return [];
}
