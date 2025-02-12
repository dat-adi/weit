"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { getMacros } from "@/services/api";

// const data = [
//   {
//     name: "Protein",
//     value: 30,
//     grams: 95,
//     target: 120,
//     color: "#D1623F",
//   },
//   {
//     name: "Carbs",
//     value: 50,
//     grams: 158,
//     target: 250,
//     color: "#2563eb",
//   },
//   {
//     name: "Fat",
//     value: 20,
//     grams: 28,
//     target: 70,
//     color: "#16a34a",
//   },
// ]

const data = await getMacros();

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-popover border rounded-lg shadow-lg p-3">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {data.value}% ({data.grams}g / {data.target}g)
        </p>
      </div>
    )
  }
  return null
}

const MacroMetric = ({
  label,
  current,
  target,
  color,
}: {
  label: string
  current: number
  target: number
  color: string
}) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm text-muted-foreground">
        {current}g / {target}g
      </span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${Math.min((current / target) * 100, 100)}%`,
          backgroundColor: color,
        }}
      />
    </div>
  </div>
)

export function MacrosChart() {
  const totalCalories = data.reduce((acc, curr) => acc + curr.calories, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((macro) => (
          <Card key={macro.name}>
            <CardContent className="pt-6">
              <MacroMetric label={macro.name} current={macro.grams} target={macro.target} color={macro.color} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              formatter={(value, entry: any) => (
                <span className="text-sm">
                  {value}: {entry.payload.grams}g ({entry.payload.value}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

