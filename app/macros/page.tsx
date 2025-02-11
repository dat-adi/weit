"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MacrosChart } from "@/components/macros-chart"
import { DateNavigation } from "@/components/date-navigation"

const macroData = {
  calories: {
    current: 1850,
    target: 2000,
  },
  protein: {
    current: 95,
    target: 120,
  },
  carbs: {
    current: 220,
    target: 250,
  },
  fat: {
    current: 65,
    target: 70,
  },
}

export default function Macros() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Macronutrients</h1>
        <DateNavigation
          onDateChange={(date) => {
            // Here you would typically fetch data for the new date
            console.log("Date changed:", date)
          }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Daily Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Calories</span>
                  <span className="text-sm text-muted-foreground">
                    {macroData.calories.current} / {macroData.calories.target} kcal
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${(macroData.calories.current / macroData.calories.target) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Protein</span>
                  <span className="text-sm text-muted-foreground">
                    {macroData.protein.current} / {macroData.protein.target}g
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${(macroData.protein.current / macroData.protein.target) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Carbs</span>
                  <span className="text-sm text-muted-foreground">
                    {macroData.carbs.current} / {macroData.carbs.target}g
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${(macroData.carbs.current / macroData.carbs.target) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Fat</span>
                  <span className="text-sm text-muted-foreground">
                    {macroData.fat.current} / {macroData.fat.target}g
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${(macroData.fat.current / macroData.fat.target) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <MacrosChart />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

