import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#process" },
  { label: "Кейсы", href: "#cases" },
  { label: "Контакты", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(
        () =>
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }),
        320
      );
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/70 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:h-20 lg:px-8">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight">
              Pixel Studio
            </span>
            <span className="label-uppercase mt-1 text-[0.55rem] text-muted-foreground">
              Автоматизация и сайты
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(href);
                }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/login"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Кабинет
            </Link>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => goToSection("#contact")}
            >
              Обсудить проект
            </Button>
          </div>

          <button
            className="p-2 text-foreground md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Меню"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-ink/97 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          className="absolute right-6 top-5 p-2"
          onClick={() => setMenuOpen(false)}
          aria-label="Закрыть"
        >
          <X size={22} />
        </button>
        {navLinks.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="font-display text-2xl font-medium"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.setTimeout(() => goToSection(href), 260);
            }}
          >
            {label}
          </a>
        ))}
        <Link
          to="/login"
          className="text-sm text-muted-foreground"
          onClick={() => setMenuOpen(false)}
        >
          Личный кабинет
        </Link>
      </div>
    </>
  );
}
