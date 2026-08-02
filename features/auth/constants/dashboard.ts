export interface AccountNavItem {
  label: string;
  href: string;
  icon: string;
}

export interface AccountNavGroup {
  group: string | null;
  items: AccountNavItem[];
}

export const ACCOUNT_NAV: AccountNavGroup[] = [
  {
    group: "Account",
    items: [
      {
        label: "Overview",
        href: "/account",
        icon: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z",
      },
      {
        label: "Profile",
        href: "/account/profile",
        icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5Z",
      },
    ],
  },
  {
    group: "Content",
    items: [
      {
        label: "My Components",
        href: "/account/components",
        icon: "M21 8l-9-5-9 5v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v9",
      },
      {
        label: "Drafts",
        href: "/account/drafts",
        icon: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z",
      },
      {
        label: "Published",
        href: "/account/published",
        icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
      },
      {
        label: "Collections",
        href: "/account/collections",
        icon: "M4 5h6l2 2h8v12H4V5Z",
      },
      {
        label: "Bookmarks",
        href: "/account/bookmarks",
        icon: "M12 5l2.5 5 5.5.8-4 3.9.9 5.5L12 17.9 7.1 20.2l.9-5.5-4-3.9L9.5 10 12 5Z",
      },
      {
        label: "Downloads",
        href: "/account/downloads",
        icon: "M12 3v12m0 0 4-4m-4 4-4-4M4 21h16",
      },
    ],
  },
  {
    group: "Platform",
    items: [
      {
        label: "API Keys",
        href: "/account/api-keys",
        icon: "M14 10l2 2m0-5 3 3M4 20l5-5m3-3 4-4 3 3-4 4-3-3Z",
      },
      {
        label: "AI Usage",
        href: "/account/ai-usage",
        icon: "M9.9 3.5l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2ZM18 14l.7 1.8 1.8.7-1.8.7L18 19l-.7-1.8-1.8-.7 1.8-.7L18 14ZM6 14l.5 1.3 1.3.5-1.3.5L6 17.6l-.5-1.3-1.3-.5 1.3-.5L6 14Z",
      },
      {
        label: "Notifications",
        href: "/account/notifications",
        icon: "M12 3a5 5 0 0 1 5 5c0 6 2 7 2 7H5s2-1 2-7a5 5 0 0 1 5-5Zm-2 14a2 2 0 0 0 4 0",
      },
      {
        label: "Connected accounts",
        href: "/account/connections",
        icon: "M10 13a4 4 0 0 0 4 4h3a4 4 0 0 0 0-8h-3m-4 2a4 4 0 0 0-4-4H3a4 4 0 0 0 0 8h3",
      },
    ],
  },
  {
    group: "Security",
    items: [
      {
        label: "Security",
        href: "/account/security",
        icon: "M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z",
      },
      {
        label: "Sessions",
        href: "/account/sessions",
        icon: "M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
      },
      {
        label: "Login history",
        href: "/account/history",
        icon: "M12 3a9 9 0 1 0 9 9m-9-9v9l5 3",
      },
    ],
  },
  {
    group: null,
    items: [
      {
        label: "Settings",
        href: "/account/settings",
        icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-3a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 0 0-2-1.2L14 3h-4l-.4 2.5a7 7 0 0 0-2 1.2l-2.4-.9-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-.9a7 7 0 0 0 2 1.2L10 21h4l.4-2.5a7 7 0 0 0 2-1.2l2.4.9 2-3.4-2-1.6c.06-.4.1-.8.1-1.2Z",
      },
    ],
  },
];
