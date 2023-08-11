"use client"
import React from 'react'
import { NftSlide } from '../dynamic/nftslide'
import { useInView } from 'react-intersection-observer';

const CollectionSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });
  return (
      <section id="collection" className="flex h-[100vh]  flex-col items-stretch p justify-evenly  scroll-snap-align-start bg-gradient-to-b from-yellow-100 via-orange-100 to-white" >
      <div ref={ref} className='flex flex-col items-center mt-4 mb-8'>
        <h2 className={`text-3xl font-bold text-foreground mt-4 mb-8 ${inView ? 'animate-fade-in-up' : ''}`} >Featured soljuces</h2>
                <p className="text-center text-foreground">Explore our curated collection of premium Solar NFTs, each representing a unique piece of solar art.</p>

      </div>
      <NftSlide />
          

      </section> 
)
}

export default CollectionSection