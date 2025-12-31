'use client';

import { useEffect, useMemo, useState } from "react";
import { Camera, ChevronRight, MapPin, MessageCircle, Ruler, Wand2 } from "lucide-react";
import { buildWhatsappLink, DEFAULT_WHATSAPP_LINK } from "@/lib/whatsapp";
import type { CatalogResponse, FabricDto, RailDto } from "@/schemas/catalog";

type ProductType = "cortinado" | "estor";

const models = ["Onda Perfeita", "Blackout Total", "Linho Natural", "Voil Translúcido", "Estor de Rolo", "Dia & Noite"];

const systems = ["Calha de teto", "Calha de parede", "Não sei / quero ajuda"];

export function Simulator() {
  const [product, setProduct] = useState<ProductType>("cortinado");
  const [model, setModel] = useState<string>(models[0]);
  const [fabric, setFabric] = useState<string>("");
  const [system, setSystem] = useState<string>(systems[0]);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [photoName, setPhotoName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [needsMeasurement, setNeedsMeasurement] = useState<boolean>(true);
  const [fabrics, setFabrics] = useState<FabricDto[]>([]);
  const [rails, setRails] = useState<RailDto[]>([]);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message?: string }>({ type: "idle" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [referenceImage, setReferenceImage] = useState<string>("");

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const res = await fetch("/api/catalog", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Falha ao carregar catálogo");
        }
        const data = (await res.json()) as CatalogResponse;
        setFabrics(data.fabrics);
        setRails(data.rails);
        if (data.fabrics[0]) {
          setFabric(data.fabrics[0].id);
        }
        if (data.rails[0]) {
          setSystem(data.rails[0].id);
        }
      } catch (error) {
        console.error(error);
        setStatus({ type: "error", message: "Não foi possível carregar catálogo. Verifique a ligação ao servidor." });
      }
    };
    loadCatalog();
  }, []);

  const selectedFabricName = useMemo(() => fabrics.find((item) => item.id === fabric)?.name ?? "Sugestão de vocês", [fabric, fabrics]);
  const selectedRailName = useMemo(() => rails.find((item) => item.id === system)?.name ?? "Sugestão de vocês", [rails, system]);

  const whatsappHref = buildWhatsappLink(
    `Olá! Gostaria de um orçamento.\nProduto: ${product}\nModelo: ${model}\nTecido: ${selectedFabricName}\nSistema: ${selectedRailName}\nMedidas: L=${
      width || "aprox"
    }cm x A=${height || "aprox"}cm\nCidade: ${city || "—"}\nMedição técnica: ${needsMeasurement ? "Sim" : "Não"}\nFoto: ${
      photoName || "não enviada"
    }\nContato: ${name || "—"} / ${email || "—"} / ${phone || "—"}`
  );

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setReferenceImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      setStatus({ type: "error", message: "Preencha nome, email e telefone." });
      return;
    }
    if (!fabric || !system) {
      setStatus({ type: "error", message: "Selecione tecido e sistema." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle" });
    const widthCm = width ? Number(width) : undefined;
    const heightCm = height ? Number(height) : undefined;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, email, phone },
          address: { line1: city || "Portugal", city: city || "Portugal", postalCode: "0000-000" },
          items: [
            {
              productType: product === "cortinado" ? "curtain_wave" : "blind",
              fabricId: fabric,
              railId: system,
              measurements: { widthCm, heightCm },
              needsMeasurement
            }
          ],
          notes: `Modelo: ${model}. Foto: ${photoName || "não enviada"}. Referência: ${referenceImage ? "com imagem" : "sem imagem"}.`
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao enviar o pedido");
      }

      setStatus({ type: "success", message: "Pedido salvo. Entraremos em contacto e seguimos pelo WhatsApp." });
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Erro inesperado" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="simulador" className="py-14 scroll-mt-24 bg-white/70">
      <div className="container-premium">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-600">Simulador</p>
            <h2 className="text-3xl font-semibold text-[var(--habitta-forest)]">Simule sem compromisso</h2>
            <p className="text-sm text-slate-700">Qualifica o pedido e abre conversa no WhatsApp. Medidas aproximadas são suficientes.</p>
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur">
            <div className="grid gap-4 md:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                Nome
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Seu nome"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                Email
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="email@exemplo.com"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                Telefone
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+351 ..."
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
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
                Modelo
                <select
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                >
                  {models.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                Tecido
                <select
                  value={fabric}
                  onChange={(event) => setFabric(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                >
                  {fabrics.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.type})
                    </option>
                  ))}
                </select>
                <span className="text-xs font-normal text-slate-600">Sugestão automática se não escolher.</span>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                Enviar referência (foto)
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-[var(--habitta-emerald)]/40 px-3 py-2 text-sm text-slate-700">
                  <Camera className="h-4 w-4 text-[var(--habitta-emerald)]" />
                  <span className="max-w-[55%] truncate text-ellipsis">{photoName || "Upload opcional (JPG/PNG)"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="ml-auto text-xs file:mr-2 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[var(--habitta-emerald)] file:px-3 file:py-1.5 file:text-white file:text-xs file:font-semibold"
                  />
                </div>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                Calha / Sistema
                <select
                  value={system}
                  onChange={(event) => setSystem(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                >
                  {rails.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                  {systems.map((item) => (
                    <option key={item} value="">
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                  Largura (cm)
                  <input
                    value={width}
                    onChange={(event) => setWidth(event.target.value)}
                    placeholder="aprox."
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                  />
                  <span className="text-xs font-normal text-slate-600">Aproximado já ajuda</span>
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-[var(--habitta-forest)]">
                  Altura (cm)
                  <input
                    value={height}
                    onChange={(event) => setHeight(event.target.value)}
                    placeholder="aprox."
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                  />
                  <span className="text-xs font-normal text-slate-600">Aproximado já ajuda</span>
                </label>
              </div>
            </div>

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
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--habitta-forest)]">
              <input
                type="checkbox"
                checked={needsMeasurement}
                onChange={(event) => setNeedsMeasurement(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[var(--habitta-emerald)] focus:ring-[var(--habitta-emerald)]"
              />
              Quero ajuda na medição técnica
            </label>
          </div>

          <div className="space-y-4 rounded-2xl border border-[var(--habitta-emerald)]/30 bg-white/90 p-5 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--habitta-forest)]">
              <Wand2 className="h-4 w-4 text-[var(--habitta-emerald)]" />
              Revisão humana e proposta
            </div>
            <p className="text-sm text-slate-700">
              Recebemos os dados e preparamos uma proposta personalizada. Ajustamos tecido, sistema e montagem com você pelo WhatsApp antes de
              fechar valores.
            </p>
            <div className="rounded-xl border border-slate-200 bg-[var(--habitta-cream)] p-4 text-sm text-slate-700">
              <p className="font-semibold text-[var(--habitta-forest)]">Resumo rápido</p>
              <p>Modelo: {model}</p>
              <p>Sistema: {selectedRailName}</p>
              <p>
                Medidas: L={width || "aprox"}cm x A={height || "aprox"}cm —{" "}
                <span className="text-[var(--habitta-emerald)]">ajudamos a validar</span>
              </p>
              <p>Cidade: {city || "—"}</p>
              <p>Medição técnica: {needsMeasurement ? "Sim" : "Não"}</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-full bg-[var(--habitta-emerald)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MessageCircle className="h-4 w-4" />
                Receber orçamento no WhatsApp
              </button>
              {status.type === "error" ? (
                <p className="text-xs text-red-600">{status.message}</p>
              ) : status.type === "success" ? (
                <p className="text-xs text-[var(--habitta-forest)]">{status.message}</p>
              ) : (
                <p className="text-xs text-slate-600">
                  Não mostramos preço final aqui. Abrimos a conversa para acertar tecido, medidas e acabamento antes de fechar.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
