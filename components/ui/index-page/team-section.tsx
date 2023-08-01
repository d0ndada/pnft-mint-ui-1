"use client"
import Image from "next/image";
import { useInView } from 'react-intersection-observer';


interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
}

export const TeamSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });
  function TeamMember({ image, name, role }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center space-y-2  border-2 border-black">
      <Image  className="rounded-full" width={300} height={300} src={image} alt={name} />
      <div className="justify-flex flex w-[100%] flex-col items-center bg-[#ffebcd]">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-500">{role}</p>
   </div>
      </div>
  );


}
  return (
   
    <section id="team" className="flex h-[100vh] flex-col items-center justify-evenly  space-y-8  scroll-snap-align-start">
      <div>
  <h2 ref={ref} className={`text-3xl font-bold text-foreground ${inView ? 'animate-fade-in-up' : ''} `}>Our Team</h2>
  </div>
        <div  className="grid grid-cols-2 gap-12">
    <TeamMember image="/assets/0.png" name="John Doe" role="CEO" />
    <TeamMember image="/assets/2.png" name="Jane Doe" role="CTO" />
    {/* <TeamMember image="/assets/3.png" name="Someone Else" role="Designer" /> */}
    {/* Add more team members as needed */}
  </div>
</section>
  )
}
