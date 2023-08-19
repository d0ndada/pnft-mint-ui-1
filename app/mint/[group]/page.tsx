"use client"

import { useParams } from "next/navigation"

import { MintCard } from "@/components/ui/minting/mint-card"
import { MintNav } from "@/components/mint-nav"
import { NftSlide } from "@/components/ui/dynamic/nftslide"
import { WalletNav } from "@/components/wallet-page"
import { Wallet } from "lucide-react"

export default function GroupPage() {
  const { group } = useParams()
    const groupString = Array.isArray(group) ? group[0] : group;

  return (
    <>
    <section className="  container grid items-center gap-6 pb-8 pt-6 md:py-10 ">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        {/* <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1> */}
        {/* <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p> */}
      </div>
        <MintNav />
      <div className=" flex flex-col justify-between gap-4 md:flex-row ">
        <div
          className="h-100 hidden w-[36%] rounded-xl bg-cover bg-center md:block"
          style={{
            backgroundImage:
              "url(/preview.gif)",
          }}
        />
        <MintCard group={groupString} className="w-full md:w-1/2" />
      </div>
    </section>
      {/* <NftSlide /> */}
      </>
  )
}
