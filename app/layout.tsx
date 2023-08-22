import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { font } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toast/toaster"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import { SolanaWalletContext } from "../components/solana"
// import { MovingItems } from "@/components/ui/dynamic/mvoingItems"
import { NftSlide } from "@/components/ui/dynamic/nftslide"
import Head from "next/head"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}


interface RootLayoutProps {
  children: React.ReactNode;
  enableScrollSnap?: boolean;
}

export default function RootLayout({ children,enableScrollSnap = false}: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className="overflow-y-scroll font-sans scroll-snap-type-y scroll-behavior-smooth">
        <Head>
          
           <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
        <body
          className={cn(
            "  min-h-screen  font-sans antialiased ",
            font.variable
          )}
          >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SolanaWalletContext>
              <div className="relative flex min-h-screen flex-col ">
                <SiteHeader />
                <div className="flex-1">{children}
        
                </div>
                
              </div>
              <TailwindIndicator />
            </SolanaWalletContext>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
