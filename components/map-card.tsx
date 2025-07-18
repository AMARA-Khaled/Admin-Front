"use client"
import { MapContainer, TileLayer, Marker, Popup, Tooltip as LeafletTooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Fix default icon issue in Leaflet with Webpack
if (typeof window !== "undefined" && L) {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  })
}

export default function MapCard() {
  const [bassins, setBassins] = useState<any[]>([])
  const router = useRouter()
  useEffect(() => {
    import("@/data/bassins.json").then((mod) => setBassins(mod.default))
  }, [])

  return (
    <div style={{ width: "100%", height: 350, borderRadius: 12, overflow: "hidden" }}>
      <MapContainer center={[36.715, 3.183]} zoom={15} style={{ width: "100%", height: "100%" }} scrollWheelZoom={true}>
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
    </div>
  )
} 