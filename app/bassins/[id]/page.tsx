"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, LineChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts"
import { ArrowLeft, Thermometer, Heart, User, Phone } from "lucide-react"
import Link from "next/link"

// Données simulées pour un bassin spécifique
async function getBassinData(id: string) {
  const data = (await import("@/data/bassins.json")).default
  const seuils = (await import("@/data/seuil.json")).default
  const bassin = data.find((bassin: any) => bassin.id === id)
  if (!bassin) return undefined
  // Merge seuils into each parametre
  const parametres = Object.fromEntries(
    Object.entries(bassin.parametres).map(([key, param]: [string, any]) => [
      key,
      {
        ...param,
        seuil: seuils[key as keyof typeof seuils] || param.seuil,
      },
    ])
  )
  return { ...bassin, parametres }
}

interface BassinDetailPageProps {
  params: Promise<{ id: string }>
}

export default function BassinDetailPage({ params }: BassinDetailPageProps) {
  const [bassin, setBassin] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    params.then(resolvedParams => {
      getBassinData(resolvedParams.id).then((data) => {
        setBassin(data)
        setLoading(false)
      })
    })
  }, [params])

  if (loading) {
    return <div className="flex-1 p-6">Chargement...</div>
  }
  if (!bassin) {
    return (
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Bassin introuvable</h1>
        <p className="text-muted-foreground">Aucun bassin avec cet ID n'a été trouvé.</p>
      </div>
    )
  }
  const historicalData = bassin.historique

  const getParameterStatus = (valeur: number, seuil: { min: number; max: number }) => {
    if (valeur < seuil.min || valeur > seuil.max) {
      return { status: "danger", color: "text-red-500" }
    }
    if (valeur < seuil.min + 0.5 || valeur > seuil.max - 0.5) {
      return { status: "warning", color: "text-yellow-500" }
    }
    return { status: "normal", color: "text-green-500" }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/bassins">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight">{bassin.id}</h1>
              <Badge className="bg-green-100 text-green-800">{bassin.statut}</Badge>
            </div>
            <p className="text-muted-foreground">{bassin.ferme}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Capteurs du bassin</div>
            <ul className="mt-2 space-y-1">
              {bassin.capteurs.map((capteur: any) => (
                <li key={capteur.id} className="flex items-center gap-2 text-sm">
                  <span className="font-mono font-semibold">{capteur.id}</span>
                  <span className="text-muted-foreground">- {capteur.type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne de gauche - Historique */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Historique des paramètres</CardTitle>
              <CardDescription>Évolution des mesures sur les 30 derniers jours</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
                      padding: "1rem",
                      color: "#111827"
                    }}
                    itemStyle={{
                      margin: 0,
                      fontSize: "0.95rem",
                      color: "#374151"
                    }}
                    labelStyle={{
                      fontWeight: 600,
                      color: "#2563eb",
                      marginBottom: "0.5rem"
                    }}
                    separator=": "
                  />
                  <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Température" strokeWidth={2} />
                  <Line type="monotone" dataKey="salinite" stroke="#3b82f6" name="Salinité" strokeWidth={2} />
                  <Line type="monotone" dataKey="ph" stroke="#10b981" name="pH" strokeWidth={2} />
                  <Line type="monotone" dataKey="oxygene" stroke="#8b5cf6" name="Oxygène" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="solidesSuspendus"
                    stroke="#f59e0b"
                    name="Solides Suspendus"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="nitrate" stroke="#ef4444" name="Nitrate" strokeWidth={2} />
                  <Line type="monotone" dataKey="ammoniac" stroke="#84cc16" name="Ammoniac" strokeWidth={2} />
                  <Line type="monotone" dataKey="niveauEau" stroke="#06b6d4" name="Niveau d'eau" strokeWidth={2} />
                  <Line type="monotone" dataKey="turbidite" stroke="#6b7280" name="Turbidité" strokeWidth={2} />
                  <Line type="monotone" dataKey="chlorophylle" stroke="#22c55e" name="Chlorophylle" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Colonne de droite - Paramètres actuels */}
        <div className="space-y-4">
          {/* Paramètres chimiques */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Paramètres chimiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(bassin.parametres)
                .slice(0, 6)
                .map(([key, param]: [string, any]) => {
                  const status = getParameterStatus(param.valeur, param.seuil)
                  return (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className={`font-medium ${status.color}`}>
                        {Number(param.valeur).toFixed(2)}
                        {param.unite}
                      </span>
                    </div>
                  )
                })}
            </CardContent>
          </Card>

          {/* État et santé */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4" />
                État et santé
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Nombre de poissons</span>
                <span className="font-medium">{bassin.nombrePoissons.toLocaleString()}</span>
              </div>
              {Object.entries(bassin.parametres)
                .slice(6)
                .map(([key, param]: [string, any]) => {
                  const status = getParameterStatus(param.valeur, param.seuil)
                  return (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      <span className={`font-medium ${status.color}`}>
                        {Number(param.valeur).toFixed(2)}
                        {param.unite}
                      </span>
                    </div>
                  )
                })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Responsable du bassin */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Responsable du bassin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Nom:</span>
                <span className="font-medium">{bassin.responsable.nom}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Contact:</span>
                <span className="font-medium flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {bassin.responsable.contact}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}