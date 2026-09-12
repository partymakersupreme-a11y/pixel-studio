/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Скрипт instagram embed.js вешает на window объект instgrm. */
interface Window {
  instgrm?: {
    Embeds: {
      process: () => void;
    };
  };
}
