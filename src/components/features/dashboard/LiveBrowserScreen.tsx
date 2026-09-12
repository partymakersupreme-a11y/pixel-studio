import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

const BRIDGE_PORT = 3724;

type BridgeStatus = "connecting" | "streaming" | "error";

interface FrameMetadata {
  deviceWidth?: number;
  deviceHeight?: number;
}

export default function LiveBrowserScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const metadataRef = useRef<FrameMetadata>({});
  const imageSizeRef = useRef({ width: 0, height: 0 });
  const hasFirstFrameRef = useRef(false);

  const [status, setStatus] = useState<BridgeStatus>("connecting");
  const [message, setMessage] = useState("Подключаюсь к браузеру…");
  const [pageTitle, setPageTitle] = useState<string | undefined>();
  const [attempt, setAttempt] = useState(0);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const { width: imgW, height: imgH } = imageSizeRef.current;
    if (!canvas || !container || !imgW || !imgH) return;
    const scale = Math.min(
      container.clientWidth / imgW,
      container.clientHeight / imgH
    );
    canvas.style.width = `${Math.floor(imgW * scale)}px`;
    canvas.style.height = `${Math.floor(imgH * scale)}px`;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Один WebSocket на попытку подключения; сброс через кнопку «Повторить»
  useEffect(() => {
    hasFirstFrameRef.current = false;
    setStatus("connecting");
    setMessage("Подключаюсь к браузеру…");

    const ws = new WebSocket(`ws://${window.location.hostname}:${BRIDGE_PORT}`);
    wsRef.current = ws;
    let gotMessage = false;

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (payload.type === "connected") {
        gotMessage = true;
        setPageTitle(payload.title);
        setMessage("Получаю картинку…");
      } else if (payload.type === "error") {
        gotMessage = true;
        setStatus("error");
        setMessage(
          payload.reason === "browser-unavailable" || payload.reason === "no-page"
            ? "Управляемый браузер не запущен или в нём нет открытых вкладок. Попроси BRAIN поднять его."
            : payload.detail || "Не удалось подключиться к вкладке браузера."
        );
      } else if (payload.type === "frame") {
        gotMessage = true;
        metadataRef.current = payload.metadata || {};

        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          if (
            canvas.width !== img.naturalWidth ||
            canvas.height !== img.naturalHeight
          ) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
          }
          imageSizeRef.current = {
            width: img.naturalWidth,
            height: img.naturalHeight,
          };
          resizeCanvas();
          canvas.getContext("2d")?.drawImage(img, 0, 0);

          if (!hasFirstFrameRef.current) {
            hasFirstFrameRef.current = true;
            setStatus("streaming");
          }
        };
        img.src = `data:image/jpeg;base64,${payload.data}`;
      }
    };

    ws.onclose = () => {
      if (!gotMessage) {
        setStatus("error");
        setMessage(
          "Не удалось подключиться к мосту браузера (ws-порт 3724). Сервер кабинета запущен последней версии?"
        );
      }
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [attempt, resizeCanvas]);

  const send = useCallback((payload: Record<string, unknown>) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    }
  }, []);

  // Клик по canvas не совпадает по масштабу со страницей — пересчитываем
  // относительно фактического отображаемого размера картинки, а не canvas.
  const toPageCoords = useCallback(
    (e: { clientX: number; clientY: number }) => {
      const canvas = canvasRef.current;
      const { deviceWidth, deviceHeight } = metadataRef.current;
      if (!canvas || !deviceWidth || !deviceHeight) return null;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      return {
        x: ((e.clientX - rect.left) / rect.width) * deviceWidth,
        y: ((e.clientY - rect.top) / rect.height) * deviceHeight,
      };
    },
    []
  );

  const handleMouseMove = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    const pt = toPageCoords(e);
    if (pt) send({ type: "mouseMove", ...pt });
  };
  const handleMouseDown = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    canvasRef.current?.focus();
    const pt = toPageCoords(e);
    if (pt) send({ type: "mouseDown", ...pt, button: "left" });
  };
  const handleMouseUp = (e: ReactMouseEvent<HTMLCanvasElement>) => {
    const pt = toPageCoords(e);
    if (pt) send({ type: "mouseUp", ...pt, button: "left" });
  };
  const handleWheel = (e: ReactWheelEvent<HTMLCanvasElement>) => {
    const pt = toPageCoords(e);
    if (pt) send({ type: "wheel", ...pt, deltaX: e.deltaX, deltaY: e.deltaY });
  };
  const handleKeyDown = (e: ReactKeyboardEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    send({ type: "keyDown", key: e.key, code: e.code });
    if (e.key.length === 1) send({ type: "char", text: e.key });
  };
  const handleKeyUp = (e: ReactKeyboardEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    send({ type: "keyUp", key: e.key, code: e.code });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-elevated/40">
      <div className="flex shrink-0 items-center justify-between border-b border-border/70 px-4 py-2.5">
        <div className="min-w-0">
          <span className="text-sm font-medium">Живой экран браузера</span>
          {pageTitle && (
            <span className="ml-2 truncate text-xs text-muted-foreground">
              {pageTitle}
            </span>
          )}
        </div>
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            status === "streaming"
              ? "bg-emerald-400"
              : status === "error"
                ? "bg-destructive"
                : "bg-amber-400"
          }`}
        />
      </div>

      <div
        ref={containerRef}
        className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/40"
      >
        {status !== "streaming" && (
          <div className="flex max-w-sm flex-col items-center gap-3 p-8 text-center">
            {status === "error" ? (
              <AlertTriangle size={28} className="text-amber-400" />
            ) : (
              <Loader2 size={28} className="animate-spin text-muted-foreground" />
            )}
            <p className="text-sm text-muted-foreground">{message}</p>
            {status === "error" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAttempt((n) => n + 1)}
              >
                <RefreshCw size={13} />
                Повторить
              </Button>
            )}
          </div>
        )}
        <canvas
          ref={canvasRef}
          tabIndex={0}
          className={`outline-none ${status === "streaming" ? "block" : "hidden"}`}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      </div>
    </div>
  );
}
