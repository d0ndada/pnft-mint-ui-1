"use client"

import { useParams } from "next/navigation"
import { MintCard } from "@/components/ui/minting/mint-card"
import { MintNav } from "@/components/mint-nav"
import { useEffect, useState } from "react"
import Image from 'next/image';

// import { NftSlide } from "@/components/ui/dynamic/nftslide"
// import { WalletNav } from "@/components/wallet-page"
// import { Wallet } from "lucide-react"
// import "@/styles/globals.css"

export default function GroupPage() {
  const { group } = useParams()
  const groupString = Array.isArray(group) ? group[0] : group;
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay
  }, []);

  return (
    isLoading ? (
          <div className="mt-[20%] flex h-full w-full items-center justify-center">
    <Image src="/loader.gif" width={100} height={100} alt="Loading..." />
  </div>

    ) : (
    <section className="container grid items-center gap-6 bg-gradient-to-b from-mintingBg to-mintingBg2  pb-8 pt-6 md:py-10  ">
      <div className=" flex max-w-[980px] flex-col items-start gap-2">
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
    )
    
  )
}