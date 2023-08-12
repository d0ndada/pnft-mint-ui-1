"use client"
import Image from "next/image";
import { useInView } from 'react-intersection-observer';

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  description: string;
}

export const TeamSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

 function TeamMember({ image, name, role, description }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center space-y-1 border-2 border-black">
      <Image className="" width={225} height={225} src={image} alt={name} />
      <div className="justify-flex flex w-[100%] flex-col items-center bg-[#ffebcd] ">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-lg text-gray-500">{role}</p>
        <p className="text-m text-gray-600">{description}</p>
      </div>
    </div>
  );
}


  return (
 <section id="team" className="flex flex-col items-center space-y-8 px-4 py-12 scroll-snap-align-start">
        <h2 ref={ref} className={`text-3xl font-bold text-foreground mt-[5%] ${inView ? 'animate-fade-in-up' : ''}`}>Our Team</h2>
        
        <div className="flex flex-col items-center space-y-8 w-[79%] max-w-6xl"> {/* This is the flex container */}
            <div className="grid grid-cols-2 gap-12 ">
                <TeamMember image="/assets/0.png" name="John Doe" role="Lead Developer" description="The technical brain behind [Project Name]. Responsible for all technical aspects, from setting up the CandyMachine to crafting the user interface." />
                <TeamMember image="/assets/2.png" name="Jane Doe" role="Lead Artist" description="The creative genius behind our unique NFT images. Crafted each piece with a keen eye for detail and a passion for [specific art style or theme]." />
                {/* Add more team members as needed */}
            </div>

            <div className="flex flex-col items-center space-y-2 border-2 border-black bg-[#ffebcd] p-4  md:w-2/3"> {/* Adjusted width for responsiveness */}
                <h3 className="text-xl font-bold text-foreground">Transparency Note</h3>
                <p className="text-sm text-foreground">We value transparency and trust. Our team is currently using pseudonyms for privacy reasons. As our project grows and evolves, we&apos;ll provide more details about our team and our backgrounds.</p>
            </div>
        </div>
    </section>
  )
}
