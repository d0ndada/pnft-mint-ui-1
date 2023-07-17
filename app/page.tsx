import { MintCard } from "@/components/ui/mint-card"
import { MintNav } from "@/components/mint-nav"

export default function IndexPage() {
  return (
    // md:py-10, pt-6, pl-[40%]
    <section className="container mt-[100px] flex  flex-col items-center gap-6 pb-8    ">
      <div className="flex max-w-[980px] flex-col items-start gap-2 ">
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
  )
}
