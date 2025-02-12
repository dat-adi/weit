"use client"

import { useEffect, useState } from "react"
import { X, Bot, ArrowRight, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const suggestions = [
  {
    category: "Protein-rich foods",
    items: ["Hard-Boiled Eggs", "Grilled Chicken Breast", "Salmon", "Greek Yogurt"],
  },
  {
    category: "Complex Carbohydrates",
    items: ["Quinoa", "Sweet Potato", "Brown Rice", "Oatmeal"],
  },
  {
    category: "Healthy Fats",
    items: ["Avocado", "Almonds", "Olive Oil", "Chia Seeds"],
  },
]

const searchResults = [
  {
    id: "eggs",
    name: "Hard-Boiled Eggs",
    calories: 155,
    protein: 12.6,
    carbs: 1.1,
    fat: 10.6,
    description: "A nutritious and protein-rich snack that's easy to prepare.",
    servingSize: "2 large eggs",
  },
]

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (query === "") {
      setHasSearched(false)
    } else {
      setHasSearched(true)
    }
  }, [query])

  const handleAddToLog = (itemId: string) => {
    onClose()
    router.push(`/edit-meal/1`)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8">
          <Input
            placeholder="Search meals..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-lg h-12"
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={onClose} className="h-12 w-12">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {!hasSearched ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Weit Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {suggestions.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-lg font-medium mb-3">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {category.items.map((item) => (
                        <Button
                          key={item}
                          variant="outline"
                          className="justify-between h-auto py-4 px-6"
                          onClick={() => setQuery(item)}
                        >
                          {item}
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((result) => (
              <Card key={result.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{result.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm">Serving Size: {result.servingSize}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Calories: {result.calories}</div>
                        <div>Protein: {result.protein}g</div>
                        <div>Carbs: {result.carbs}g</div>
                        <div>Fat: {result.fat}g</div>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => handleAddToLog(result.id)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Daily Log
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

