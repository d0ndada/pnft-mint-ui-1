export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "SolJuice",
  description: "MintUI with Radix UI and Tailwind CSS.",
  mainNav: [
    // {
    //   title: "Home",
    //   href: "/",
    // },
    {
      title: "About",
      href: "/#about",
    },
    {
      title: "Collection",
      href: "/#collection",
    },
    {
      title: "Roadmap",
      href: "/#roadmap",
    },
    {
      title: "Team",
      href: "/#team",
    },
    {
      title: "FAQ",
      href: "/#faq",
    },
    // for owned nft later!
    {
      title: "Stake",
      href: "/stake",
    },
  ],
  links: {
    twitter: "",
    discord: "",
    docs: "",
  },
}
