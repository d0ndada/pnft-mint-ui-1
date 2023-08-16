import { siteConfig } from '@/config/site'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '../button'
import { Icons } from '@/components/icons'
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import logo from "public/logo.gif"


const BottomSection = () => {
  return (
    <section
      className="grid h-[25vh]  grid-cols-3 items-center  p-4 scroll-snap-align-start border-b bg-background" >
      <div className='flex flex-col items-center'>
       <h2>Contact Us</h2>
      <form  className="flex flex-col"  action="https://formspree.io/f/xeqbadvn" method="POST">
        <div className='text-sm pt-[7px]'>
          <label>
            Your email:
            <input type="email" id='email' name="email" required placeholder='example@email.com' />
          </label>
        </div>
        <div className='text-sm pt-[14px]'>
          <label>
            Your message:
            <textarea name="message" id='message' required placeholder='Enter you message here..' ></textarea>
          </label>
        </div>
        {/* You can add more form fields here if needed */}
        <Button type="submit">Send</Button>
      </form>
      
      </div> 
      <div className='flex items-center justify-center space-x-4'>
          <Image src={logo} alt="SolJuice Logo" width={48} height={48} />

  <span className="text-2xl font-bold">SolJuice</span>

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