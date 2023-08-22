import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import logo from "public/logo.gif"
import Image from 'next/image';

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
 const handleScroll =  (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string | undefined) => {
  //  e.preventDefault();
   if(href){
    const element = document.getElementById(href.replace("/#", ""));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
   }
 }
  return (
    <div className="flex gap-6 md:gap-10">
      <div  className="flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" />
         */}
          <Image src={logo} alt="SolJuice Logo" width={48} height={48} />
        
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </div>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href || "#"}
                  // onClick={(e) => handleScroll(e, item.href)}
                  // scroll={false}

                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground  transition-transform hover:scale-105 hover:text-primary",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
          
        </nav>
      ) : null}
    </div>
  )
}
