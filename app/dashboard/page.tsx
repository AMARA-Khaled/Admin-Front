import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DashboardMapSection from "@/components/dashboard-map-section"
import { AIInsights } from "@/components/ai-insights"
import { RecentAlerts } from "@/components/recent-alerts"
import { DashboardHeader } from "@/components/dashboard-header"
import { MobileHeader } from "@/components/mobile-header"
import { TrendingUp, AlertTriangle, Heart } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"


// Données simulées
const systemStatus = {
  bassins: { total: 12, actifs: 11, alertes: 1 },
  capteurs: { total: 48, actifs: 46, defaillants: 2 },
  alertes: { critiques: 2, moyennes: 5, resolues: 23 },
  health: { average: 87.3, trend: "+2.1%" },
}

export default function Dashboard() {
  return (
    <div className="flex-1">
        <AppSidebar />
      <MobileHeader title="Tableau de bord" />
      <div className="space-y-6 p-4 lg:p-6">
        <div className="hidden lg:block">
          <DashboardHeader />
        </div>

        {/* Statut du système */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bassins</CardTitle>
              <Badge variant={systemStatus.bassins.alertes > 0 ? "destructive" : "default"}>
                {systemStatus.bassins.actifs}/{systemStatus.bassins.total}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.bassins.actifs}</div>
              <p className="text-xs text-muted-foreground">{systemStatus.bassins.alertes} alerte(s) active(s)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Capteurs</CardTitle>
              <Badge variant={systemStatus.capteurs.defaillants > 0 ? "destructive" : "default"}>
                {systemStatus.capteurs.actifs}/{systemStatus.capteurs.total}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.capteurs.actifs}</div>
              <p className="text-xs text-muted-foreground">{systemStatus.capteurs.defaillants} défaillant(s)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertes</CardTitle>
              <Badge variant={systemStatus.alertes.critiques > 0 ? "destructive" : "secondary"}>
                {systemStatus.alertes.critiques + systemStatus.alertes.moyennes} actives
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{systemStatus.alertes.critiques}</div>
              <p className="text-xs text-muted-foreground">critiques, {systemStatus.alertes.moyennes} moyennes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Santé moyenne</CardTitle>
              <Heart className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{systemStatus.health.average}%</div>
              <p className="text-xs text-muted-foreground">{systemStatus.health.trend} depuis hier</p>
            </CardContent>
          </Card>
        </div>

        {/* Map and Alertes récentes */}
        <div className="grid gap-4 md:grid-cols-2">
          <DashboardMapSection />
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alertes récentes
              </CardTitle>
              <CardDescription>Dernières notifications du système</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <RecentAlerts /> */}
            </CardContent>
          </Card>
        </div>

        {/* Insights IA */}
        <Card>
          <CardHeader>
            <CardTitle>Tendances IA</CardTitle>
            <CardDescription>Prédictions et recommandations basées sur l'intelligence artificielle</CardDescription>
          </CardHeader>
          <CardContent>
            <AIInsights />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
