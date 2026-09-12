/**
 * Конфиг Instagram-панели в кабинете.
 *
 * ЧТО НУЖНО ЗАПОЛНИТЬ ВЛАДЕЛЬЦУ:
 *   1. username — свой ник без «@»
 *   2. postUrls — ссылки на посты/reels, которые показывать сеткой
 *
 * Ссылку взять просто: открыть пост → «…» → «Копировать ссылку».
 * Работают только ПУБЛИЧНЫЕ посты и reels — приватный аккаунт не встроится.
 */

export interface InstagramConfig {
  /** Ник без «@». Пустая строка = панель покажет «не настроено». */
  username: string;
  /** Ссылки на публичные посты или reels. */
  postUrls: string[];
}

export const instagramConfig: InstagramConfig = {
  username: "1n.spector",

  // TODO(владелец): вставить свои ссылки вида
  //   "https://www.instagram.com/p/XXXXXXXXXXX/"
  //   "https://www.instagram.com/reel/XXXXXXXXXXX/"
  // Пока список пуст — панель показывает профиль и кнопки, но без сетки постов.
  postUrls: [],
};

/** Ссылка на профиль — нужна для кнопки «Открыть профиль». */
export function profileUrl(username: string): string {
  return `https://www.instagram.com/${username.replace(/^@/, "")}/`;
}

/**
 * Приводит ссылку к пермалинку, который понимает embed.js:
 * без query-параметров, со слэшем на конце.
 */
export function normalizePermalink(url: string): string {
  const clean = url.split("?")[0].replace(/\/+$/, "");
  return `${clean}/`;
}

/** Отличает reel от обычного поста — только для подписи в карточке. */
export function isReel(url: string): boolean {
  return /\/reels?\//.test(url);
}
