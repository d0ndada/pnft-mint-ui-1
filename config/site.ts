export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Mint",
  description: "MintUI with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Wallet(coming soon)",
      href: "/wallet",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    discord: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
