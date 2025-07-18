"use client"

import { useEffect, useState } from "react"
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
import {
  Search,
  Thermometer,
  Droplets,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  WifiOff,
  Plus,
  Settings,
  Trash2,
} from "lucide-react"
import { loadFakeData } from "@/utils/fakeData"

const getStatusBadge = (statut: string) => {
  switch (statut) {
    case "actif":
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Actif
        </Badge>
      )
    case "critique":
      return (
        <Badge variant="destructive">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Critique
        </Badge>
      )
    case "deconnecte":
      return (
        <Badge variant="secondary">
          <WifiOff className="mr-1 h-3 w-3" />
          Déconnecté
        </Badge>
      )
    default:
      return <Badge variant="outline">{statut}</Badge>
  }
}

export default function CapteursPage() {
  const { t } = useLanguage()
  const [capteurs, setCapteurs] = useState<any[]>([])
  useEffect(() => {
    loadFakeData<any[]>("capteurs.json").then(setCapteurs)
  }, [])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("tous")
  const [statusFilter, setStatusFilter] = useState("tous")
  const [showNewCapteurDialog, setShowNewCapteurDialog] = useState(false)
  const [newCapteurData, setNewCapteurData] = useState({
    bassin: "",
    type: "",
    statut: "actif",
  })

  const filteredCapteurs = capteurs.filter((capteur) => {
    const matchesSearch =
      capteur.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capteur.bassin.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "tous" || capteur.type === typeFilter
    const matchesStatus = statusFilter === "tous" || capteur.statut === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const handleCreateCapteur = () => {
    // Logique pour créer un nouveau capteur
    console.log("Nouveau capteur:", newCapteurData)
    setShowNewCapteurDialog(false)
    setNewCapteurData({
      bassin: "",
      type: "",
      statut: "actif",
    })
  }

  const iconMap = {
    Thermometer,
    Droplets,
    Activity,
    Zap,
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Capteurs</h1>
          <p className="text-muted-foreground">Surveillance et gestion de tous vos capteurs IoT</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Calibration
          </Button>
          <Dialog open={showNewCapteurDialog} onOpenChange={setShowNewCapteurDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau capteur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un nouveau capteur</DialogTitle>
                <DialogDescription>Saisissez les informations du nouveau capteur</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bassin">Bassin</Label>
                  <Select
                    value={newCapteurData.bassin}
                    onValueChange={(value) => setNewCapteurData({ ...newCapteurData, bassin: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un bassin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B-001">B-001</SelectItem>
                      <SelectItem value="B-002">B-002</SelectItem>
                      <SelectItem value="B-003">B-003</SelectItem>
                      <SelectItem value="B-004">B-004</SelectItem>
                      <SelectItem value="B-005">B-005</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newCapteurData.type}
                    onValueChange={(value) => setNewCapteurData({ ...newCapteurData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Température">Température</SelectItem>
                      <SelectItem value="Salinité">Salinité</SelectItem>
                      <SelectItem value="pH">pH</SelectItem>
                      <SelectItem value="Oxygène">Oxygène</SelectItem>
                      <SelectItem value="Turbidité">Turbidité</SelectItem>
                      <SelectItem value="Nitrate">Nitrate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="statut">Statut</Label>
                  <Select
                    value={newCapteurData.statut}
                    onValueChange={(value) => setNewCapteurData({ ...newCapteurData, statut: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="critique">Critique</SelectItem>
                      <SelectItem value="deconnecte">Déconnecté</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewCapteurDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateCapteur}>Créer le capteur</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total capteurs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capteurs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {capteurs.filter((c) => c.statut === "actif").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critiques</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {capteurs.filter((c) => c.statut === "critique").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Déconnectés</CardTitle>
            <WifiOff className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {capteurs.filter((c) => c.statut === "deconnecte").length}
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
                  placeholder="Rechercher par ID ou bassin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de capteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les types</SelectItem>
                <SelectItem value="Température">Température</SelectItem>
                <SelectItem value="Salinité">Salinité</SelectItem>
                <SelectItem value="pH">pH</SelectItem>
                <SelectItem value="Oxygène">Oxygène</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="critique">Critique</SelectItem>
                <SelectItem value="deconnecte">Déconnecté</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des capteurs */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des capteurs ({filteredCapteurs.length})</CardTitle>
          <CardDescription>Vue d'ensemble de tous vos capteurs avec leur état actuel</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID / Type</TableHead>
                <TableHead>Bassin</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière mesure</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead>Précision</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCapteurs.map((capteur) => {
                const Icon = iconMap[capteur.icon] || Thermometer;
                return (
                  <TableRow key={capteur.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-4 w-4 ${capteur.color || ''}`} />
                        <div>
                          <div className="font-medium">{capteur.id}</div>
                          <div className="text-sm text-muted-foreground">{capteur.type}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{capteur.bassin}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(capteur.statut)}</TableCell>
                    <TableCell>
                      <div className="font-medium">{capteur.derniereMesure}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{capteur.derniereConnexion}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">{capteur.precision}</div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Trash2 className="mr-1 h-3 w-3" />
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
