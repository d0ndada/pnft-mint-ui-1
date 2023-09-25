import React from 'react'
import "../../../styles/globals.css"
type NftSlideProps = {
  inView: boolean;
};
export const NftSlide = ({ inView}: NftSlideProps) => {
      const [isHovered, setIsHovered] = React.useState(false);
const renderImages = () => (
    [...Array(35)].map((item, index) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`img1 ${inView ? `delay- animate-fade-in-up${index * 100}ms` : ''}`}
        key={index}
        src={`/assets/${index + 1}.png`}
        height={200}
        width={200}
        alt=""
      />
    ))
  );


  return (
      <div 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        className={`${isHovered ? 'paused' : ''} ${inView ? 'animate-fade-in-up' : ''}`}
>
          
    <div className=' '>
            <div className="marquee-wrapper1">
              <div className="marquee1">
                        {renderImages()}
            {renderImages()}

              </div>
            </div>
          </div>
          <div className=''>
            <div className="marquee-wrapper2">
              <div className="marquee2">
                         {renderImages()}
            {renderImages()}

              </div>
            </div>
      </div>

  </div>
  )
}
