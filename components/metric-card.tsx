"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  titleKey: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
  color: string
}

export function MetricCard({ titleKey, value, change, trend, icon: Icon, color }: MetricCardProps) {
  const { t } = useLanguage()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{t(titleKey)}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          {trend === "up" ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}</span>
          <span>depuis hier</span>
        </div>
      </CardContent>
    </Card>
  )
}
