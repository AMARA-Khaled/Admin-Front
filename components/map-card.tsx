"use client"
import { MapContainer, TileLayer, Marker, Popup, Tooltip as LeafletTooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Fix default icon issue in Leaflet with Webpack
if (typeof window !== "undefined" && L) {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  })
}

function MapContent() {
  const [bassins, setBassins] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadBassins = async () => {
      try {
        setIsLoading(true)
        const mod = await import("@/data/bassins.json")
        setBassins(mod.default)
      } catch (err) {
        setError("Erreur lors du chargement des données")
        console.error("Error loading bassins:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadBassins()
  }, [])

  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <LoadingSpinner text="Chargement de la carte..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-sm text-primary hover:underline"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <MapContainer 
      center={[36.715, 3.183]} 
      zoom={15} 
      style={{ width: "100%", height: "100%" }} 
      scrollWheelZoom={true}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bassins.map((bassin) => (
        <Marker
          key={bassin.id}
          position={[bassin.location.lat, bassin.location.lng]}
          eventHandlers={{
            click: () => router.push(`/bassins/${bassin.id}`),
          }}
        >
          <LeafletTooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
            <div>
              <strong>{bassin.id}</strong>
              <br />Statut: {bassin.statut}
            </div>
          </LeafletTooltip>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default function MapCard() {
  return (
    <div style={{ width: "100%", height: 350, borderRadius: 12, overflow: "hidden" }}>
      <Suspense fallback={
        <div className="h-full flex items-center justify-center">
          <LoadingSpinner text="Initialisation de la carte..." />
        </div>
      }>
        <MapContent />
      </Suspense>
    </div>
  )
} 