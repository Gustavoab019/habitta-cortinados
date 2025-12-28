# Habitta (MVP)

Configurador e checkout de cortinados sob medida usando Next.js (App Router), Tailwind CSS, TypeScript e MongoDB (Mongoose).

## Requisitos
- Node.js 18+ recomendado.
- MongoDB disponível localmente ou remoto.
- Variáveis de ambiente configuradas (use `.env.local` na raiz).

### Variáveis
```
MONGODB_URI=mongodb://localhost:27017/habitta
ADMIN_TOKEN=defina-um-token-forte
NEXT_PUBLIC_ADMIN_TOKEN=mesmo-token-ou-outro
NEXT_PUBLIC_MEASUREMENT_FEE=25
MEASUREMENT_FEE=25
SMTP_HOST=smtp.seuprovedor.com
SMTP_PORT=587
SMTP_USER=usuario
SMTP_PASSWORD=senha
SMTP_FROM=habitta@seuprovedor.com
```

`NEXT_PUBLIC_ADMIN_TOKEN` é usada pelo painel admin para chamar a API com header `Authorization: Bearer <token>`.
Variáveis SMTP são opcionais; se preenchidas, enviamos e-mail de confirmação ao cliente ao criar o pedido.

## Instalação e execução
```bash
npm install
npm run dev
# em outro terminal
open http://localhost:3000
```

Scripts adicionais:
- `npm run lint` — valida o código.
- `npm run build && npm start` — build/produção.
- `npm run seed` — insere tecidos e calhas base (usa `.env.local` ou variáveis do shell).

## Estrutura
- `app/` — App Router, páginas públicas e admin, handlers da API em `app/api`.
- `components/` — UI compartilhada (Header, Footer, Sidebar, ProductCard, Stepper).
- `lib/` — conexão Mongo (`db.ts`), validação de env (`env.ts`), auth simples por token (`auth.ts`), utilidades.
- `models/` — schemas Mongoose para Fabric, Rail e Order.
- `schemas/` — Zod para validação de payloads.
- `services/` — camada de serviços (catálogo e pedidos).
- `scripts/seed.ts` — preenche 10 tecidos e 5 calhas com upsert.

## Endpoints principais
- `GET /api/health` — `{ ok: true, db: "connected" | "disconnected" }`.
- `GET /api/catalog` — tecidos e calhas ativos.
- `POST /api/orders` — cria pedido (validação Zod, calcula measurementFee/deposit). Corpo inclui customer, address, items (fabricId, railId, needsMeasurement etc).
- `GET /api/orders` — lista pedidos (header `Authorization: Bearer <ADMIN_TOKEN>`).
- `GET /api/orders/[id]` — retorna pedido.
- `PATCH /api/orders/[id]` — atualiza status/medidas (header admin).

### Testes rápidos com curl
```bash
# Health
curl http://localhost:3000/api/health

# Catálogo
curl http://localhost:3000/api/catalog

# Criar pedido (troque os ObjectIds gerados pelo seed)
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {"name":"Cliente MVP","email":"cliente@exemplo.com","phone":"+351900000000"},
    "address": {"line1":"Rua Teste, 123","city":"Lisboa","postalCode":"0000-000"},
    "items": [{
      "productType":"curtain_wave",
      "fabricId":"<fabricId>",
      "railId":"<railId>",
      "needsMeasurement":true
    }],
    "notes":"Agendar em horário comercial"
  }'

# Listagem admin
curl http://localhost:3000/api/orders -H "Authorization: Bearer $ADMIN_TOKEN"
```

## UI (MVP)
- Landing em `/` com CTA para configurador/checkout.
- Configurador em `/configurador` com Stepper e estado local (produto, tecido, calha, medidas).
- Checkout em `/checkout` com formulário de cliente/endereço e opção de Medição Técnica (placeholder de integração com API).
- Painel admin em `/admin/pedidos` lendo `/api/orders` com token via `NEXT_PUBLIC_ADMIN_TOKEN`.
- Use `public/habitta-room.jpg` para ilustrar hero/portfólio (adicione a foto real neste caminho).
- Use `public/onda-perfeita.jpg` para o card “Blackout”.
- Use `public/blackout-room.jpg` para o card “Blackout Total” (adicione a foto real neste caminho).
- Use `public/estor-wc.jpg` para o card “Estor de Rolo”.
- Use `public/estor-madeira.jpg` para o card “Estor Madeira”.
- Use `public/linho-natural.jpg` para o card “Linho Natural” (foto de linho bege + voil).

## Notas
- Sem pagamentos neste MVP; depósito de medição calculado como placeholder.
- `noImplicitAny` ativo e sem `any` nas rotas e models.
- Ajuste a lógica de preço no `orderService` conforme regras finais.
- `/api/catalog` devolve fallback se o Mongo estiver indisponível (útil para demos locais sem seed).
# habitta-cortinados
