"use client"
import { useInView } from 'react-intersection-observer';

interface RoadmapEventProps {
  position: string;
  title: string;
  description: string;
}

export const RoadmapSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });
  function RoadmapEvent({ position, title, description }:RoadmapEventProps) {
  return (
    <div className={`mb-10  flex ${inView ? 'animate-fade-in-right' : ''}`}>
      {/* Position */}
      <div className="mr-4 flex flex-col items-center">
        <h3   className="mb-2 text-4xl font-bold text-foreground">{position}.</h3>
        {/* Line */}
{ position !=="3"    &&    <div className="mb-[-9vh] w-1 grow bg-foreground "></div>
}      </div>
      {/* Event details */}
      <div className="flex flex-col items-start rounded-lg border-2 border-foreground p-4">
        <h4 className="mb-2 text-2xl font-bold text-foreground">{title}</h4>
        <p className="text-lg text-foreground">{description}</p>
      </div>

    </div>
  );
}
  return (
   <section id="roadmap" className="conntent-space grid h-[100vh] grid-cols-2 items-center justify-items-center  px-10 scroll-snap-align-start" >
        <div className="mt-[-46%] flex flex-col" >
        <h2 ref={ref} className={`col-start-1 mb-8 text-3xl font-bold text-foreground ${inView ? 'animate-fade-in-up' : ''} `} >Roadmap</h2>
        <p ref={ref} className={`text-lg text-foreground ${inView ? 'animate-fade-in-up' : ''} `}>
           Our roadmap outlines the journey of [Project Name] and the milestones we aim to achieve. 
        As we progress, we&apos;re committed to keeping our community informed and involved. Each step 
        on this roadmap not only represents our goals but also underscores our dedication to creating 
        a unique and valuable experience for our users. Dive in to see what&apos;s coming next and how 
        we&apos;re making [Project Name] even better!
    </p>
      </div>
      {/* ml-[-32%] */}
        <div className="col-start-2  flex flex-col gap-12">
    {/* Roadmap events */}
    <RoadmapEvent position="1" title="Lucky Buddha Launch" description="Now Available on Opensea" />
    <RoadmapEvent position="2" title="Foo Dogs" description="A FREE NFT for all Lucky Buddha owners" />
    <RoadmapEvent position="3" title="??????????" description="A surprise collection coming soon" />
  </div>
</section>
  )
}
