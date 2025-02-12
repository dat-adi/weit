"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DateNavigation } from "@/components/date-navigation"
import { getFoodItems } from "@/services/api"

// const meals = [
//   {
//     time: "8:00 AM",
//     name: "Breakfast",
//     items: [{ name: "Oatmeal with Berries", calories: 350, protein: 12, carbs: 60, fat: 8 }],
//   },
//   {
//     time: "12:30 PM",
//     name: "Lunch",
//     items: [{ name: "Grilled Chicken Salad", calories: 420, protein: 35, carbs: 25, fat: 22 }],
//   },
//   {
//     time: "7:00 PM",
//     name: "Dinner",
//     items: [],
//   },
// ]

const meals = await getFoodItems();

export default function DailyLog() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Daily Log</h1>
          <DateNavigation
            onDateChange={(date) => {
              // Here you would typically fetch data for the new date
              console.log("Date changed:", date)
            }}
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Meal
        </Button>
      </div>

      <div className="space-y-6">
        {meals.map((meal, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{meal.name}</CardTitle>
                <span className="text-sm text-muted-foreground">{meal.time}</span>
              </div>
            </CardHeader>
            <CardContent>
              {meal.items.length > 0 ? (
                <div className="space-y-4">
                  {meal.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.protein}g protein • {item.carbs}g carbs • {item.fat}g fat
                        </p>
                      </div>
                      <p className="text-sm font-medium">{item.calories} cal</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No meals logged yet</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

