import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PoliticaPrivacidadePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--habitta-cream)]">
      <Header />
      <main className="container-premium flex-1 py-16 text-slate-800">
        <div className="max-w-4xl space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Legal</p>
            <h1 className="text-3xl font-semibold text-[var(--habitta-forest)]">Política de Privacidade & Cookies</h1>
            <p className="text-sm text-slate-700">
              Esta página descreve como a Habitta trata dados pessoais e cookies, em conformidade com o RGPD e a legislação portuguesa
              aplicável.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--habitta-forest)]">Responsável pelo tratamento</h2>
            <p className="text-sm">
              A Habitta é responsável pelo tratamento dos dados fornecidos através deste site e pelos canais de contacto (WhatsApp, e-mail,
              telefone).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--habitta-forest)]">Dados recolhidos e finalidade</h2>
            <ul className="list-disc space-y-1 pl-6 text-sm">
              <li>Identificação e contacto: nome, e-mail, telefone, cidade.</li>
              <li>Dados de projeto: medidas, preferências de tecido/calha/estor, notas, uploads de referência.</li>
              <li>Finalidade: preparar e enviar orçamentos, agendar medição técnica, comunicar sobre o pedido.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--habitta-forest)]">Base legal</h2>
            <p className="text-sm">
              O tratamento baseia-se no seu pedido de orçamento e interesse legítimo da Habitta em prestar o serviço solicitado.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--habitta-forest)]">Conservação</h2>
            <p className="text-sm">
              Mantemos os dados pelo tempo necessário para gerir o orçamento/pedido e cumprir obrigações legais. Pode pedir a eliminação a
              qualquer momento, salvo obrigações legais de retenção.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--habitta-forest)]">Partilha</h2>
            <p className="text-sm">
              Não vendemos dados. Podemos partilhar estritamente com prestadores essenciais (ex.: alojamento, e-mail, armazenamento) sob
              obrigações de confidencialidade e apenas para prestar o serviço.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--habitta-forest)]">Cookies</h2>
            <p className="text-sm">
              Atualmente usamos apenas cookies/armazenamento estritamente necessários ao funcionamento do site. Se adicionarmos cookies de
              análise ou marketing, pediremos consentimento prévio e apresentaremos banner de escolha.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--habitta-forest)]">Direitos dos titulares</h2>
            <ul className="list-disc space-y-1 pl-6 text-sm">
              <li>Acesso, retificação, apagamento, limitação e oposição.</li>
              <li>Portabilidade dos dados fornecidos por si.</li>
              <li>Retirar consentimento (quando aplicável) sem afetar a licitude prévia.</li>
              <li>Reclamar junto da CNPD.</li>
            </ul>
            <p className="text-sm">
              Para exercer direitos, contacte-nos pelo e-mail abaixo. Responderemos no prazo legal, salvo pedidos manifestamente excessivos.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-[var(--habitta-forest)]">Contactos</h2>
            <p className="text-sm">
              E-mail: <a className="text-[var(--habitta-emerald)] hover:underline" href="mailto:suporte@habitta.pt">suporte@habitta.pt</a>
              <br />
              Telefone: +351 920 478 466
            </p>
            <p className="text-xs text-slate-600">
              Última atualização: {new Date().toLocaleDateString("pt-PT")}
            </p>
          </section>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--habitta-emerald)] px-5 py-2 text-sm font-semibold text-[var(--habitta-emerald)] transition hover:-translate-y-0.5 hover:bg-[var(--habitta-emerald)] hover:text-white"
          >
            Voltar ao site
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
