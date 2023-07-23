import React from 'react'
import { NftSlide } from '../dynamic/nftslide'

const CollectionSection = () => {
  return (
      <section id="collection" className="h-[70vh] scroll-snap-align-start" >
        <div>Feutured soljuces</div>
        <NftSlide/>
      </section> 
)
}

export default CollectionSection