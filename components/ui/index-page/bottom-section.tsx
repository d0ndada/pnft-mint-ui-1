import { siteConfig } from '@/config/site'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../button'
import { Icons } from '@/components/icons'

const BottomSection = () => {
  return (
    <section
      className="grid h-[25vh]  grid-cols-3 items-center bg-card p-4 scroll-snap-align-start" >
       <div></div> {/* This empty div is used to balance the space on the left */}

      <div className='flex justify-center'>
        <Icons.logo className="h-12 w-12" />

      </div>
      <div className="flex justify-end space-x-4">
        <Link
              href={siteConfig.links.discord}
              // target="_blank"
              // rel="noreferrer"
              className="hidden md:block"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.discord className="h-5 w-7" />
                <span className="sr-only">Discord</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              // target="_blank"
              // rel="noreferrer"
              className="hidden md:block"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
         </div>
        
      </section>
  )
}

export default BottomSection