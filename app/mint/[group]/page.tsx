"use client"

import { useParams } from "next/navigation"
import { MintCard } from "@/components/ui/minting/mint-card"
import { MintNav } from "@/components/mint-nav"
import { useEffect, useState } from "react"
import Image from 'next/image';
import Footer from "@/components/footer"

import "@/styles/globals.css"
import { useInView } from "react-intersection-observer"

export default function GroupPage() {
  const { group } = useParams()
  const groupString = Array.isArray(group) ? group[0] : group;
  const [isLoading, setIsLoading] = useState(true);
   const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  useEffect(() => {
      window.scrollTo(0, 0);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay
  }, []);

  return (
      <div className="flex min-h-screen flex-col">
      <div ref={ref} className={`grow bg-gradient-to-b from-mintingBg to-mintingBg2 ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'} `}>
        {isLoading ? (
          <div className="mt-[20%] flex h-full w-full items-center justify-center">
            <Image src="/loader.gif" width={100} height={100} alt="Loading..." />
          </div>
        ) : (
          <section className="custom-container grid items-center gap-6   pb-8 pt-6 md:py-10">
            <MintNav />
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div
                className="h-100 hidden w-[36%] rounded-xl bg-cover bg-center shadow-md md:block"
                style={{ backgroundImage: "url(/preview.gif)" }}
              />
              <MintCard group={groupString} className="w-full md:w-1/2" />
            </div>
          </section>
        )}
      </div>
      <Footer enableScrollSnap={false} />
    </div>
  )
}