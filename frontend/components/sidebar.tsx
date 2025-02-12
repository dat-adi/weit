"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Calendar, PieChart, Search } from "lucide-react"
import { useState } from "react"
import { SearchOverlay } from "./search-overlay"

const frequentMeals = [
  { name: "Oatmeal with Berries", calories: 350 },
  { name: "Grilled Chicken Salad", calories: 420 },
  { name: "Protein Smoothie", calories: 280 },
  { name: "Greek Yogurt Bowl", calories: 300 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="w-64 border-r bg-background h-screen flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">Weit</h1>
      </div>

      <div className="p-4 border-b">
        <Button variant="outline" className="w-full justify-start" onClick={() => setIsSearchOpen(true)}>
          <Search className="mr-2 h-4 w-4" />
          Search Meals
        </Button>
      </div>

      <nav className="p-4 border-b">
        <div className="space-y-2">
          <Link href="/">
            <Button variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/daily-log">
            <Button variant={pathname === "/daily-log" ? "secondary" : "ghost"} className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Daily Log
            </Button>
          </Link>
          <Link href="/macros">
            <Button variant={pathname === "/macros" ? "secondary" : "ghost"} className="w-full justify-start">
              <PieChart className="mr-2 h-4 w-4" />
              Macros
            </Button>
          </Link>
        </div>
      </nav>

      <div className="p-4">
        <h2 className="font-semibold mb-4">Frequent Meals</h2>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {frequentMeals.map((meal, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="font-medium">{meal.name}</div>
                <div className="text-sm text-muted-foreground">{meal.calories} calories</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}

