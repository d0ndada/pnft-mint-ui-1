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


const mintTiers = [
  {
    gif: "/sunrise.gif",
    name: "Pre Mint",
    label: "early",
    href: "/mint/early",
    tooltipText: "Early access for our first supporters."
  },
  {
    gif: "/sun.gif",
    name: "Public Mint",
    label: "public",
    href: "/mint/public",
    tooltipText: "Join the green revolution today."
  },


]

interface MintNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MintNav({ className, ...props }: MintNavProps) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {mintTiers.map((example) => (
                        <div className="flex items-center gap-2">

            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex items-center px-4 text-2xl hover:text-primary hover:scale-105 transform transition-all duration-300 hover-pulse",
                pathname?.startsWith(example.href)
                  ? "font-bold text-primary"
                  : "font-medium text-muted-foreground"
              )}
            >
              {/* <img src={example.gif} alt={example.name} className={`mr-2 ${example.label === 'public' ? 'w-[4rem] h-[4rem]' : 'w-12 mt-[-0.75rem] h-12'}`} /> */}


              {example.name}
            </Link>
              <Tippy content={example.tooltipText}>
                <span>🛈</span>
              </Tippy>
            </div>
          ))}
          
        </div>
        
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
