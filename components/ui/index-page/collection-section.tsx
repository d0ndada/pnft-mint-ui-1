"use client"
import React from 'react'
import { NftSlide } from '../dynamic/nftslide'
import { useInView } from 'react-intersection-observer';

const CollectionSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });
  return (
      <section id="collection" className="flex h-[100vh]  flex-col items-stretch p justify-evenly  scroll-snap-align-start  " >
      <div ref={ref} className='flex flex-col items-center'>
        <h2  className={`text-3xl font-bold text-foreground ${inView ? 'animate-fade-in-up' : ''}`} >Featured soljuces</h2>
      </div>
      <NftSlide />
          

      </section> 
)
}

export default CollectionSection