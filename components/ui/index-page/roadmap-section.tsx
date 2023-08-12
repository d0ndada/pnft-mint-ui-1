"use client"
import React from 'react';
import { useInView } from 'react-intersection-observer';
import "../../../styles/globals.css"

interface RoadmapEventProps {
  position: string;
  title: string;
  description: string;
  tooltipContent?: string;
    status: 'completed' | 'ongoing' | 'upcoming';

}

export const RoadmapSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  function RoadmapEvent({ position, title, description, tooltipContent, status }: RoadmapEventProps) {
    const [isHovered, setIsHovered] = React.useState(false);

    const getStatusColor = () => {
        switch (status) {
            case 'completed': return 'text-green-500';
            case 'ongoing': return 'text-blue-500';
            default: return 'text-gray-500';
        }
    };

    const getStatusStyles = () => {
        switch (status) {
            case 'completed': return 'line-through text-opacity-60';
            case 'ongoing': return '';
            default: return 'text-gray-500';
        }
    };
      const getLineColor = () => {
        if (status === 'completed') return 'bg-green-500';
        return 'bg-foreground';
    };


    return (
        <div
          
            className={`mb-10 flex position-relative  ${inView ? 'animate-fade-in-right' : ''}`}
        >
            <div className="mr-4 flex flex-col items-center">
                <h3 className={`roadmap-number mb-2 text-4xl font-bold text-foreground ${getStatusColor()} ${getStatusStyles()}`}>{position}.</h3>
                {position !== "3" && <div className={`mb-[-9vh] w-1 grow ${getLineColor()}`}></div>}
            </div>
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}className={`flex flex-col items-start rounded-lg border-2 border-foreground p-4 ${getStatusColor()}  roadmap-info`}>
                <h4 className={`mb-2 text-2xl font-bold text-foreground ${status === 'completed' ? 'line-through' : ''}`}>
                    {status === 'completed' && <span className="text-green-500 mr-2">✓</span>}
                    {title}
                </h4>
                <p className={`text-lg text-foreground ${status === 'completed' ? 'line-through' : ''}`}>{description}</p>
            </div>

            {/* Tooltip */}
            {isHovered && tooltipContent && (
                <div className="roadmap-tooltip animated-tooltip">
                    <p className="text-lg text-foreground">{tooltipContent}</p>
                </div>
            )}
        </div>
    );
}
  return (
    <section id="roadmap" className="content-space grid h-[100vh] grid-cols-2 items-center justify-items-center px-10 scroll-snap-align-start">
      <div className="mt-[-46%] flex flex-col">
        <h2 ref={ref} className={`col-start-1 mb-8 text-3xl font-bold text-foreground ${inView ? 'animate-fade-in-up' : ''}`}>Roadmap</h2>
        <p ref={ref} className={`text-lg text-foreground ${inView ? 'animate-fade-in-up' : ''}`}>
          Our roadmap outlines the journey of [Project Name] and the milestones we aim to achieve. 
          As we progress, we&apos;re committed to keeping our community informed and involved. Each step 
          on this roadmap not only represents our goals but also underscores our dedication to creating 
          a unique and valuable experience for our users. Dive in to see what&apos;s coming next and how 
          we&apos;re making [Project Name] even better!
        </p>
      </div>
      <div className="col-start-2 flex flex-col gap-12">
        <RoadmapEvent 
          position="1" 
          title="Pre-Mint" 
          description="Exclusive minting phase for early supporters." 
          tooltipContent="An exclusive opportunity for early believers and supporters to mint the NFTs before the general public."
          status="completed"
        />
        <RoadmapEvent 
          position="2" 
          title="Public Mint" 
          description="NFTs available for minting by the general public." 
          tooltipContent="The main launch event where the NFTs are made available to everyone for minting."
          status="ongoing"
        />
        <RoadmapEvent 
          position="3" 
          title="Staking" 
          description="Stake your NFTs to earn rewards." 
          tooltipContent="NFT holders can stake their NFTs to earn rewards, adding utility and incentivizing holding."
          status="upcoming"
        />
      </div>
    </section>
  )
}
