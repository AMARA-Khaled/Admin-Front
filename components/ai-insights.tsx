"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const insights = [
  {
    id: 1,
    type: "prediction",
    title: "Température bassin B-003",
    message: "Augmentation prévue de 1.2°C dans les 6 heures",
    priority: "high",
    confidence: 92,
    timestamp: "Il y a 15 minutes",
    icon: TrendingUp,
    color: "text-orange-500",
  },
  {
    id: 2,
    type: "recommendation",
    title: "Oxygène dissous",
    message: "Recommandation d'augmenter l'aération sur bassins B-001 et B-005",
    priority: "medium",
    confidence: 87,
    timestamp: "Il y a 32 minutes",
    icon: CheckCircle,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "alert",
    title: "Anomalie détectée",
    message: "Comportement inhabituel des poissons détecté - bassin B-002",
    priority: "high",
    confidence: 95,
    timestamp: "Il y a 1 heure",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    id: 4,
    type: "prediction",
    title: "Qualité de l'eau",
    message: "Amélioration des paramètres prévue suite aux ajustements",
    priority: "low",
    confidence: 78,
    timestamp: "Il y a 2 heures",
    icon: TrendingDown,
    color: "text-green-500",
  },
]

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">Priorité haute</Badge>
    case "medium":
      return <Badge variant="secondary">Priorité moyenne</Badge>
    case "low":
      return <Badge variant="outline">Priorité basse</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "prediction":
      return <Badge className="bg-blue-100 text-blue-800">Prédiction</Badge>
    case "recommendation":
      return <Badge className="bg-green-100 text-green-800">Recommandation</Badge>
    case "alert":
      return <Badge className="bg-red-100 text-red-800">Alerte</Badge>
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

export function AIInsights() {
  return (
    <div className="space-y-4">
      {insights.map((insight) => {
        const Icon = insight.icon
        return (
          <Card key={insight.id} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${insight.color}`} />
                  <CardTitle className="text-sm">{insight.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(insight.type)}
                  {getPriorityBadge(insight.priority)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm mb-3">{insight.message}</CardDescription>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>Confiance: {insight.confidence}%</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{insight.timestamp}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
