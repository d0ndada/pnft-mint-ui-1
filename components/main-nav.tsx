import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import Image from 'next/image';


interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  //  const router = useRouter();

  const handleScroll = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string | undefined) => {
  
    if (href && href.startsWith("/#")) {
      e.preventDefault();
    const sectionId = href.replace("/#", "");
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    } 
}
 React.useEffect(() => {
  if (typeof window !== "undefined") {
    const sectionId = localStorage.getItem('scrollToSection');
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the section ID from local storage
      localStorage.removeItem('scrollToSection');
    }
  }
}, []);
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={"/"}  className="flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" />
         */}
          <Image src="/logo.gif" alt="SolJuice Logo" width={48} height={48} />
        
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <a
                  key={index}
                  href={item.href || "#"}
                  onClick={(e) => handleScroll(e, item.href)}
                  // scroll={false}

                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground  transition-transform hover:scale-105 hover:text-primary",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </a>
              )
          )}
          
        </nav>
      ) : null}
    </div>
  )
}
