"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, addDays, subDays } from "date-fns"
import { useState } from "react"

interface DateNavigationProps {
  onDateChange: (date: Date) => void
}

export function DateNavigation({ onDateChange }: DateNavigationProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePrevDay = () => {
    const newDate = subDays(currentDate, 1)
    setCurrentDate(newDate)
    onDateChange(newDate)
  }

  const handleNextDay = () => {
    const newDate = addDays(currentDate, 1)
    setCurrentDate(newDate)
    onDateChange(newDate)
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={handlePrevDay}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="font-medium">{format(currentDate, "MMMM d, yyyy")}</span>
      <Button variant="ghost" size="icon" onClick={handleNextDay}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

