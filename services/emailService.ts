import fs from "fs";
import path from "path";
import { Types } from "mongoose";
import type { OrderDto } from "../schemas/order";
import { sendEmail } from "../lib/email";
import { env } from "../lib/env";
import { connectToDatabase } from "../lib/db";
import { FabricModel } from "../models/Fabric";
import { RailModel } from "../models/Rail";

export async function sendOrderConfirmationEmail(order: OrderDto): Promise<void> {
  if (!env.SMTP_HOST || !env.SMTP_FROM) {
    return;
  }

  await connectToDatabase();

  const fabricIds = Array.from(new Set(order.items.map((item) => item.fabricId)));
  const railIds = Array.from(new Set(order.items.map((item) => item.railId)));

  const [fabrics, rails] = await Promise.all([
    fabricIds.length ? FabricModel.find({ _id: { $in: fabricIds.map((id) => new Types.ObjectId(id)) } }).lean() : [],
    railIds.length ? RailModel.find({ _id: { $in: railIds.map((id) => new Types.ObjectId(id)) } }).lean() : []
  ]);

  const fabricMap = new Map<string, string>();
  fabrics.forEach((fabric) => fabricMap.set(String(fabric._id), fabric.name));
  const railMap = new Map<string, string>();
  rails.forEach((rail) => railMap.set(String(rail._id), rail.name));

  const logoPath = path.join(process.cwd(), "public", "habitta-logo.png");
  const logoExists = fs.existsSync(logoPath);
  const logoCid = "habitta-logo@cid";

  const text = `Olá ${order.customer.name},

Recebemos o seu pedido de orçamento na Habitta. Vamos analisar as informações e entraremos em contacto em breve pelo WhatsApp ou e-mail.

Resumo:
- Status: ${order.status}
- Cidade: ${order.address.city}
- Notas: ${order.notes ?? "—"}
- Itens:
${order.items
  .map((item, index) => {
    const fabricName = fabricMap.get(item.fabricId) ?? item.fabricId;
    const railName = railMap.get(item.railId) ?? item.railId;
    return `Item ${index + 1}: ${item.productType} | Tecido: ${fabricName} | Calha: ${railName} | Medidas: ${item.measurements.widthCm ?? "—"}x${
      item.measurements.heightCm ?? "—"
    }cm | Medição técnica: ${item.needsMeasurement ? "Sim" : "Não"}`;
  })
  .join("\n")}

Morada Habitta:
R. Vale Flores Pav. E, 2710-632 Sintra

Obrigado por escolher a Habitta.`;

  const itemsHtml = order.items
    .map((item, index) => {
      const fabricName = fabricMap.get(item.fabricId) ?? item.fabricId;
      const railName = railMap.get(item.railId) ?? item.railId;
      return `<tr>
        <td style="padding:6px 8px; font-size:13px;">${index + 1}</td>
        <td style="padding:6px 8px; font-size:13px;">${item.productType}</td>
        <td style="padding:6px 8px; font-size:13px;">${fabricName}</td>
        <td style="padding:6px 8px; font-size:13px;">${railName}</td>
        <td style="padding:6px 8px; font-size:13px;">${item.measurements.widthCm ?? "—"} x ${item.measurements.heightCm ?? "—"} cm</td>
        <td style="padding:6px 8px; font-size:13px;">${item.needsMeasurement ? "Sim" : "Não"}</td>
      </tr>`;
    })
    .join("");

  const html = `
  <div style="font-family: Arial, sans-serif; background:#f5f1e8; padding:24px; color:#0f1f26;">
    <div style="max-width:640px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
      <div style="padding:20px; border-bottom:1px solid #eee; text-align:center;">
        ${logoExists ? `<img src="cid:${logoCid}" alt="Habitta" style="height:44px;" />` : `<strong>Habitta</strong>`}
      </div>
      <div style="padding:24px;">
        <p style="margin:0 0 12px;">Olá ${order.customer.name},</p>
        <p style="margin:0 0 16px;">Recebemos o seu pedido de orçamento. Vamos revisar e entraremos em contacto em breve pelo WhatsApp ou e-mail.</p>
        <p style="margin:0 0 12px;"><strong>Status:</strong> ${order.status}<br/>
        <strong>Cidade:</strong> ${order.address.city}<br/>
        <strong>Notas:</strong> ${order.notes ?? "—"}</p>
        <table style="width:100%; border-collapse:collapse; margin-top:12px; border:1px solid #eee;">
          <thead>
            <tr style="background:#f5f1e8; text-align:left;">
              <th style="padding:8px; font-size:12px;">#</th>
              <th style="padding:8px; font-size:12px;">Produto</th>
              <th style="padding:8px; font-size:12px;">Tecido</th>
              <th style="padding:8px; font-size:12px;">Calha/Estor</th>
              <th style="padding:8px; font-size:12px;">Medidas</th>
              <th style="padding:8px; font-size:12px;">Medição</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <p style="margin:16px 0 0; font-size:12px; color:#475569;">
          Habitta · R. Vale Flores Pav. E, 2710-632 Sintra · suporte@habitta.pt · +351 920 478 466
        </p>
      </div>
    </div>
  </div>`;

  const attachments = logoExists
    ? [
        {
          filename: "habitta-logo.png",
          content: fs.readFileSync(logoPath),
          cid: logoCid
        }
      ]
    : undefined;

  await sendEmail({
    to: order.customer.email,
    subject: "Habitta - Recebemos o seu pedido de orçamento",
    text,
    html,
    attachments
  });
}
