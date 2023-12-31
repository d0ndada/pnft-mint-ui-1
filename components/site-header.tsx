"use client"

import Link from "next/link"
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import "../styles/globals.css"



const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((module) => module.WalletMultiButton),
  {
    ssr: false,
    loading: () => (
       <div className="inline-block h-11 w-[166px] animate-pulse rounded border border-gray-300 bg-gray-200 px-4 py-2">
        
      </div>
    )
  }
);



export function SiteHeader() {
  
  
  return (
    <header className="sticky top-0 z-40 hidden w-full border-b  bg-header  px-4 shadow-md md:block">
      <div className="custom-container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.discord}
              // target="_blank"
              // rel="noreferrer"
              className="hidden transition-all hover:scale-105 md:block"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.discord className="h-5 w-7" />
                <span className="sr-only">Discord</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              // target="_blank"
              // rel="noreferrer"
              className="hidden transition-all hover:scale-105 md:block"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current " />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
         
<div className="transition-all hover:scale-105">
    <WalletMultiButton  />
</div>


              <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
