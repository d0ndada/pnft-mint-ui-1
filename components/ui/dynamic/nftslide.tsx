import React from 'react'
import "../../../styles/globals.css"

export const NftSlide = () => {
  return (<div className=''>
       
    <div className=' '>
            <div className="marquee-wrapper1">
              <div className="marquee1">
                {[...Array(9)].map((item, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className='img1'
                    key={index}
                    src={`/assets/${index + 1}.png`}
                    height={200}
                    width={200}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
          <div className=''>
            <div className="marquee-wrapper2">
              <div className="marquee2">
                {[...Array(9)].map((item, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className='img2'
                    key={index}
                    src={`/assets/${index + 1}.png`}
                    height={200}
                    width={200}
                    alt=""
                  />
                ))}
              </div>
            </div>
    </div>
  </div>
  )
}
