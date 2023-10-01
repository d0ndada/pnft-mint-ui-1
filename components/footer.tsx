import { siteConfig } from '@/config/site'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { Icons } from '@/components/icons'
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import logo from "public/logo.gif"

interface FooterProps {
  enableScrollSnap?: boolean;
}


const Footer: React.FC<FooterProps> = ({enableScrollSnap = false}) => {
  return (
    <footer
      className={`grid h-[20vh] grid-cols-3 items-center border-b bg-footer p-4 px-[2rem] shadow-md ${enableScrollSnap ? "scroll-snap-align-start" : ""}`}>
      <div className='flex flex-col items-center'>
       {/* <h2>Contact Us</h2>
      <form  className="flex flex-col"  action="https://formspree.io/f/xeqbadvn" method="POST">
        <div className='pt-[7px] text-sm'>
          <label>
            Your email:
            <input     className='border border-accent hover:border-secondary hover:bg-input focus:border-accent focus:ring-primary' 
 type="email" id='email' name="email" required placeholder='example@email.com' />
          </label>
        </div>
        <div className='pt-[14px] text-sm'>
          <label>
            Your message:
              <input
                className='max-h-[20px] resize-y border border-accent hover:border-secondary hover:bg-input focus:border-accent focus:ring-primary' 

                name="message" id='message' required placeholder='Enter you message here..' ></input>
          </label>
        </div>
        {/* You can add more form fields here if needed */}
        {/* <Button className='transition-all hover:scale-105' type="submit">Send</Button> */}
      {/* </form> */} 
      
      </div> 
    <div className='flex items-center justify-center space-x-4'>
        <Image src={logo} alt="SolJuice Logo" width={48} height={48} />
        <span className="text-2xl font-bold">{siteConfig.name}</span>
      </div>

      <div className="flex flex-col items-end justify-end space-y-4 pr-[2rem]">
        <div className="flex space-x-4">
          <Link href={siteConfig.links.discord} className="hidden md:block">
            <div className={buttonVariants({ size: "sm", variant: "ghost" })}>
              <Icons.discord className="h-5 w-7" />
              <span className="sr-only">Discord</span>
            </div>
          </Link>

          <Link href={siteConfig.links.twitter} className="hidden md:block">
            <div className={buttonVariants({ size: "sm", variant: "ghost" })}>
              <Icons.twitter className="h-5 w-5 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
        </div>

        <Link href="/terms-and-condition">
          <span className='cursor-pointer text-sm text-primary underline hover:text-accent'>SoJu Terms & Conditions</span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer;