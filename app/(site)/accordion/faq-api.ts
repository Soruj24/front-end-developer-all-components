import { ApiError } from "@/lib/api/api-errors";
import { buildUrl, fetchJson } from "@/lib/api/api-client";
import { createMockStore } from "@/lib/api/api-mock";
import type { ApiAdapter, ApiConfig, PageQuery } from "@/lib/api/api-types";

/** Serializable FAQ record — plain strings only, safe to come from any API. */
export interface FaqRecord {
  id: string;
  question: string;
  answer: string;
  category: string;
}

/** Clearly-labeled demo data. Mock only — not production content. */
export const mockFaqs: FaqRecord[] = [
  { id: "faq-01", question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, Amex, PayPal, and bank transfers on enterprise plans.", category: "Billing" },
  { id: "faq-02", question: "Can I cancel anytime?", answer: "Yes. Access continues until the end of the billing period, and you can export your data before leaving.", category: "Billing" },
  { id: "faq-03", question: "Is there a free trial?", answer: "Yes — a 14-day trial with full Pro access. No credit card required.", category: "Billing" },
  { id: "faq-04", question: "How do I reset my password?", answer: "Click “Forgot password” on the login page and follow the reset link sent to your inbox.", category: "Account" },
  { id: "faq-05", question: "How do I delete my account?", answer: "Go to Settings → Account, scroll down, and confirm deletion. This cannot be undone.", category: "Account" },
  { id: "faq-06", question: "How do I export my data?", answer: "Navigate to Settings → Data and choose Export all. You receive a zip file by email within 24 hours.", category: "Account" },
  { id: "faq-07", question: "Do you offer an SLA?", answer: "Enterprise plans include a 99.9% uptime SLA with 24/7 support and 1-hour response time.", category: "Support" },
  { id: "faq-08", question: "How do I contact support?", answer: "Email support@example.com, use the in-app chat, or call 1-800-555-0199 for urgent issues.", category: "Support" },
];

export function createFaqMockAdapter(latencyMs = 400): ApiAdapter<FaqRecord> {
  return createMockStore<FaqRecord>({
    resource: "faqs",
    seed: mockFaqs,
    getId: (faq) => faq.id,
    searchFields: ["question", "answer", "category"],
    latencyMs,
  });
}

interface FaqApiResponse {
  id: number | string;
  question?: string;
  q?: string;
  answer?: string;
  a?: string;
  category?: string;
}

/** Maps a backend FAQ payload onto FaqRecord; rejects unexpected shapes. */
export function mapFaqResponse(raw: FaqApiResponse): FaqRecord {
  const question = raw.question ?? raw.q;
  const answer = raw.answer ?? raw.a;
  if (!raw || typeof raw !== "object" || typeof question !== "string" || typeof answer !== "string") {
    throw new ApiError("invalid-response", "Unexpected FAQ shape from the API.");
  }
  return {
    id: String(raw.id),
    question,
    answer,
    category: raw.category ?? "General",
  };
}

export function createFaqRealAdapter(config: ApiConfig): ApiAdapter<FaqRecord> | null {
  const baseUrl = config.baseUrl?.trim();
  if (!baseUrl) return null;
  return {
    mode: "real",
    resource: "faqs",
    async list(query?: PageQuery, signal?: AbortSignal) {
      const { data } = await fetchJson<FaqApiResponse[]>(
        buildUrl(baseUrl, "/faqs", { search: query?.search }),
        { headers: config.headers, timeoutMs: config.timeoutMs, signal },
      );
      if (!Array.isArray(data)) {
        throw new ApiError("invalid-response", "Expected a JSON array from GET /faqs.");
      }
      const mapped = data.map(mapFaqResponse);
      const store = createMockStore<FaqRecord>({
        resource: "faqs",
        seed: mapped,
        getId: (faq) => faq.id,
        searchFields: ["question", "answer", "category"],
        latencyMs: 0,
      });
      return store.list({ ...query, search: undefined });
    },
    async getById(id, signal) {
      const { data } = await fetchJson<FaqApiResponse>(buildUrl(baseUrl, `/faqs/${id}`), {
        headers: config.headers,
        timeoutMs: config.timeoutMs,
        signal,
      });
      return mapFaqResponse(data);
    },
  };
}

/** One-line mode switch — same interface for mock and real. */
export function createFaqApi(config: ApiConfig): ApiAdapter<FaqRecord> | null {
  if (config.mode === "real") return createFaqRealAdapter(config);
  return createFaqMockAdapter(config.mockLatencyMs);
}
