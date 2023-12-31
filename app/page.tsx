"use client"
import { MintCard } from "@/components/ui/minting/mint-card"
import { MintNav } from "@/components/mint-nav"
import { AboutSection } from "@/components/ui/index-page/about-section";
import { RoadmapSection } from "@/components/ui/index-page/roadmap-section";
import CollectionSection from "@/components/ui/index-page/collection-section";
import { TeamSection } from "@/components/ui/index-page/team-section";
import { FaqSection } from "@/components/ui/index-page/faq-section";
import "../styles/globals.css"
import Footer from "@/components/footer";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";



export default function IndexPage() {
   const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
   useEffect(() => {
    // This function will run whenever the route changes
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // remove the '#'
      // setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      // }, 10); // Adjust the delay as needed
    }
  }, []);
  return (
    // md:py-10, pt-6, pl-[40%]
    <>
    <section  className="custom-container  flex h-[100vh] flex-col items-center gap-6 bg-main px-4  pb-8 scroll-snap-align-start ">
        <div ref={ref} className={`mt-[100px] flex max-w-[100%]  flex-col items-center gap-2 ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'}`}>
          <div>
            <h1 className=" mt-[5%] text-3xl font-extrabold leading-tight tracking-tighter text-textColor md:text-4xl ">
              Welcome to SolJuice: Harness the Power of Solar NFTs!
            </h1>
          </div>
          <div className="mt-[15%] flex animate-fadeIn flex-col items-center ">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter text-textColor md:text-3xl ">
Ready to Mint Your Solar NFT?              <br className="hidden sm:inline" />
        </h1>
        <p className="mt-4 max-w-[730px] text-lg text-muted-foreground">
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
      <Footer enableScrollSnap={true}/>

      </>
  )
}






