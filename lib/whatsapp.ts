export const WHATSAPP_NUMBER = "351920478466";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Quero orçamento. É cortinado/estor. Cidade: __. Medidas aproximadas: __ x __. Pode me ajudar a escolher tecido/calha?";

export const DEFAULT_WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`;

export const buildWhatsappLink = (message?: string) =>
  message ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : `https://wa.me/${WHATSAPP_NUMBER}`;
