import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MacrosChart } from "@/components/macros-chart"
import { getFoodItems } from "@/services/api";

const meals = await getFoodItems();

export default function Dashboard() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome back, John!</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Weit Assistant</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your recent meals, here are some suggestions to improve your nutrition:
            </p>
            <ul className="space-y-2">
              <li className="text-sm">• Your protein intake is below target. Consider adding this to your diet: <p style={{color: "#D1623F"}}>hard-boiled eggs</p> <p style={{color: "#D1623F"}}>banana overnight oats</p> </li>
              <li className="text-sm">• Good job on meeting your fiber goals!</li>
              <li className="text-sm">• Try to include more green vegetables in your dinner.</li>
            </ul>
          </CardContent>
        </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Macronutrient Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <MacrosChart />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

