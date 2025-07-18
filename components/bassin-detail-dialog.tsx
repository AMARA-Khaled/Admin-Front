"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Thermometer, Droplets, Activity, Zap, Fish, Heart, User, Phone } from "lucide-react"

interface BassinDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bassin: any
}

// Données historiques simulées
const generateHistoricalData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toLocaleDateString("fr-FR", { month: "short", day: "numeric" }),
      ph: 7.5 + Math.random() * 0.7,
      salinite: 34 + Math.random() * 2,
      solidesSuspendus: 10 + Math.random() * 5,
      nitrate: 5 + Math.random() * 3,
      ammoniac: 0.1 + Math.random() * 0.3,
      niveauEau: 85 + Math.random() * 10,
      oxygene: 7 + Math.random() * 2,
      turbidite: 2 + Math.random() * 3,
      chlorophylle: 15 + Math.random() * 10,
      comportement: 80 + Math.random() * 15,
      health: 80 + Math.random() * 15,
    })
  }

  return data
}

export function BassinDetailDialog({ open, onOpenChange, bassin }: BassinDetailDialogProps) {
  const { t } = useLanguage()
  const [selectedParameter, setSelectedParameter] = useState("ph")
  const historicalData = generateHistoricalData()

  if (!bassin) return null

  const currentValues = {
    id: bassin.id,
    farm: "Ferme Aquacole Nord",
    statut: bassin.statut,
    nombrePoissons: 1250,
    ph: 7.8,
    salinite: 35.2,
    solidesSuspendus: 12.5,
    nitrate: 6.2,
    ammoniac: 0.25,
    niveauEau: 92.5,
    oxygene: 8.1,
    turbidite: 3.2,
    chlorophylle: 18.5,
    comportement: 87,
    health: 89.3,
    responsable: "Dr. Ahmed Mansouri",
    contactResponsable: "+216 98 123 456",
  }

  const parameters = [
    { key: "ph", label: "pH", icon: Activity, color: "#10b981", unit: "" },
    { key: "salinite", label: "Salinité", icon: Droplets, color: "#3b82f6", unit: "‰" },
    { key: "solidesSuspendus", label: "Solides Suspendus", icon: Activity, color: "#f59e0b", unit: "mg/L" },
    { key: "nitrate", label: "Nitrate", icon: Activity, color: "#ef4444", unit: "mg/L" },
    { key: "ammoniac", label: "Ammoniac", icon: Activity, color: "#8b5cf6", unit: "mg/L" },
    { key: "niveauEau", label: "Niveau d'eau", icon: Droplets, color: "#06b6d4", unit: "%" },
    { key: "oxygene", label: "Oxygène", icon: Zap, color: "#84cc16", unit: "mg/L" },
    { key: "turbidite", label: "Turbidité", icon: Activity, color: "#6b7280", unit: "NTU" },
    { key: "chlorophylle", label: "Chlorophylle", icon: Activity, color: "#22c55e", unit: "μg/L" },
    { key: "comportement", label: "Comportement", icon: Fish, color: "#f97316", unit: "%" },
    { key: "health", label: "Santé", icon: Heart, color: "#ec4899", unit: "%" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Fish className="h-5 w-5" />
            Détails du bassin {bassin.id}
          </DialogTitle>
          <DialogDescription>Informations complètes et historique du bassin</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Valeurs actuelles</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="management">Gestion</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Fish className="h-4 w-4" />
                    Informations générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-medium">{currentValues.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ferme:</span>
                    <span className="font-medium">{currentValues.farm}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Statut:</span>
                    <Badge variant={currentValues.statut === "actif" ? "default" : "destructive"}>
                      {currentValues.statut}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nombre de poissons:</span>
                    <span className="font-medium">{currentValues.nombrePoissons.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Paramètres chimiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">pH:</span>
                    <span className="font-medium">{currentValues.ph}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Salinité:</span>
                    <span className="font-medium">{currentValues.salinite}‰</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Solides suspendus:</span>
                    <span className="font-medium">{currentValues.solidesSuspendus} mg/L</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nitrate:</span>
                    <span className="font-medium">{currentValues.nitrate} mg/L</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ammoniac:</span>
                    <span className="font-medium">{currentValues.ammoniac} mg/L</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    État et santé
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Niveau d'eau:</span>
                    <span className="font-medium">{currentValues.niveauEau}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Oxygène:</span>
                    <span className="font-medium">{currentValues.oxygene} mg/L</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Turbidité:</span>
                    <span className="font-medium">{currentValues.turbidite} NTU</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Chlorophylle:</span>
                    <span className="font-medium">{currentValues.chlorophylle} μg/L</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Comportement:</span>
                    <span className="font-medium text-green-600">{currentValues.comportement}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Santé:</span>
                    <span className="font-medium text-green-600">{currentValues.health}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {parameters.map((param) => (
                  <Button
                    key={param.key}
                    variant={selectedParameter === param.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedParameter(param.key)}
                  >
                    <param.icon className="mr-1 h-3 w-3" />
                    {param.label}
                  </Button>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Historique - {parameters.find((p) => p.key === selectedParameter)?.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) => [
                          `${value.toFixed(2)}${parameters.find((p) => p.key === selectedParameter)?.unit}`,
                          parameters.find((p) => p.key === selectedParameter)?.label,
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey={selectedParameter}
                        stroke={parameters.find((p) => p.key === selectedParameter)?.color}
                        strokeWidth={2}
                        dot={{ fill: parameters.find((p) => p.key === selectedParameter)?.color, strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Responsable du bassin
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Nom:</span>
                      <span className="font-medium">{currentValues.responsable}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contact:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {currentValues.contactResponsable}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline">
                    Générer rapport
                  </Button>
                  <Button size="sm" variant="outline">
                    Programmer maintenance
                  </Button>
                  <Button size="sm" variant="outline">
                    Ajuster paramètres
                  </Button>
                  <Button size="sm" variant="outline">
                    Contacter responsable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
