"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

const suggestedMeals = [
  { name: "Oatmeal with Berries", calories: 350, protein: 12, carbs: 47, fat: 8 },
  { name: "Greek Yogurt Bowl", calories: 300, protein: 20, carbs: 30, fat: 10 },
  { name: "Protein Smoothie", calories: 280, protein: 24, carbs: 35, fat: 6 },
  { name: "Grilled Chicken Salad", calories: 420, protein: 35, carbs: 25, fat: 22 },
  { name: "Quinoa Bowl", calories: 380, protein: 15, carbs: 65, fat: 8 },
]

export function SuggestedMealsSidebar() {
  return (
    <div className="w-64 border-l bg-background h-screen">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Suggested Meals</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-57px)]">
        <div className="p-4 space-y-4">
          {suggestedMeals.map((meal, index) => (
            <Card key={index} className="p-3 hover:bg-accent transition-colors cursor-pointer">
              <div className="font-medium">{meal.name}</div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>{meal.calories} calories</div>
                <div className="text-xs">
                  P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

