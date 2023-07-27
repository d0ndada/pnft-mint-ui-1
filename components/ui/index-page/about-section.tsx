import Image from "next/image";


export const AboutSection = () => {
  return (
     <section id="about" className="flex h-[100vh] flex-col items-center justify-center space-y-10  p-5 text-foreground scroll-snap-align-start">
        <h2 className="mt-[-19%] p-[6%] text-4xl font-bold text-foreground">About Us</h2>
        <div className="flex flex-row">
    <p className="max-w-[700px] text-left text-foreground">
      We are a team of passionate individuals committed to creating an outstanding NFT platform. Our mission is to drive the adoption of NFT technology in various industries, and make it accessible to everyone.
    </p>
    <div className="flex justify-center gap-5">
      <div className="relative ml-[12%]">
        <Image src="/assets/4.png" width={300} height={300} alt="Image description" />
      </div>
     </div>
    </div>
    
</section>
  )
}
