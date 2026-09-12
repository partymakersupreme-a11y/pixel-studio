import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ExternalLink,
  Instagram,
  LayoutDashboard,
  LogOut,
  Inbox,
  Menu,
  X,
} from "lucide-react";

import { signOut } from "@/lib/auth";

const navItems = [
  { label: "Обзор", href: "/dashboard", icon: LayoutDashboard },
  { label: "Заявки", href: "/dashboard#leads", icon: Inbox },
  { label: "Instagram", href: "/dashboard#instagram", icon: Instagram },
];

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
}: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  const scrollTo = (href: string) => {
    setSidebarOpen(false);
    const hash = href.split("#")[1];
    if (!hash) {
      document
        .getElementById("dashboard-main")
        ?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`flex h-full w-60 shrink-0 flex-col border-r border-border/70 bg-surface ${
        mobile ? "w-full" : "hidden lg:flex"
      }`}
    >
      <div className="border-b border-border/70 p-6">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-base font-semibold">Pixel Studio</span>
          <span className="label-uppercase mt-1.5 text-[0.5rem] text-muted-foreground">
            Личный кабинет
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
            location.pathname === href.split("#")[0] && !href.includes("#");
          return (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={`sidebar-nav-item w-full text-left ${
                active ? "active" : ""
              }`}
            >
              <Icon size={15} />
              <span>{label}</span>
              {active && (
                <ChevronRight size={12} className="ml-auto text-primary/60" />
              )}
            </button>
          );
        })}

        <Link
          to="/"
          className="sidebar-nav-item"
          onClick={() => setSidebarOpen(false)}
        >
          <ExternalLink size={15} />
          <span>На сайт</span>
        </Link>
      </nav>

      <div className="border-t border-border/70 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(var(--brand-violet)),hsl(var(--brand-cyan)))] text-xs font-semibold text-white">
            П
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm">Павел</div>
            <div className="label-uppercase text-[0.5rem] text-muted-foreground">
              Владелец
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="sidebar-nav-item w-full text-destructive/70 hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut size={15} />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-ink">
      <Sidebar />

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex bg-ink/70 backdrop-blur-sm lg:hidden">
          <div className="w-64">
            <Sidebar mobile />
          </div>
          <button
            className="flex-1"
            onClick={() => setSidebarOpen(false)}
            aria-label="Закрыть меню"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/70 bg-surface/60 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-4">
            <button
              className="p-1 text-muted-foreground lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Открыть меню"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-display text-base font-medium leading-none">
                {title}
              </h1>
              {subtitle && (
                <p className="label-uppercase mt-1.5 text-[0.5rem] text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:block">
              {new Date().toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
        </header>

        <main
          id="dashboard-main"
          className="flex-1 overflow-y-auto p-4 lg:p-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
