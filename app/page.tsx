import { MintCard } from "@/components/ui/minting/mint-card"
import { MintNav } from "@/components/mint-nav"
import { NftSlide } from "@/components/ui/dynamic/nftslide"
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
interface RoadmapEventProps {
  position: string;
  title: string;
  description: string;
}
interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
}

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
     <section id="about" className="flex h-[100vh] flex-col items-center justify-center space-y-10 bg-secondary p-5 text-white scroll-snap-align-start">
        <h2 className="mt-[-19%] p-[6%] text-4xl font-bold text-black">About Us</h2>
        <div className="flex flex-row-reverse">
    <p className="max-w-[700px] text-center text-black">
      We are a team of passionate individuals committed to creating an outstanding NFT platform. Our mission is to drive the adoption of NFT technology in various industries, and make it accessible to everyone.
    </p>
    <div className="flex justify-center gap-5">
      <div className="relative h-[200px] w-[300px]">
        <Image src="/assets/4.png" width={200} height={200} alt="Image description" />
      </div>
     </div>
    </div>
    
</section>
      {/* put in more maybe  */}
      {/* <section id="collection" className="h-[70vh] scroll-snap-align-start" >
        <div>Feutured soljuces</div>
        <NftSlide/>
      </section> */}
<section id="roadmap" className="flex h-[100vh] flex-col  justify-center bg-secondary px-10 scroll-snap-align-start" >
  <h2 className="mb-8 text-3xl font-bold text-foreground">Roadmap</h2>
  <div className="ml-[50%] flex  flex-col gap-12 ">
    {/* Roadmap events */}
    <RoadmapEvent position="1" title="Lucky Buddha Launch" description="Now Available on Opensea" />
    <RoadmapEvent position="2" title="Foo Dogs" description="A FREE NFT for all Lucky Buddha owners" />
    <RoadmapEvent position="3" title="??????????" description="A surprise collection coming soon" />
  </div>
</section>



      
     <section id="team" className="flex h-[100vh] flex-col items-center justify-center space-y-8 bg-card scroll-snap-align-start">
  <h2 className="text-3xl font-bold text-white">Our Team</h2>
  <div className="grid grid-cols-3 gap-8">
    <TeamMember image="/assets/0.png" name="John Doe" role="CEO" />
    <TeamMember image="/assets/2.png" name="Jane Doe" role="CTO" />
    <TeamMember image="/assets/3.png" name="Someone Else" role="Designer" />
    {/* Add more team members as needed */}
  </div>
</section>
      <section id="faq" className="h-[100vh] bg-secondary scroll-snap-align-start" >
        <div>FAQ</div>
        
      </section>
      <footer className="h-[25vh] bg-card scroll-snap-align-start" >
         <Link
              href={siteConfig.links.discord}
              // target="_blank"
              // rel="noreferrer"
              className="hidden md:block"
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
              className="hidden md:block"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
        
      </footer>
      </>
  )
}

function RoadmapEvent({ position, title, description }:RoadmapEventProps) {
  return (
    <div className="mb-10  flex">
      {/* Position */}
      <div className="mr-4 flex flex-col items-center">
        <h3 className="mb-2 text-4xl font-bold text-black">{position}.</h3>
        {/* Line */}
{ position !=="3"    &&    <div className="mb-[-9vh] w-1 grow bg-black "></div>
}      </div>
      {/* Event details */}
      <div className="flex flex-col items-start rounded-lg border-2 border-black p-4">
        <h4 className="mb-2 text-2xl font-bold text-black">{title}</h4>
        <p className="text-lg text-black">{description}</p>
      </div>

    </div>
  );
}



function TeamMember({ image, name, role }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Image className="rounded-full" width={200} height={200} src={image} alt={name} />
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-500">{role}</p>
    </div>
  );
}