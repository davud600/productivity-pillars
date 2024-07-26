'use client'

import { useRef } from 'react'
import { BrainCog, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export function Navbar() {
  const mobileLinksContainerRef = useRef<HTMLDivElement | null>(null)

  const toggleMobileNav = () => {
    if (!!!mobileLinksContainerRef.current) return

    const top =
      mobileLinksContainerRef.current!.style.top === '-300px'
        ? '60px'
        : '-300px'
    const opacity =
      mobileLinksContainerRef.current!.style.opacity === '0' ? '1' : '0'

    mobileLinksContainerRef.current!.style.top = top
    mobileLinksContainerRef.current!.style.opacity = opacity
  }

  return (
    <nav className="animate-fade bg-header-bg border-b-header-border border-b fixed z-20 w-screen top-0 h-[60px] backdrop-blur-lg">
      {/* Desktop */}
      <div className="justify-between items-center px-8 h-full max-w-[1340px] ml-auto mr-auto md:flex hidden">
        <Button asChild className="p-4" variant="ghost">
          <Link href="/">
            <BrainCog className="w-8 h-8" />
          </Link>
        </Button>
        <div className="flex items-center h-full gap-2 text-[15px]">
          <Button asChild className="p-4" variant="ghost">
            <Link href="/profile">
              <User className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild className="p-4" variant="ghost">
            <Link href="/login">
              <LogOut className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className="justify-between items-center px-8 h-full max-w-[1340px] ml-auto mr-auto md:hidden flex">
        <BrainCog className="w-8 h-8" />
        <div
          ref={mobileLinksContainerRef}
          className="flex-col flex w-screen absolute left-0 transition-all duration-300 -z-10 h-fit items-center justify-start text-base bg-dark-secondary"
          style={{
            opacity: 0,
            top: '-300px',
          }}
        >
          <Button
            asChild
            className="py-6 border-t-header-border border-t border-b-header-border border-b w-full text-center"
            variant="ghost"
          >
            <Link href="/profile">
              <User className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            asChild
            className="py-6 border-t-header-border border-t border-b-header-border border-b w-full text-center"
            variant="ghost"
          >
            <Link href="/login">
              <LogOut className="w-5 h-5" />
            </Link>
          </Button>
        </div>
        <button onClick={toggleMobileNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 50 50"
            className="fill-white md:h-6 md:w-6 h-5 w-5"
          >
            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        </button>
      </div>
    </nav>
  )
}
