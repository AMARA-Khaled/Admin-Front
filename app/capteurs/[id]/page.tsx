"use client"

import { use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TrendChart } from "@/components/trend-chart"
import {
  ArrowLeft,
  Settings,
  AlertTriangle,
  CheckCircle,
  Thermometer,
  Droplets,
  Activity,
  Zap,
  Calendar,
  MapPin,
  Battery,
  Wrench,
} from "lucide-react"
import Link from "next/link"

// Données simulées pour un capteur spécifique
const getCapteurData = (id: string) => ({
  id,
  type: "Température",
  bassin: "B-001",
  statut: "actif",
  description: "Capteur de température haute précision pour surveillance continue",
  localisation: "Bassin Principal A - Position Nord-Est",
  dateInstallation: "2023-03-15",
  modele: "AquaTemp Pro 2000",
  fabricant: "AquaTech Solutions",
  derniereMesure: {
    valeur: 24.5,
    unite: "°C",
    timestamp: "2024-01-15 15:30:25",
  },
  parametres: {
    precision: "±0.1°C",
    plage: "-10°C à +50°C",
    resolution: "0.01°C",
    frequence: "30 secondes",
  },
  etat: {
    batterie: 85,
    signal: 92,
    derniereMaintenance: "2023-12-10",
    prochaineMaintenance: "2024-03-10",
  },
  alertes: [
    {
      id: 1,
      type: "warning",
      message: "Batterie en baisse",
      timestamp: "2024-01-14 10:30",
      statut: "active",
    },
  ],
  historique: [
    { date: "2024-01-15", action: "Mesure normale", valeur: "24.5°C" },
    { date: "2024-01-14", action: "Alerte batterie", valeur: "24.3°C" },
    { date: "2024-01-13", action: "Calibration", valeur: "24.1°C" },
  ],
  predictions: {
    tendance: "Stable pour les 24h",
    maintenance: "Calibration recommandée dans 30 jours",
    batterie: "Remplacement dans 2 mois",
  },
})

interface CapteurDetailPageProps {
  params: Promise<{ id: string }>
}

export default function CapteurDetailPage({ params }: CapteurDetailPageProps) {
  const { id } = use(params)
  const capteur = getCapteurData(id)

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "température":
        return Thermometer
      case "salinité":
        return Droplets
      case "ph":
        return Activity
      case "oxygène":
        return Zap
      default:
        return Activity
    }
  }

  const TypeIcon = getTypeIcon(capteur.type)

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/capteurs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Capteur {capteur.id}</h1>
            <p className="text-muted-foreground">{capteur.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            {capteur.statut}
          </Badge>
          <Button variant="outline" size="sm">
            <Wrench className="mr-2 h-4 w-4" />
            Calibrer
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Paramètres
          </Button>
        </div>
      </div>

      {/* Informations générales */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Type</CardTitle>
            <TypeIcon className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{capteur.type}</div>
            <div className="text-xs text-muted-foreground">{capteur.modele}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bassin</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{capteur.bassin}</div>
            <div className="text-xs text-muted-foreground">{capteur.localisation}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batterie</CardTitle>
            <Battery className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{capteur.etat.batterie}%</div>
            <div className="text-xs text-muted-foreground">Signal: {capteur.etat.signal}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Installé le</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{new Date(capteur.dateInstallation).toLocaleDateString("fr-FR")}</div>
            <div className="text-xs text-muted-foreground">{capteur.fabricant}</div>
          </CardContent>
        </Card>
      </div>

      {/* Mesure actuelle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TypeIcon className="h-5 w-5 text-orange-500" />
            Mesure actuelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-orange-500">
                {capteur.derniereMesure.valeur}
                {capteur.derniereMesure.unite}
              </div>
              <p className="text-sm text-muted-foreground">Dernière mesure: {capteur.derniereMesure.timestamp}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Précision: {capteur.parametres.precision}</div>
              <div className="text-sm text-muted-foreground">Fréquence: {capteur.parametres.frequence}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Onglets détaillés */}
      <Tabs defaultValue="historique" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="historique">Historique</TabsTrigger>
          <TabsTrigger value="alertes">Alertes</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="predictions">Prédictions IA</TabsTrigger>
          <TabsTrigger value="parametres">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="historique" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Graphique historique</CardTitle>
              <CardDescription>Évolution des mesures sur les derniers jours</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Journal d'activité</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {capteur.historique.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{entry.action}</p>
                        <span className="text-sm text-muted-foreground">{entry.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Valeur: {entry.valeur}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alertes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertes actives</CardTitle>
              <CardDescription>Alertes en cours pour ce capteur</CardDescription>
            </CardHeader>
            <CardContent>
              {capteur.alertes.length > 0 ? (
                <div className="space-y-3">
                  {capteur.alertes.map((alerte) => (
                    <div key={alerte.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                      <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alerte.message}</p>
                        <p className="text-xs text-muted-foreground">{alerte.timestamp}</p>
                      </div>
                      <Badge variant="secondary">{alerte.statut}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <h3 className="mt-2 text-sm font-medium">Aucune alerte</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Le capteur fonctionne normalement</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>État de maintenance</CardTitle>
              <CardDescription>Informations sur la maintenance du capteur</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Dernière maintenance</Label>
                  <p className="text-sm">{new Date(capteur.etat.derniereMaintenance).toLocaleDateString("fr-FR")}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Prochaine maintenance</Label>
                  <p className="text-sm">{new Date(capteur.etat.prochaineMaintenance).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Spécifications techniques</Label>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Précision:</span> {capteur.parametres.precision}
                  </div>
                  <div>
                    <span className="font-medium">Plage:</span> {capteur.parametres.plage}
                  </div>
                  <div>
                    <span className="font-medium">Résolution:</span> {capteur.parametres.resolution}
                  </div>
                  <div>
                    <span className="font-medium">Fréquence:</span> {capteur.parametres.frequence}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Programmer une maintenance</Label>
                <div className="flex space-x-2">
                  <Button variant="outline">Calibration</Button>
                  <Button variant="outline">Nettoyage</Button>
                  <Button variant="outline">Remplacement batterie</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prédictions IA</CardTitle>
              <CardDescription>Prévisions basées sur l'analyse des données historiques</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(capteur.predictions).map(([key, prediction]) => (
                  <Card key={key}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm capitalize">{key}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm">{prediction}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parametres" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration du capteur</CardTitle>
              <CardDescription>Modifier les paramètres de fonctionnement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="frequence">Fréquence de mesure</Label>
                  <Input id="frequence" defaultValue="30" />
                  <p className="text-xs text-muted-foreground mt-1">En secondes</p>
                </div>
                <div>
                  <Label htmlFor="seuil">Seuil d'alerte</Label>
                  <Input id="seuil" defaultValue="26" />
                  <p className="text-xs text-muted-foreground mt-1">Température maximale (°C)</p>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes de configuration</Label>
                <Textarea id="notes" placeholder="Commentaires sur la configuration..." className="min-h-[100px]" />
              </div>

              <Button>Sauvegarder les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
