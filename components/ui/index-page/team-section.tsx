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
        <div className={`border-#E0E0E0 flex w-[80%] flex-col items-center border-2 transition-transform hover:scale-105`}>
      <div className="transistion-shadow flex h-[250px] w-full items-center justify-center bg-[background] hover:shadow-lg "> 
        <Image className="border-#E0E0E0 rounded-full border-4" width={250} height={250} src={image} alt={name} />
      </div>
      <div className="justify-flex flex w-[100%] flex-col items-center border-2 bg-muted p-2">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-m pb-1 text-foreground  decoration-primary decoration-2">{role}</p>
        <p className="text-#7D7D7D-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

  return (
 <section id="team" className="flex h-[100vh] flex-col  items-center space-y-8  bg-teamBg px-4 py-12 scroll-snap-align-start">
        <h2 ref={ref} className={`mt-[5%] text-3xl font-bold text-foreground ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'}`}>Our Team</h2>
        
        <div className={`flex w-[80%] max-w-6xl flex-col items-center space-y-8  ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'}`}> {/* This is the flex container */}
            <div className=" flex w-[80%] gap-[7rem]">
                <TeamMember image="/assets/0.png" name="John Doe" role="Lead Developer" description="The technical brain behind [Project Name]. Responsible for all technical aspects, from setting up the CandyMachine to crafting the user interface." />
                <TeamMember image="/assets/2.png" name="Jane Doe" role="Lead Artist" description="The creative genius behind our unique NFT images. Crafted each piece with a keen eye for detail and a passion for [specific art style or theme]." />
            </div>

        <div ref={ref} className={`border-#E0E0E0 flex flex-col  items-center border-2 bg-header p-1  transition-shadow hover:shadow-md md:w-2/3  ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'}`}> {/* Adjusted width for responsiveness */}
                <h3 className="text-m font-bold text-foreground">Transparency Note</h3>
                <p className="text-#7D7D7D text-sm">We value transparency and trust. Our team is currently using pseudonyms for privacy reasons. As our project grows and evolves, we&apos;ll provide more details about our team and our backgrounds.</p>
            </div>
        </div>
    </section>
  )
}
