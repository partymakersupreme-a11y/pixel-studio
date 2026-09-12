import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, KeyRound, Loader, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEV_PASSWORD, isUsingDefaultPassword, signIn } from "@/lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const result = await signIn(password);
    setPending(false);

    if (!result.ok) {
      setError(result.error ?? "Не удалось войти");
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          На сайт
        </Link>

        <div className="mb-8">
          <span className="font-display text-2xl font-semibold tracking-tight">
            Pixel Studio
          </span>
          <p className="label-uppercase mt-2 text-[0.55rem] text-muted-foreground">
            Личный кабинет
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  autoFocus
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={pending}
              >
                {pending ? (
                  <Loader size={15} className="animate-spin" />
                ) : (
                  <KeyRound size={15} />
                )}
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>

        {/*
          Подсказка с паролем видна только пока используется дефолтный.
          Как только владелец задаст VITE_ADMIN_PASSWORD — блок исчезнет.
        */}
        {isUsingDefaultPassword() && (
          <div className="mt-6 rounded-lg border border-amber-500/25 bg-amber-500/8 p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert size={15} className="mt-0.5 shrink-0 text-amber-400" />
              <div className="min-w-0 text-xs leading-relaxed text-muted-foreground">
                <p className="font-medium text-foreground">
                  Демо-режим, пароль по умолчанию
                </p>
                <p className="mt-1.5">
                  Пароль:{" "}
                  <code className="font-mono text-foreground">
                    {DEV_PASSWORD}
                  </code>
                </p>
                <p className="mt-2">
                  Это не защита: пароль лежит в коде страницы, его видно через
                  DevTools. Подробности и что делать — в README.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
