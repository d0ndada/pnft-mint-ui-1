// import { MintCard } from "@/components/ui/minting/mint-card"
// import { MintNav } from "@/components/mint-nav"
// import { AboutSection } from "@/components/ui/index-page/about-section";
// import { RoadmapSection } from "@/components/ui/index-page/roadmap-section";
// import CollectionSection from "@/components/ui/index-page/collection-section";
// import { TeamSection } from "@/components/ui/index-page/team-section";
// import { FaqSection } from "@/components/ui/index-page/faq-section";
// import BottomSection from "@/components/ui/index-page/bottom-section"
// import "../styles/globals.css"



// export default function IndexPage() {
//   return (
//     // md:py-10, pt-6, pl-[40%]
//     <>
//     <section className="animate-bgGlow container  flex h-[100vh] flex-col items-center gap-6 bg-main pb-8  scroll-snap-align-start  ">
//         <div className="mt-[100px] flex max-w-[100%] animate-fadeIn flex-col items-center gap-2 ">
//           <div>
//             <h1 className=" mt-[5%] text-3xl font-extrabold leading-tight tracking-tighter text-textColor md:text-4xl ">
//               Welcome to Soljuice: Harness the Power of Solar NFTs!
//             </h1>
//           </div>
//           <div className="mt-[15%] flex animate-fadeIn flex-col items-center ">
//         <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-textColor md:text-3xl ">
// Ready to Mint Your Solar NFT?              <br className="hidden sm:inline" />
//         </h1>
//         <p className="mt-4 max-w-[730px] text-lg text-muted-foreground">
//                           Dive into the world of renewable energy and blockchain. Click below to start your journey.

//             </p>
//             <div className="mt-[4%]">
//               <MintNav />
//               </div>
//             </div>
//       </div>
//       </section>
//       <AboutSection />
//       <CollectionSection/>
//       <RoadmapSection />
//       <TeamSection />
//       <FaqSection />
//       <BottomSection/>
// <footer></footer>

      
     
     
      
//       </>
//   )
// }


"use client"

import { useParams } from "next/navigation"
import { MintCard } from "@/components/ui/minting/mint-card"
import { MintNav } from "@/components/mint-nav"
// import { NftSlide } from "@/components/ui/dynamic/nftslide"
// import { WalletNav } from "@/components/wallet-page"
// import { Wallet } from "lucide-react"
// import "@/styles/globals.css"

export default function GroupPage() {
  const { group } = useParams()
    const groupString = Array.isArray(group) ? group[0] : group;

  return (
    

    <section className="container grid items-center gap-6 bg-gradient-to-b from-mintingBg to-mintingBg2  pb-8 pt-6 md:py-10 ">
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
}



