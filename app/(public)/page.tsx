import { MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Models } from "@/components/sections/Models";
import { Simulator } from "@/components/sections/Simulator";
import { Reasons } from "@/components/sections/Reasons";
import { WhatsappCTA } from "@/components/sections/WhatsappCTA";
import { DEFAULT_WHATSAPP_LINK } from "@/lib/whatsapp";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">
        <Hero />
        <HowItWorks />
        <Models />
        <Simulator />
        <Reasons />
        <WhatsappCTA />
        <a
          href={DEFAULT_WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-[var(--habitta-emerald)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl md:hidden"
        >
          <MessageCircle className="h-4 w-4" />
          Pedir orçamento
        </a>
      </main>
      <Footer />
    </div>
  );
}
