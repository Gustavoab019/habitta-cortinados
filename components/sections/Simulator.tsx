'use client';

import { useState } from "react";
import { ChevronRight, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { buildWhatsappLink, DEFAULT_WHATSAPP_LINK } from "@/lib/whatsapp";

type ProductType = "cortinado" | "estor";

export function Simulator() {
  const [product, setProduct] = useState<ProductType>("cortinado");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const productLabel = product === "cortinado" ? "Cortinado" : "Estor";
  const widthValue = width || "__";
  const heightValue = height || "__";

  const whatsappHref = buildWhatsappLink(
    `Olá! Quero orçamento.\nÉ ${productLabel}.\nCidade: ${city || "__"}.\nMedidas aproximadas: ${widthValue} x ${heightValue}.\nPode me ajudar a escolher tecido/calha?`
  );

  const handleSubmit = () => {
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="simulador" className="py-14 scroll-mt-24 bg-white/70">
      <div className="container-premium">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-600">Simulador</p>
            <h2 className="text-3xl font-semibold text-[var(--habitta-forest)]">Simule sem compromisso</h2>
            <p className="text-sm text-slate-700">Passo 1 rápido. Passo 2 no WhatsApp com perguntas guiadas.</p>
          </div>
          <a
            href={DEFAULT_WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--habitta-emerald)] px-4 py-2 text-sm font-semibold text-[var(--habitta-emerald)] transition hover:-translate-y-0.5 hover:bg-[var(--habitta-emerald)] hover:text-white"
          >
            Quero começar agora
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 grid gap-6 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Prova real</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { src: "/habitta-room.jpg", alt: "Sala com cortinados premium" },
                { src: "/onda-perfeita.jpg", alt: "Detalhe da onda perfeita" },
                { src: "/blackout-room.jpg", alt: "Quarto com blackout e trilho" },
                { src: "/image.png", alt: "Projeto real Habitta 1" },
                { src: "/image copy.png", alt: "Projeto real Habitta 2" },
                { src: "/image copy 2.png", alt: "Projeto real Habitta 3" },
                { src: "/image copy 3.png", alt: "Projeto real Habitta 4" },
                { src: "/image copy 4.png", alt: "Projeto real Habitta 5" },
                { src: "/image copy 5.png", alt: "Projeto real Habitta 6" },
                { src: "/image copy 6.png", alt: "Projeto real Habitta 7" },
                { src: "/image copy 7.png", alt: "Projeto real Habitta 8" },
                { src: "/image copy 8.png", alt: "Projeto real Habitta 9" },
                { src: "/image copy 9.png", alt: "Projeto real Habitta 10" },
                { src: "/image copy 10.png", alt: "Projeto real Habitta 11" },
                { src: "/image copy 11.png", alt: "Projeto real Habitta 12" },
                { src: "/image copy 12.png", alt: "Projeto real Habitta 13" },
                { src: "/image copy 13.png", alt: "Projeto real Habitta 14" },
                { src: "/IMG_274817D0-16CA-4DF0-A75F-94760CC54F64.JPEG", alt: "Projeto real Habitta 15" }
              ].map((item) => (
                <div key={item.src} className="overflow-hidden rounded-2xl border border-slate-200">
                  <img src={item.src} alt={item.alt} loading="lazy" className="h-32 w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-4" />
          </div>

          <div className="space-y-4 rounded-2xl border border-[var(--habitta-emerald)]/30 bg-white/90 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--habitta-forest)]">
              <Sparkles className="h-4 w-4 text-[var(--habitta-emerald)]" />
              Passo 1 (30s) → Passo 2 no WhatsApp
            </div>
            <div className="grid gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                Tipo de produto
                <div className="flex gap-2">
                  {(["cortinado", "estor"] as ProductType[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setProduct(option)}
                      className={`flex-1 rounded-xl border px-3 py-2 text-sm ${
                        product === option
                          ? "border-[var(--habitta-emerald)] bg-[var(--habitta-emerald)] text-white"
                          : "border-slate-200 bg-white hover:border-[var(--habitta-emerald)]/50"
                      }`}
                    >
                      {option === "cortinado" ? "Cortinado" : "Estor"}
                    </button>
                  ))}
                </div>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                Cidade
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 focus-within:border-[var(--habitta-emerald)]">
                  <MapPin className="h-4 w-4 text-[var(--habitta-emerald)]" />
                  <input
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Lisboa, Sintra..."
                    className="w-full border-none bg-transparent text-sm outline-none"
                  />
                </div>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                  Largura (cm)
                  <input
                    value={width}
                    onChange={(event) => setWidth(event.target.value)}
                    placeholder="opcional"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                  Altura (cm)
                  <input
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    placeholder="opcional"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                  />
                </label>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[var(--habitta-cream)] p-4 text-sm text-slate-700">
              <p className="font-semibold text-[var(--habitta-forest)]">Âncora de preço</p>
              <p>A partir de €X/m² (varia por tecido e sistema)</p>
              <p>Projetos comuns (250 x 250): €200 a €300</p>
              <p className="mt-2 text-xs text-slate-500">Enviamos faixa estimada com base em 2 medidas.</p>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 rounded-full bg-[var(--habitta-emerald)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4" />
              Receber faixa de preço no WhatsApp
            </button>
            <p className="text-xs text-slate-600">Passo 2: no WhatsApp, validamos medidas e escolhemos tecido/calha.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
