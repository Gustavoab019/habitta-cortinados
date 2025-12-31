import nodemailer from "nodemailer";
import { env } from "./env";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: nodemailer.SendMailOptions["attachments"];
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!env.SMTP_HOST || !env.SMTP_PORT || !env.SMTP_USER || !env.SMTP_PASSWORD || !env.SMTP_FROM) {
    return null;
  }

  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD
    }
  });

  return transporter;
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const mailer = getTransporter();
  if (!mailer) {
    return;
  }

  await mailer.sendMail({
    from: env.SMTP_FROM,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html,
    attachments: params.attachments
  });
}
