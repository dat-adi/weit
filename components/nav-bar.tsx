"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"
import { SearchOverlay } from "./search-overlay"

export function NavBar() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
          <div className="mr-8">
            <Link href="/" className="text-2xl font-bold">
              Weit
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/">
              <Button variant={pathname === "/" ? "secondary" : "ghost"}>Dashboard</Button>
            </Link>
            <Link href="/daily-log">
              <Button variant={pathname === "/daily-log" ? "secondary" : "ghost"}>Daily Log</Button>
            </Link>
            <Link href="/macros">
              <Button variant={pathname === "/macros" ? "secondary" : "ghost"}>Macros</Button>
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" onClick={() => setIsSearchOpen(true)}>
              <Search className="mr-2 h-4 w-4" />
              Search Meals
            </Button>
          </div>
        </div>
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

