export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Soljuice",
  description: "MintUI with Radix UI and Tailwind CSS.",
  mainNav: [
    // {
    //   title: "Home",
    //   href: "/",
    // },
   {
      title: "About",
      href: "#about",
    },
      {
      title: "Collection",
      href: "#collection",
    },   {
      title: "Roadmap",
      href: "#roadmap",
    },
         {
      title: "Team",
      href: "#team",
    },
            {
      title: "FAQ",
      href: "#faq",
    },
    // for owned nft later!
    {
      title: "Your wallet(coming soon)",
      href: "/wallet",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    discord: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
