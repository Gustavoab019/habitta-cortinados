const faqs = [
  {
    question: "Posso comprar sem medição?",
    answer: "Sim. Se já tem medidas confiáveis, siga direto para o checkout. Medição técnica é opcional, mas recomendada para grandes vãos."
  },
  {
    question: "Como sei qual tecido escolher?",
    answer: "O configurador sugere opções por transparência e estilo. Em caso de dúvida, solicite um contacto rápido para indicação de tecido."
  },
  {
    question: "Quanto tempo demora?",
    answer: "MVP: consulte lead time no momento do pedido. Produção sob medida varia conforme tecido e volume."
  },
  {
    question: "Instalação está incluída?",
    answer: "Instalação é sob consulta e depende da área de atendimento. Entregamos pronto para instalar ou podemos orçar instalação."
  },
  {
    question: "Fazem para empresas/hotéis?",
    answer: "Sim, atendemos projetos residenciais e de hospitalidade com padrão consistente e gestão de medidas."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="bg-slate-50 py-14 scroll-mt-24">
      <div className="container-premium max-w-5xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-600">FAQ</p>
          <h2 className="text-3xl font-semibold text-[var(--habitta-forest)]">Perguntas frequentes</h2>
        </div>
        <div className="mt-8 space-y-4">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <p className="text-lg font-semibold text-[var(--habitta-forest)]">{question}</p>
              <p className="mt-2 text-sm text-slate-700">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
