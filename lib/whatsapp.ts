export const WHATSAPP_NUMBER = "351920478466";

export const DEFAULT_WHATSAPP_MESSAGE = "Olá! Quero um orçamento de cortinados e estores sob medida.";

export const DEFAULT_WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;

export const buildWhatsappLink = (message?: string) =>
  message ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : `https://wa.me/${WHATSAPP_NUMBER}`;
