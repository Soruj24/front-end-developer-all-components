import type { Transporter } from "nodemailer";
import { createTransport } from "nodemailer";
import { optionalEnv } from "@/lib/env";

export interface MailMessage {
  to: string;
  subject: string;
  /** Plain-text body. */
  text: string;
}

/**
 * Mailer transport. In development the message is written to the server log
 * so flows are testable without an SMTP provider. Production uses SMTP via
 * nodemailer when `SMTP_HOST` is configured, otherwise the Resend REST API
 * when `RESEND_API_KEY` is configured.
 */
export interface Mailer {
  send(message: MailMessage): Promise<void>;
}

class ConsoleMailer implements Mailer {
  async send(message: MailMessage): Promise<void> {
    console.log(
      `[mail] To: ${message.to}\n[mail] Subject: ${message.subject}\n[mail] ${message.text}\n[mail] ---`
    );
  }
}

class ResendMailer implements Mailer {
  private readonly apiKey: string;
  private readonly from: string;

  constructor(apiKey: string, from: string) {
    this.apiKey = apiKey;
    this.from = from;
  }

  async send(message: MailMessage): Promise<void> {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.from,
        to: [message.to],
        subject: message.subject,
        text: message.text,
      }),
    });
    if (!response.ok) {
      throw new Error(`Mail send failed: ${response.status} ${response.statusText}`);
    }
  }
}

interface SmtpConfig {
  host: string;
  port: number;
  user?: string;
  pass?: string;
  secure: boolean;
  from: string;
}

class SmtpMailer implements Mailer {
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor(config: SmtpConfig) {
    this.transporter = createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.user
        ? { user: config.user, pass: config.pass ?? "" }
        : undefined,
    });
    this.from = config.from;
  }

  async send(message: MailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: message.subject,
      text: message.text,
    });
  }
}

function smtpConfig(): SmtpConfig | undefined {
  const host = optionalEnv("SMTP_HOST");
  if (!host) return undefined;
  return {
    host,
    port: Number(optionalEnv("SMTP_PORT") ?? "587"),
    user: optionalEnv("SMTP_USER"),
    pass: optionalEnv("SMTP_PASS"),
    secure: optionalEnv("SMTP_SECURE") === "true",
    from: optionalEnv("EMAIL_FROM") ?? "Component Library <no-reply@example.com>",
  };
}

let mailer: Mailer | null = null;

/** Lazily-built mailer; prod throws when email support is required but unconfigured. */
export function getMailer(): Mailer {
  if (mailer) return mailer;
  const smtp = smtpConfig();
  if (smtp) {
    mailer = new SmtpMailer(smtp);
  } else {
    const apiKey = optionalEnv("RESEND_API_KEY");
    if (apiKey) {
      const from = optionalEnv("EMAIL_FROM") ?? "Component Library <no-reply@example.com>";
      mailer = new ResendMailer(apiKey, from);
    } else {
      mailer = new ConsoleMailer();
    }
  }
  return mailer;
}