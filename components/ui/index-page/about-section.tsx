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
      <h2 ref={ref} className={`mt-[-19%] p-[6%] text-4xl font-bold text-foreground ${inView ? 'animate-fadeIn' : ''}`}>About Us</h2>
      <div className="flex flex-row">
        <p className={`max-w-[700px] text-left text-foreground ${inView ? 'animate-fadeIn' : ''}`}>
          We are a team of passionate individuals committed to creating an outstanding NFT platform. Our mission is to drive the adoption of NFT technology in various industries, and make it accessible to everyone.
        </p>
        <div className="flex justify-center gap-5">
          <div className={`relative ml-[12%] ${inView ? 'animate-fadeIn' : ''}`}>
            <Image src="/assets/4.png" width={300} height={300} alt="Image description" />
          </div>
        </div>
      </div>
    </section>
  )
}
