"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from 'react-intersection-observer';

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  description: string;
}

export const TeamSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [teamAnimated, setTeamAnimated] = useState(false);

  const noteElementRef = useRef(null);


  const { ref, inView } = useInView({
    triggerOnce: true,
  });
    


function TeamMember({ image, name, role, description }: TeamMemberProps) {
  return (
        <div className={`flex flex-col items-center border-2 border-#E0E0E0 w-[80%] transition-transform transform hover:scale-105 ${inView ? 'animate-fade-in-up' : ''}`}>
      <div className="flex justify-center items-center bg-[#F4F4F4] w-full h-[250px] hover:shadow-lg transistion-shadow "> 
        <Image className="rounded-full" width={250} height={250} src={image} alt={name} />
      </div>
      <div className="justify-flex flex w-[100%] p-4 flex-col border-2 items-center bg-[#ffebcd]">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-m text-foreground">{role}</p>
        <p className="text-sm text-#7D7D7D-600">{description}</p>
      </div>
    </div>
  );
}

  return (
 <section id="team" className="flex flex-col items-center space-y-8 px-4 py-12 scroll-snap-align-start">
        <h2 ref={ref} className={`text-3xl font-bold text-foreground mt-[5%] ${inView ? 'animate-fade-in-up' : ''}`}>Our Team</h2>
        
        <div className="flex flex-col items-center space-y-8 w-[80%] max-w-6xl"> {/* This is the flex container */}
            <div className=" gap-12 flex w-[80%]">
                <TeamMember image="/assets/0.png" name="John Doe" role="Lead Developer" description="The technical brain behind [Project Name]. Responsible for all technical aspects, from setting up the CandyMachine to crafting the user interface." />
                <TeamMember image="/assets/2.png" name="Jane Doe" role="Lead Artist" description="The creative genius behind our unique NFT images. Crafted each piece with a keen eye for detail and a passion for [specific art style or theme]." />
            </div>

        <div ref={ref} className={`flex flex-col items-center space-y-2 border-2 border-#E0E0E0 bg-[#ffebcd] p-2  md:w-2/3 hover:shadow-md transition-shadow   ${inView ? ' animate-fade-in-up' : ''} `}> {/* Adjusted width for responsiveness */}
                <h3 className="text-xl font-bold text-foreground">Transparency Note</h3>
                <p className="text-sm text-#7D7D7D">We value transparency and trust. Our team is currently using pseudonyms for privacy reasons. As our project grows and evolves, we&apos;ll provide more details about our team and our backgrounds.</p>
            </div>
        </div>
    </section>
  )
}
