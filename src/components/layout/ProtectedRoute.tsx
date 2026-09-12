import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { isAuthenticated } from "@/lib/auth";

/**
 * Пускает дальше только при флаге входа в localStorage.
 * ⚠️ Это НЕ защита: код и пароль лежат в бандле, любой может обойти проверку
 * через DevTools. Реальная защита появится только вместе с бэкендом — см. README.
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}
