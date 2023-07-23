import { MintCard } from "@/components/ui/minting/mint-card"
import { MintNav } from "@/components/mint-nav"
import { AboutSection } from "@/components/ui/index-page/about-section";
import { RoadmapSection } from "@/components/ui/index-page/roadmap-section";
import CollectionSection from "@/components/ui/index-page/collection-section";
import { TeamSection } from "@/components/ui/index-page/team-section";
import { FaqSection } from "@/components/ui/index-page/faq-section";
import BottomSection from "@/components/ui/index-page/bottom-section"



export default function IndexPage() {
  return (
    // md:py-10, pt-6, pl-[40%]
    <>
    <section className="background container  flex h-[100vh] flex-col items-center gap-6 pb-8 scroll-snap-align-start    ">
      <div className="mt-[100px] flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Mint Soljuice NFT
          <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          clieck on the text to start minting
        </p>
      </div>
      <MintNav />
      </section>
      <AboutSection />
      {/* <CollectionSection/> */}
      <RoadmapSection />
      <TeamSection />
      <FaqSection />
      <BottomSection/>
<footer></footer>

      
     
     
      
      </>
  )
}





