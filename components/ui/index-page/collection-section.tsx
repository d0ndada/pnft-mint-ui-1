"use client"
import React from 'react'
import { NftSlide } from '../dynamic/nftslide'
import { useInView } from 'react-intersection-observer';

const CollectionSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });
  return (
      <section id="collection" className="p flex  h-[100vh] flex-col items-stretch justify-evenly  bg-gradient-to-b from-gradientStart to-gradientEnd scroll-snap-align-start" >
      <div ref={ref} className='mb-8 mt-4 flex flex-col items-center'>
        <h2 className={`mb-8 mt-4 text-3xl font-bold text-collectionHeader ${inView ? 'animate-fade-in-up' : ''}`} >Featured soljuces</h2>
                <p className="text-center text-paragraphGray">Explore our curated collection of premium Solar NFTs, each representing a unique piece of solar art.</p>

      </div>
      <NftSlide />
          

      </section> 
)
}

export default CollectionSection