import { MintCard } from "@/components/ui/minting/mint-card"
import { MintNav } from "@/components/mint-nav"
import { NftSlide } from "@/components/ui/dynamic/nftslide"

export default function IndexPage() {
  return (
    // md:py-10, pt-6, pl-[40%]
    <>
    <section className="background container  flex h-[100vh] flex-col items-center gap-6 pb-8    ">
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
      <section id="about" className="bg-secondary h-[100vh] " >
        <div>About</div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias illo mollitia perspiciatis quaerat magnam doloremque fugiat repudiandae perferendis in nisi, enim quibusdam, debitis dicta delectus impedit! Debitis porro mollitia repudiandae!</p>
      </section>
      {/* put in more maybe  */}
      <section id="collection" className="h-[70vh] " >
        <div>Feutured soljuces</div>
        <NftSlide/>
      </section>
      <section id="roadmap" className="h-[100vh] bg-secondary " >
        <div>Roadmap</div>
      </section>
      
      <section id="team" className="h-[100vh] bg-card " >
        <div>Team</div>
      </section>
      <section id="faq" className="h-[100vh] bg-secondary " >
        <div>FAQ</div>
        
      </section>
      <section className="h-[50vh] bg-card " >
        <div>
          <button>join discord</button>
        </div>
        
      </section>
      </>
  )
}

// make it so when the user scrool it like down it wtisht to other view in page and etc better user experience