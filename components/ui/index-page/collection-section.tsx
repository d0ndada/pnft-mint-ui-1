import React from 'react'
import { NftSlide } from '../dynamic/nftslide'

const CollectionSection = () => {
  return (
      <section id="collection" className="flex h-[100vh] flex-col items-stretch justify-evenly  scroll-snap-align-start " >
      <div className='flex flex-col items-center'>
        <h2 className='text-3xl font-bold text-foreground'>Featured soljuces</h2>
      </div>
        <NftSlide/>
      </section> 
)
}

export default CollectionSection