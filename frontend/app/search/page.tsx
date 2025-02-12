"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, SearchIcon } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch("http://127.0.0.1:8000/foods");
      const data = await response.json();
      setSuggestions(data);
    };

    fetchSuggestions();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search for meals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xl"
        />
        <Button onClick={() => setHasSearched(true)}>
          <SearchIcon className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {!hasSearched ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-5 w-5" />
              <h2 className="text-lg font-medium">Weit Assistant</h2>
            </div>
            <p className="text-muted-foreground mb-4">Based on your nutrition goals, here are some suggested meals:</p>
            <div className="space-y-2">
              <p className="text-sm">• Try adding some lean protein like grilled chicken or fish</p>
              <p className="text-sm">• Consider whole grain options like quinoa or brown rice</p>
              <p className="text-sm">• Add more vegetables to increase your fiber intake</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {suggestions.map((meal) => (
            <Card key={meal.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-2">{meal.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {meal.calories} cal • {meal.protein}g protein • {meal.carbs}g carbs • {meal.fat}g fat
                    </p>
                  </div>
                  <Link href={`/edit-meal/${meal.id}`}>
                    <Button variant="outline">Add and Alter Ingredients</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

