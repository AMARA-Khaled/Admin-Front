"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function DashboardHeader() {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="text-green-600">
          <CheckCircle className="mr-1 h-3 w-3" />
          {t("dashboard.system_operational")}
        </Badge>
        <Button variant="outline" size="sm">
          <Clock className="mr-2 h-4 w-4" />
          {t("dashboard.last_update")}
        </Button>
      </div>
    </div>
  )
}
