import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MacrosChart } from "@/components/macros-chart"

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
              <li className="text-sm">• Your protein intake is below target. Consider adding lean meats or legumes.</li>
              <li className="text-sm">• Good job on meeting your fiber goals!</li>
              <li className="text-sm">• Try to include more green vegetables in your dinner.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Today's Meals</CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
              Add Meal
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Breakfast</h3>
                <p className="text-sm text-muted-foreground">Oatmeal with Berries - 350 cal</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Lunch</h3>
                <p className="text-sm text-muted-foreground">Grilled Chicken Salad - 420 cal</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Dinner</h3>
                <p className="text-sm text-muted-foreground">Not logged yet</p>
              </div>
            </div>
          </CardContent>
        </Card>
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

