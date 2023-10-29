"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/globals.css"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useState } from "react"
import Image from "next/image"


const mintTiers = [
  //  {
    // gif: "/sunrise.gif",
  //   name: "Pre Mint",
  //   label: "early",
  //   href: "/mint/early",
  //   tooltipText: "Early access for our first supporters."
  // },

 {
    // gif: "/sun.gif",
    name: "Public Mint",
    label: "public",
    href: "/mint/public",
    tooltipText: "Join the green revolution today."
  },

]

interface MintNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MintNav({ className, ...props }: MintNavProps) {
  const pathname = usePathname()
 const [loading, setLoading] = useState(false);
const [clickedLink, setClickedLink] = useState<string | null>(null);

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {mintTiers.map((example) => (
            <div className="flex items-center gap-2" key={example.href}>
              {loading && clickedLink === example.name ? (
                <div className="flex items-center justify-center">
                  <Image src="/loader.gif" width={100} height={100} alt="Loading..." />
                </div>
              ) : (
                <>
                  <Link
                    href={example.href}
                    
                    onClick={() => {
                      setLoading(true);
                      setClickedLink(example.name);
                    }}
                    className={cn(
                      "hover-pulse flex items-center px-4 text-2xl transition-all duration-300 hover:scale-105 hover:text-buttonHover",
                      pathname?.startsWith(example.href)
                        ? "font-bold text-buttonHover"
                        : "font-medium text-muted-foreground"
                    )}
                  >
                    {example.name}
                  </Link>
                  <Tippy content={example.tooltipText}>
                    <span>🛈</span>
                  </Tippy>
                </>
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
