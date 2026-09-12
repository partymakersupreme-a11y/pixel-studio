/**
 * ⚠️ ВНИМАНИЕ: ЭТО НЕ БЕЗОПАСНО.
 *
 * Пароль сравнивается прямо в браузере, а VITE_-переменные Vite подставляет
 * в бандл как обычный текст. Любой человек откроет DevTools → Sources, найдёт
 * строку и войдёт. Это заглушка, чтобы кабинет было видно на демо, а не защита.
 *
 * Для настоящей защиты нужен бэкенд. Самый быстрый путь — Supabase Auth:
 * точки подстановки помечены ниже как TODO(auth). Подробности в README,
 * раздел «Логин: почему это не защита».
 */

const AUTH_KEY = "sozdatel_auth";

/** Пароль по умолчанию для разработки. Переопределяется VITE_ADMIN_PASSWORD. */
const DEV_PASSWORD = "sozdatel2026";

function expectedPassword(): string {
  return import.meta.env.VITE_ADMIN_PASSWORD || DEV_PASSWORD;
}

export interface AuthResult {
  ok: boolean;
  error?: string;
}

/**
 * TODO(auth): заменить на реальную проверку, например:
 *   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
 *   if (error) return { ok: false, error: "Неверный пароль" };
 *   return { ok: true };
 * После этого localStorage-флаг ниже станет не нужен — сессию держит Supabase.
 */
export async function signIn(password: string): Promise<AuthResult> {
  if (!password) {
    return { ok: false, error: "Введите пароль" };
  }
  if (password !== expectedPassword()) {
    return { ok: false, error: "Неверный пароль" };
  }
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ at: Date.now() }));
  } catch {
    /* storage недоступен — вход не переживёт перезагрузку */
  }
  return { ok: true };
}

/**
 * TODO(auth): при переходе на Supabase — проверять сессию:
 *   const { data } = await supabase.auth.getSession();
 *   return Boolean(data.session);
 */
export function isAuthenticated(): boolean {
  try {
    return Boolean(localStorage.getItem(AUTH_KEY));
  } catch {
    return false;
  }
}

/** TODO(auth): supabase.auth.signOut() */
export function signOut(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {
    /* storage недоступен */
  }
}

/** Показывается на странице входа — только для дефолтного пароля. */
export function isUsingDefaultPassword(): boolean {
  return !import.meta.env.VITE_ADMIN_PASSWORD;
}

export { DEV_PASSWORD };
