"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/components/language-provider"
import { Search, Eye, Thermometer, Droplets, Activity, AlertTriangle, CheckCircle, Plus, Trash2 } from "lucide-react"
import { loadFakeData } from "@/utils/fakeData"
import { AppSidebar } from "@/components/app-sidebar"

const getStatusBadge = (statut: string) => {
  switch (statut) {
    case "actif":
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Actif
        </Badge>
      )
    case "alerte":
      return (
        <Badge variant="destructive">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Alerte
        </Badge>
      )
    case "maintenance":
      return <Badge variant="secondary">Maintenance</Badge>
    default:
      return <Badge variant="outline">{statut}</Badge>
  }
}

export default function BassinsPage() {
  const { t } = useLanguage()
  const [bassins, setBassins] = useState<any[]>([])
  useEffect(() => {
    loadFakeData<any[]>("bassins.json").then(setBassins)
  }, [])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("tous")
  const [showNewBassinDialog, setShowNewBassinDialog] = useState(false)
  const [newBassinData, setNewBassinData] = useState({
    id: "",
    ferme: "",
    statut: "actif",
    nombrePoissons: "",
    capteurs: "",
  })

  const filteredBassins = bassins.filter((bassin) => {
    const matchesSearch =
      bassin.ferme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bassin.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "tous" || bassin.statut === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleCreateBassin = () => {
    // Logique pour créer un nouveau bassin
    console.log("Nouveau bassin:", newBassinData)
    setShowNewBassinDialog(false)
    setNewBassinData({
      id: "",
      ferme: "",
      statut: "actif",
      nombrePoissons: "",
      capteurs: "",
    })
  }

  return (
    <>
      <AppSidebar />
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bassins</h1>
          <p className="text-muted-foreground">Gestion et surveillance de vos bassins aquacoles</p>
        </div>
        <Dialog open={showNewBassinDialog} onOpenChange={setShowNewBassinDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau bassin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau bassin</DialogTitle>
              <DialogDescription>Saisissez les informations du nouveau bassin</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bassin-id">ID du bassin</Label>
                <Input
                  id="bassin-id"
                  placeholder="ex: B-006"
                  value={newBassinData.id}
                  onChange={(e) => setNewBassinData({ ...newBassinData, id: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="ferme">Ferme</Label>
                <Input
                  id="ferme"
                  placeholder="ex: Ferme Aquacole Nord"
                  value={newBassinData.ferme}
                  onChange={(e) => setNewBassinData({ ...newBassinData, ferme: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="statut">Statut</Label>
                <Select
                  value={newBassinData.statut}
                  onValueChange={(value) => setNewBassinData({ ...newBassinData, statut: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="alerte">Alerte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="nombre-poissons">Nombre de poissons</Label>
                <Input
                  id="nombre-poissons"
                  type="number"
                  placeholder="ex: 1250"
                  value={newBassinData.nombrePoissons}
                  onChange={(e) => setNewBassinData({ ...newBassinData, nombrePoissons: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="capteurs">IDs des capteurs (séparés par des virgules)</Label>
                <Input
                  id="capteurs"
                  placeholder="ex: C-001, C-002, C-003"
                  value={newBassinData.capteurs}
                  onChange={(e) => setNewBassinData({ ...newBassinData, capteurs: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewBassinDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateBassin}>Créer le bassin</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total bassins</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bassins.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {bassins.filter((b) => b.statut === "actif").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En alerte</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{bassins.filter((b) => b.statut === "alerte").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Activity className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {bassins.filter((b) => b.statut === "maintenance").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres et recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="alerte">En alerte</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des bassins */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des bassins ({filteredBassins.length})</CardTitle>
          <CardDescription>Vue d'ensemble de tous vos bassins avec leurs paramètres actuels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID / Nom</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Température</TableHead>
                <TableHead>Salinité</TableHead>
                <TableHead>pH</TableHead>
                <TableHead>O₂</TableHead>
                <TableHead>Capteurs</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBassins.map((bassin) => (
                <TableRow key={bassin.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{bassin.id}</div>
                      <div className="text-sm text-muted-foreground">{bassin.ferme}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(bassin.statut)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Thermometer className="mr-1 h-3 w-3 text-orange-500" />
                      {bassin.parametres?.temperature?.valeur}°C
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Droplets className="mr-1 h-3 w-3 text-blue-500" />
                      {bassin.parametres?.salinite?.valeur}‰
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Activity className="mr-1 h-3 w-3 text-green-500" />
                      {bassin.parametres?.ph?.valeur}
                    </div>
                  </TableCell>
                  <TableCell>
                    {bassin.parametres?.oxygene?.valeur} mg/L
                  </TableCell>
                  <TableCell>
                    <Badge variant={bassin.capteurs?.filter((c:any)=>c.statut==="actif").length===bassin.capteurs?.length?"default":"destructive"}>
                      {bassin.capteurs?.filter((c:any)=>c.statut==="actif").length}/{bassin.capteurs?.length}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/bassins/${bassin.id}`}>
                          <Eye className="mr-1 h-3 w-3" />
                          Détails
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="mr-1 h-3 w-3" />
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </>
  )
}
