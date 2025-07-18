"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts"
import { useLanguage } from "@/components/language-provider"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Brain,
  TrendingUp,
  Activity,
  Zap,
  Thermometer,
  Droplets,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Settings,
  Eye,
} from "lucide-react"
import { loadFakeData } from "@/utils/fakeData"

// Données pour les graphiques de performance
const performanceData = [
  { date: "Jan 10", accuracy: 92, predictions: 45 },
  { date: "Jan 11", accuracy: 94, predictions: 52 },
  { date: "Jan 12", accuracy: 91, predictions: 48 },
  { date: "Jan 13", accuracy: 95, predictions: 61 },
  { date: "Jan 14", accuracy: 93, predictions: 58 },
  { date: "Jan 15", accuracy: 96, predictions: 67 },
]

// Prédictions récentes
const recentPredictions = [
  {
    id: 1,
    model: "Température",
    bassin: "B-003",
    prediction: "Augmentation de 0.8°C dans 4h",
    confidence: 89,
    timestamp: "2024-01-15 15:30",
    status: "high_confidence",
  },
  {
    id: 2,
    model: "pH",
    bassin: "B-007",
    prediction: "Baisse du pH à 7.3 dans 2h",
    confidence: 92,
    timestamp: "2024-01-15 15:25",
    status: "high_confidence",
  },
  {
    id: 3,
    model: "Salinité",
    bassin: "B-001",
    prediction: "Stabilité maintenue 24h",
    confidence: 76,
    timestamp: "2024-01-15 15:20",
    status: "medium_confidence",
  },
  {
    id: 4,
    model: "Oxygène",
    bassin: "B-005",
    prediction: "Diminution possible (-0.3 mg/L)",
    confidence: 68,
    timestamp: "2024-01-15 15:15",
    status: "low_confidence",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Actif
        </Badge>
      )
    case "training":
      return (
        <Badge variant="secondary">
          <RefreshCw className="mr-1 h-3 w-3" />
          Entraînement
        </Badge>
      )
    case "error":
      return (
        <Badge variant="destructive">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Erreur
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getConfidenceBadge = (confidence: number) => {
  if (confidence >= 85) {
    return <Badge className="bg-green-100 text-green-800">Élevée</Badge>
  } else if (confidence >= 70) {
    return <Badge variant="secondary">Moyenne</Badge>
  } else {
    return <Badge variant="outline">Faible</Badge>
  }
}

export default function AIAssistantPage() {
  const { t } = useLanguage()
  const [aiModels, setAiModels] = useState<any[]>([])
  useEffect(() => {
    loadFakeData<{aiModels: any[]}>("ai-models.json").then(data => {
      setAiModels(data.aiModels)
    })
  }, [])

  const iconMap = {
    Thermometer,
    Droplets,
    Activity,
    Zap,
  }

  return (
    <>
      <AppSidebar />
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("ai.title")}</h1>
          <p className="text-muted-foreground">{t("ai.subtitle")}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configuration
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modèles actifs</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiModels.filter((m) => m.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">sur {aiModels.length} modèles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Précision moyenne</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(aiModels.reduce((acc, m) => acc + m.accuracy, 0) / aiModels.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">+2.3% ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prédictions aujourd'hui</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {aiModels.reduce((acc, m) => acc + m.predictions, 0)}
            </div>
            <p className="text-xs text-muted-foreground">+15% vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confiance moyenne</CardTitle>
            <Zap className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {(aiModels.reduce((acc, m) => acc + m.confidence, 0) / aiModels.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Stable</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">Modèles IA</TabsTrigger>
          <TabsTrigger value="predictions">Prédictions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="training">Entraînement</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modèles de prédiction</CardTitle>
              <CardDescription>État et performance de vos modèles d'intelligence artificielle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {aiModels.map((model) => {
                  const Icon = iconMap[model.icon as keyof typeof iconMap] || Thermometer;
                  return (
                    <Card key={model.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-5 w-5 ${model.color || ''}`} />
                            <CardTitle className="text-base">{model.name}</CardTitle>
                          </div>
                          {getStatusBadge(model.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Précision:</span>
                            <div className="font-medium">{model.accuracy}%</div>
                            <Progress value={model.accuracy} className="h-2 mt-1" />
                          </div>
                          <div>
                            <span className="text-muted-foreground">Confiance:</span>
                            <div className="font-medium">{model.confidence}%</div>
                            <Progress value={model.confidence} className="h-2 mt-1" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Dernier entraînement: {new Date(model.lastTraining).toLocaleDateString("fr-FR")}
                          </span>
                          <Badge variant="outline">{model.predictions} prédictions</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="mr-1 h-3 w-3" />
                            Détails
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Settings className="mr-1 h-3 w-3" />
                            Config
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prédictions récentes</CardTitle>
              <CardDescription>Dernières prédictions générées par vos modèles IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPredictions.map((prediction) => (
                  <div key={prediction.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{prediction.model}</Badge>
                          <Badge variant="outline">{prediction.bassin}</Badge>
                        </div>
                        {getConfidenceBadge(prediction.confidence)}
                      </div>
                      <p className="text-sm font-medium mb-1">{prediction.prediction}</p>
                      <p className="text-xs text-muted-foreground">
                        {prediction.timestamp} • Confiance: {prediction.confidence}%
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Évolution de la précision</CardTitle>
                <CardDescription>Précision des modèles au fil du temps</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip formatter={(value: number) => [`${value}%`, "Précision"]} />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Volume de prédictions</CardTitle>
                <CardDescription>Nombre de prédictions par jour</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={performanceData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [value, "Prédictions"]} />
                    <Bar dataKey="predictions" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Entraînement des modèles</CardTitle>
              <CardDescription>Planification et historique des entraînements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Prochain entraînement</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Modèle Température</span>
                          <span className="text-muted-foreground">Dans 2 jours</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Modèle Salinité</span>
                          <span className="text-muted-foreground">Dans 5 jours</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Modèle pH</span>
                          <span className="text-muted-foreground">Dans 1 semaine</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Données d'entraînement</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Points de données</span>
                          <span className="font-medium">2.4M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Période couverte</span>
                          <span className="font-medium">18 mois</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Qualité des données</span>
                          <span className="font-medium text-green-600">98.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex space-x-2">
                  <Button>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Lancer entraînement
                  </Button>
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres d'entraînement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </>
  )
}
