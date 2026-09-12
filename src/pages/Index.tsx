import { useEffect } from "react";

import CasesSection from "@/components/features/CasesSection";
import ContactForm from "@/components/features/ContactForm";
import Hero from "@/components/features/Hero";
import ProcessSection from "@/components/features/ProcessSection";
import ServicesSection from "@/components/features/ServicesSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Index() {
  // Возврат с /login или /dashboard не должен ронять посетителя в середину страницы
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <ProcessSection />
        <CasesSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
