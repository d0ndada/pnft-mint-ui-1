"use client"
import React from 'react';
import Image from "next/image";
import { useInView } from 'react-intersection-observer';

export const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });

  return (
   <section id="about" className="flex h-[100vh] flex-col items-center justify-center space-y-10  p-5 text-foreground scroll-snap-align-start">
      <h2 ref={ref} className={`mt-[-5%] p-[6%] text-4xl font-bold text-foreground ${inView ? 'animate-fade-in-up' : ''}`}>Discover the Power Behind Soljuice</h2>
      <div className="flex flex-row">
        <p className={`max-w-[700px] text-left text-1xl text-foreground  hover:scale-205${inView ? 'animate-fade-in-up' : ''}`}>
         At Soljuice, we&apos;re not just another NFT platform. We&apos;re a movement, a revolution, and a bridge to a sustainable future. Our unique Solar NFTs represent more than just digital art; they symbolize a commitment to harnessing the boundless energy of the sun.
          <br /><br />
          Why Solar NFTs? The world is rapidly shifting towards renewable energy, and solar power stands at the forefront of this transformation. By merging the innovative world of NFTs with the sustainable potential of solar energy, we&apos;ve created a platform where art meets purpose. Each Solar NFT is a beacon of hope, a step towards a brighter, greener future.
          <br /><br />
          Join the Solar Revolution. Our mission goes beyond digital transactions. We aim to educate, inspire, and drive real-world change. When you mint a Solar NFT with Soljuice, you&apos;re not just acquiring a piece of art; you&apos;re becoming part of a community that believes in the power of the sun and the potential of blockchain.
      
        </p>
        <div className="flex flex-col justify-center gap-5">
          <div className={`relative ml-[12%] bg-gray-200 p-2 rounded${inView ? 'animate-fade-in-up' : ''}`}>
            <div className="bg-gray-200 p-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-990 animate-pulse">
              <Image src="/assets/4.png" width={300} height={300} alt="Image description" />
              </div>
          
                      <p className="mt-2 text-center text-gray-600 hover:scale-105">Caption: A representation of Solar NFT</p> {/* This is the caption */}
</div>
        </div>
      </div>
    </section>
  )
}
