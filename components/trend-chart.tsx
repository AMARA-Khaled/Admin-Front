"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Données simulées pour les graphiques avec des valeurs logiques
const generateData = (days: number) => {
  const data = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Valeurs logiques pour l'aquaculture
    data.push({
      date: date.toLocaleDateString("fr-FR", { month: "short", day: "numeric" }),
      temperature: 22 + Math.random() * 4, // 22-26°C
      salinite: 34 + Math.random() * 2, // 34-36‰
      ph: 7.5 + Math.random() * 0.7, // 7.5-8.2
      oxygene: 7 + Math.random() * 2, // 7-9 mg/L
      health: 80 + Math.random() * 15, // 80-95%
    })
  }

  return data
}

const periods = [
  { label: "24h", value: "24h", days: 1 },
  { label: "7j", value: "7d", days: 7 },
  { label: "30j", value: "30d", days: 30 },
]

export function TrendChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const currentPeriod = periods.find((p) => p.value === selectedPeriod) || periods[1]
  const data = generateData(currentPeriod.days)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {periods.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="temperature" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="temperature">Température</TabsTrigger>
          <TabsTrigger value="salinite">Salinité</TabsTrigger>
          <TabsTrigger value="ph">pH</TabsTrigger>
          <TabsTrigger value="oxygene">Oxygène</TabsTrigger>
          <TabsTrigger value="health">Santé</TabsTrigger>
        </TabsList>

        <TabsContent value="temperature" className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[20, 28]} />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}°C`, "Température"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: "#f97316", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="salinite" className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[33, 37]} />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}‰`, "Salinité"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="salinite"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="ph" className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[7, 8.5]} />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}`, "pH"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="ph"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="oxygene" className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[6, 10]} />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)} mg/L`, "Oxygène"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="oxygene"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="health" className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[70, 100]} />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}%`, "Santé"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="health"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
