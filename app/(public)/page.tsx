import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Models } from "@/components/sections/Models";
import { Simulator } from "@/components/sections/Simulator";
import { Reasons } from "@/components/sections/Reasons";
import { WhatsappCTA } from "@/components/sections/WhatsappCTA";

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
      </main>
      <Footer />
    </div>
  );
}
