import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <span className="font-display text-6xl font-semibold tracking-tight">
        404
      </span>
      <p className="mt-4 text-sm text-muted-foreground">
        Такой страницы нет.
      </p>
      <Button variant="gradient" className="mt-8" asChild>
        <Link to="/">
          <ArrowLeft size={15} />
          На главную
        </Link>
      </Button>
    </div>
  );
}
