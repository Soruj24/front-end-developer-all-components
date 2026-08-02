export const userProfile = {
  id: "user_42",
  active: true,
  username: "ada.lovelace",
  email: "ada@example.com",
  roles: ["admin", "maintainer"],
  profile: {
    fullName: "Ada Lovelace",
    bio: "First programmer. Mathematician, writer, visionary.",
    avatar: null,
    website: "https://ada.example.com",
    social: {
      github: "@adalovelace",
      twitter: "@ada_l",
      linkedin: null,
    },
  },
  settings: {
    theme: "dark",
    notifications: {
      email: true,
      push: true,
      digest: "weekly",
      quietHours: { start: "22:00", end: "07:00" },
    },
    privacy: { showOnlineStatus: false, profileVisibility: "public" },
  },
  usage: {
    storage: { usedMB: 1284, quotaMB: 5120 },
    apiRequests: 38291,
    lastActive: "2026-07-31T08:42:11Z",
  },
  metrics: [
    { date: "2026-07-25", requests: 1204, errors: 3 },
    { date: "2026-07-26", requests: 988, errors: 1 },
    { date: "2026-07-27", requests: 1542, errors: 0 },
  ],
};

export const nestedConfig = {
  service: "orders-api",
  version: "2.4.1",
  environments: {
    production: {
      url: "https://api.example.com",
      region: "eu-west-1",
      replicas: 4,
      enabled: true,
    },
    staging: {
      url: "https://staging.api.example.com",
      region: "us-east-1",
      replicas: 2,
      enabled: true,
    },
  },
  features: {
    search: { enabled: true, index: "orders_v3", fuzzyThreshold: 0.72 },
    cache: { ttlSeconds: 300, provider: "redis", cluster: ["r-1", "r-2", "r-3"] },
    retries: { max: 5, backoff: "exponential", jitter: 0.1 },
  },
  limits: { maxPayloadBytes: 1048576, ratePerSecond: 100 },
  flags: [true, false, false, true, true],
};

export const largePayload = {
  schemaVersion: "1.0",
  generated: true,
  source: "telemetry.edge.prod",
  intervals: 5,
  unit: "seconds",
  points: Array.from({ length: 5000 }, (_, i) => ({
    t: i * 5,
    cpu: Number((0.2 + 0.6 * Math.abs(Math.sin(i / 40))).toFixed(3)),
    mem: Number((0.4 + 0.2 * Math.cos(i / 90)).toFixed(3)),
    rps: Math.round(120 + 80 * Math.abs(Math.sin(i / 15))),
    errors: i % 97 === 0 ? 1 : 0,
  })),
};

export const apiResponse = {
  ok: true,
  status: 200,
  requestId: "req_9f2c1b",
  tookMs: 142,
  data: {
    projects: [
      {
        id: "prj_01",
        name: "Atlas",
        private: false,
        stars: 12480,
        languages: ["TypeScript", "Rust", "CSS"],
        owner: { login: "atlas-team", verified: true, plan: "free" },
      },
      {
        id: "prj_02",
        name: "Nimbus",
        private: true,
        stars: 0,
        languages: ["Go"],
        owner: { login: "acme-internal", verified: true, plan: "enterprise" },
      },
    ],
    pagination: { page: 1, perPage: 10, total: 2 },
  },
};
