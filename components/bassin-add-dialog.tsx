"use client"
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import dynamic from "next/dynamic"

// Dynamically import MapContainer and Marker to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false })
const useMapEvents = dynamic(() => import("react-leaflet").then(mod => mod.useMapEvents), { ssr: false })

// You must import Leaflet CSS in your _app or globals.css:
// import 'leaflet/dist/leaflet.css';

interface BassinAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function BassinAddDialog({ open, onOpenChange, onSuccess }: BassinAddDialogProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    capacity: 1,
    depth: 1,
    surface_area: 1,
    location_name: "",
    latitude: 0,
    longitude: 0,
    fish_species: "",
    fish_count: 0,
    stocking_date: new Date().toISOString().slice(0, 10),
    aeration_system: false,
    filtration_system: false,
    heating_system: false,
    manager_contact: "",
    alert_config: {}
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showMap, setShowMap] = useState(false)

  // Map click handler
  function MapClickHandler() {
    // @ts-ignore
    useMapEvents({
      click(e) {
        setForm(f => ({ ...f, latitude: e.latlng.lat, longitude: e.latlng.lng }))
        setShowMap(false)
      }
    })
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau bassin</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
            <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
            <Input name="capacity" type="number" placeholder="Capacité" value={form.capacity} onChange={handleChange} required />
            <Input name="depth" type="number" placeholder="Profondeur" value={form.depth} onChange={handleChange} required />
            <Input name="surface_area" type="number" placeholder="Surface (m²)" value={form.surface_area} onChange={handleChange} required />
            <Input name="location_name" placeholder="Nom du lieu" value={form.location_name} onChange={handleChange} required />
            <Input name="fish_species" placeholder="Espèce de poisson" value={form.fish_species} onChange={handleChange} required />
            <Input name="fish_count" type="number" placeholder="Nombre de poissons" value={form.fish_count} onChange={handleChange} required />
            <Input name="manager_contact" placeholder="Contact du gestionnaire" value={form.manager_contact} onChange={handleChange} required />
            <Input name="stocking_date" type="date" placeholder="Date d'empoissonnement" value={form.stocking_date} onChange={handleChange} required />
          </div>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="aeration_system" checked={form.aeration_system} onChange={handleChange} />
              Aération
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="filtration_system" checked={form.filtration_system} onChange={handleChange} />
              Filtration
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="heating_system" checked={form.heating_system} onChange={handleChange} />
              Chauffage
            </label>
          </div>
          <div className="mb-2">
            <Button type="button" variant="outline" onClick={() => setShowMap(true)}>
              Pin location on map
            </Button>
            <div className="text-xs mt-1 text-gray-500">
              Lat: {form.latitude}, Lng: {form.longitude}
            </div>
            {showMap && (
              <div className="mt-2 mb-2" style={{ height: 220, width: "100%", borderRadius: 8, overflow: "hidden" }}>
                {typeof window !== "undefined" && (
                  <MapContainer center={[form.latitude || 34, form.longitude || -6]} zoom={5} style={{ height: "100%", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClickHandler />
                    {form.latitude && form.longitude ? (
                      <Marker position={[form.latitude, form.longitude]} />
                    ) : null}
                  </MapContainer>
                )}
              </div>
            )}
          </div>
          {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-1">Bassin ajouté avec succès !</div>}
          <DialogFooter>
            <Button type="submit" disabled={loading}>{loading ? "Ajout..." : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 