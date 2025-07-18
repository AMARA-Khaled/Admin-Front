"use client"
import React, { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, AlertCircle, Info, Clock, ArrowRight } from "lucide-react"
import axios from 'axios';

axios.get("http://localhost:8000/api/v1/alerts", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
  }
})
  .then(response => {
    const alerts = response.data;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



const getAlertIcon = (type: string) => {
  switch (type) {
    case "critical":
      return AlertTriangle
    case "warning":
      return AlertCircle
    case "info":
      return Info
    default:
      return Info
  }
}

const getAlertColor = (type: string) => {
  switch (type) {
    case "critical":
      return "destructive"
    case "warning":
      return "secondary"
    case "info":
      return "outline"
    default:
      return "outline"
  }
}

export function RecentAlerts() {
  const [alerts, setAlerts] = useState<any[]>([])
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/alerts", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    .then(response => {
      const alerts = response.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [])

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-3">
        {alerts.map((alert: any) => {
          const Icon = getAlertIcon(alert.type)
          return (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border">
              <Icon
                className={`h-4 w-4 mt-0.5 ${
                  alert.type === "critical"
                    ? "text-red-500"
                    : alert.type === "warning"
                      ? "text-yellow-500"
                      : "text-blue-500"
                }`}
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <Badge variant={getAlertColor(alert.type) as any} className="text-xs">
                    {alert.bassin}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {alert.time}
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    Traiter
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
