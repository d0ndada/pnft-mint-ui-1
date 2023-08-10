import { MintCard } from "@/components/ui/minting/mint-card"
import { MintNav } from "@/components/mint-nav"
import { AboutSection } from "@/components/ui/index-page/about-section";
import { RoadmapSection } from "@/components/ui/index-page/roadmap-section";
import CollectionSection from "@/components/ui/index-page/collection-section";
import { TeamSection } from "@/components/ui/index-page/team-section";
import { FaqSection } from "@/components/ui/index-page/faq-section";
import BottomSection from "@/components/ui/index-page/bottom-section"
import "../styles/globals.css"



export default function IndexPage() {
  return (
    // md:py-10, pt-6, pl-[40%]
    <>
    <section className="background container  flex h-[100vh] flex-col items-center gap-6 pb-8 scroll-snap-align-start  animate-bgGlow  ">
        <div className="mt-[100px] flex max-w-[100%] flex-col items-center gap-2 animate-fadeIn ">
          <div>
            <h1 className=" text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl ">
              Welcome to Soljuice: Harness the Power of Solar NFTs!
            </h1>
          </div>
          <div className="mt-[15%] flex flex-col items-center animate-fadeIn ">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-3xl ">
Ready to Mint Your Solar NFT?              <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[730px] text-lg text-muted-foreground mt-4">
                          Dive into the world of renewable energy and blockchain. Click below to start your journey.

            </p>
            <div className="mt-[4%]">
              <MintNav />
              </div>
            </div>
      </div>
      </section>
      <AboutSection />
      <CollectionSection/>
      <RoadmapSection />
      <TeamSection />
      <FaqSection />
      <BottomSection/>
<footer></footer>

      
     
     
      
      </>
  )
}





