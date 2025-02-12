"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Save } from "lucide-react"
import { addFoodLog } from "@/services/api"

interface Ingredient {
  id: number
  name: string
  amount: string
  protein: number
  carbs: number
  fat: number
  calories: number
}

export default function EditMeal({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [message, setMessage] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: 1,
      name: "Eggs",
      amount: "50g",
      protein: 6,
      carbs: 0,
      fat: 5.3,
      calories: 72,
    },
  ])

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: ingredients.length + 1,
        name: "",
        amount: "",
        protein: 0,
        carbs: 0,
        fat: 0,
        calories: 0,
      },
    ])
  }

  const handleSave = async(foodId) => {
    // Here you would typically save the meal
    try {
        const response = await addFoodLog(foodId);
        setMessage(`Food log entry created with ID: ${response.entry_id}`);
    } catch (error) {
        setMessage("Failed to add food log.");
    }
    router.push("/daily-log")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Meal</h1>
        <Button onClick={() => handleSave(4)}>
          <Save className="h-4 w-4 mr-2" />
          Add to Log
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Protein</TableHead>
                <TableHead>Carbs</TableHead>
                <TableHead>Fat</TableHead>
                <TableHead>Calories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>
                    <Input
                      value={ingredient.name}
                      onChange={(e) => {
                        const newIngredients = [...ingredients]
                        const index = newIngredients.findIndex((i) => i.id === ingredient.id)
                        newIngredients[index] = { ...ingredient, name: e.target.value }
                        setIngredients(newIngredients)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={ingredient.amount}
                      onChange={(e) => {
                        const newIngredients = [...ingredients]
                        const index = newIngredients.findIndex((i) => i.id === ingredient.id)
                        newIngredients[index] = { ...ingredient, amount: e.target.value }
                        setIngredients(newIngredients)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={ingredient.protein}
                      onChange={(e) => {
                        const newIngredients = [...ingredients]
                        const index = newIngredients.findIndex((i) => i.id === ingredient.id)
                        newIngredients[index] = { ...ingredient, protein: Number(e.target.value) }
                        setIngredients(newIngredients)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={ingredient.carbs}
                      onChange={(e) => {
                        const newIngredients = [...ingredients]
                        const index = newIngredients.findIndex((i) => i.id === ingredient.id)
                        newIngredients[index] = { ...ingredient, carbs: Number(e.target.value) }
                        setIngredients(newIngredients)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={ingredient.fat}
                      onChange={(e) => {
                        const newIngredients = [...ingredients]
                        const index = newIngredients.findIndex((i) => i.id === ingredient.id)
                        newIngredients[index] = { ...ingredient, fat: Number(e.target.value) }
                        setIngredients(newIngredients)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={ingredient.calories}
                      onChange={(e) => {
                        const newIngredients = [...ingredients]
                        const index = newIngredients.findIndex((i) => i.id === ingredient.id)
                        newIngredients[index] = { ...ingredient, calories: Number(e.target.value) }
                        setIngredients(newIngredients)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={addIngredient} className="mt-4" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Ingredient
          </Button>
        </CardContent>
      </Card>
      
      {message && <p>{message}</p>}
    </div>
  )
}

