"use client"
import React from 'react'
import { NftSlide } from '../dynamic/nftslide'
import { useInView } from 'react-intersection-observer';

const CollectionSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
      <section id="collection" className="p flex  h-[100vh] flex-col items-stretch justify-evenly  bg-gradient-to-b from-gradientStart to-gradientEnd scroll-snap-align-start" >
      <div ref={ref} className=' mt-[4.5rem] flex flex-col items-center'>
        <h2 className={`mb-3  text-3xl font-bold text-collectionHeader ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'}`} >Featured SolJuice&apos;s</h2>
                <p className={`text-center text-paragraphGray ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'}`}>Explore our curated collection of premium Solar NFTs, each representing a unique piece of solar art.</p>

      </div>
      <NftSlide inView={ inView} />
          

      </section> 
)
}

export default CollectionSection