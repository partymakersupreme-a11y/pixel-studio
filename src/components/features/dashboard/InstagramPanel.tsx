import { useEffect, useState } from "react";
import { ExternalLink, Info, Instagram, Lock, MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  instagramConfig,
  isReel,
  normalizePermalink,
  profileUrl,
} from "@/data/instagram";
import {
  fetchProfileStats,
  type InstagramConnectionState,
} from "@/lib/instagramGraph";

const EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";
const FEED_URL = "https://www.instagram.com/";
const DIRECT_INBOX_URL = "https://www.instagram.com/direct/inbox/";

/**
 * Панель Instagram в кабинете.
 *
 * Лента — штатный embed Meta: blockquote.instagram-media + embed.js.
 * Токен для этого не нужен, но работают только ПУБЛИЧНЫЕ посты и reels.
 *
 * Метрики (подписчики, охваты) через embed недоступны в принципе — они есть
 * только в Graph API. Пока Graph API не подключён, блок метрик честно
 * показывает «не подключено» и инструкцию. Никаких выдуманных цифр здесь нет.
 */
export default function InstagramPanel() {
  const { username, postUrls } = instagramConfig;
  // Ник и посты настраиваются независимо: с одним ником уже работают кнопки
  // и ссылка на профиль, сетка появляется когда добавлены ссылки на посты.
  const hasUsername = Boolean(username);
  const hasPosts = postUrls.length > 0;

  const [connection, setConnection] = useState<InstagramConnectionState | null>(
    null
  );

  // Состояние подключения Graph API (сейчас всегда «не подключено»)
  useEffect(() => {
    let alive = true;
    fetchProfileStats().then((state) => {
      if (alive) setConnection(state);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Загружаем embed.js один раз и просим его отрисовать blockquote'ы
  useEffect(() => {
    if (!hasPosts) return;

    const render = () => window.instgrm?.Embeds.process();
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT_SRC}"]`
    );

    if (existing) {
      // Скрипт уже был загружен ранее — просто перерисовываем
      render();
      return;
    }

    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = render;
    document.body.appendChild(script);
    // Скрипт намеренно не удаляем: он глобальный и переиспользуется
  }, [hasPosts, postUrls.length]);

  return (
    <Card id="instagram" className="scroll-mt-6">
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Instagram size={17} className="text-primary" />
            Instagram
          </CardTitle>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {hasUsername ? `@${username}` : "Панель ещё не настроена"}
          </p>
          <p className="mt-1 text-[0.7rem] leading-relaxed text-muted-foreground/70">
            Instagram запрещает открывать себя внутри других сайтов, поэтому
            лента показана постами, а вход и переписка — по кнопкам справа.
          </p>
        </div>

        {/*
          Instagram запрещает встраивать себя в iframe (X-Frame-Options /
          CSP frame-ancestors) — открыть ленту целиком и залогиниться внутри
          кабинета технически невозможно. Поэтому даём быстрые ссылки наружу.
        */}
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          {hasUsername && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={profileUrl(username)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Профиль
                <ExternalLink size={13} />
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <a
              href={DIRECT_INBOX_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={13} />
              Сообщения
            </a>
          </Button>
          <Button variant="gradient" size="sm" asChild>
            <a href={FEED_URL} target="_blank" rel="noopener noreferrer">
              <Instagram size={13} />
              Открыть Instagram
            </a>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Метрики: честное состояние ── */}
        <div className="rounded-lg border border-amber-500/25 bg-amber-500/8 p-5">
          <div className="flex items-start gap-3">
            <Lock size={16} className="mt-0.5 shrink-0 text-amber-400" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">
                  Метрики не подключены
                </span>
                <Badge variant="warning">Graph API</Badge>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {connection?.status === "not_configured"
                  ? connection.reason
                  : "Проверяю состояние подключения…"}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Подписчиков, охваты и показы отдаёт только Instagram Graph API.
                Instagram Basic Display API выключен 4 декабря 2024 года, а
                встраивание постов ниже работает без токена и метрик не даёт.
                Что нужно сделать для включения — в README, раздел
                «Instagram: как включить настоящие метрики».
              </p>
            </div>
          </div>
        </div>

        {/* ── Лента ── */}
        {hasPosts ? (
          <div className="max-h-[46rem] overflow-y-auto pr-1 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {postUrls.map((url) => {
              const permalink = normalizePermalink(url);
              return (
                <div key={permalink} className="min-w-0">
                  <div className="label-uppercase mb-2 text-[0.5rem] text-muted-foreground">
                    {isReel(permalink) ? "Reel" : "Пост"}
                  </div>
                  {/*
                    Разметку ниже embed.js заменяет на свой iframe.
                    Ключевое — класс instagram-media и data-instgrm-permalink.
                  */}
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={permalink}
                    data-instgrm-version="14"
                    style={{
                      background: "hsl(232 18% 14%)",
                      border: "1px solid hsl(232 14% 22%)",
                      borderRadius: 12,
                      margin: 0,
                      maxWidth: "100%",
                      minWidth: 0,
                      padding: 0,
                      width: "100%",
                    }}
                  >
                    <a
                      href={permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-5 text-sm text-muted-foreground"
                    >
                      Открыть публикацию в Instagram
                    </a>
                  </blockquote>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-border/70 bg-elevated/40 p-6">
            <div className="flex items-start gap-3">
              <Info size={16} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  {hasUsername
                    ? "Осталось добавить посты"
                    : "Как включить ленту"}
                </p>
                <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {!hasUsername && (
                    <li>
                      Впишите ник в{" "}
                      <code className="font-mono text-xs text-foreground">username</code>{" "}
                      в файле{" "}
                      <code className="font-mono text-xs text-foreground">src/data/instagram.ts</code>
                    </li>
                  )}
                  <li>
                    1. В Instagram откройте нужный пост → «…» → «Копировать ссылку»
                  </li>
                  <li>
                    2. Вставьте её в массив{" "}
                    <code className="font-mono text-xs text-foreground">postUrls</code>{" "}
                    в файле{" "}
                    <code className="font-mono text-xs text-foreground">src/data/instagram.ts</code>
                  </li>
                  <li>3. Повторите для тех постов, что хотите видеть в кабинете</li>
                </ol>
                <p className="mt-4 text-xs text-muted-foreground">
                  Встраиваются только публичные посты и reels — если аккаунт
                  закрыт, Instagram отдаст пустой блок.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
