"use client";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const MapCard = dynamic(() => import("@/components/map-card"), { 
  ssr: false,
  loading: () => (
    <div className="h-80 flex items-center justify-center">
      <LoadingSpinner text="Chargement de la carte..." />
    </div>
  )
});

export default function DashboardMapSection() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Carte des bassins</CardTitle>
        <CardDescription>Localisation des bassins autour de l'USTHB</CardDescription>
      </CardHeader>
      <CardContent>
        <MapCard />
      </CardContent>
    </Card>
  );
} 