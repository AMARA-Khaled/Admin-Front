"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
import { Label } from "@/components/ui/label"
import { Search, Eye, AlertTriangle, AlertCircle, Info, CheckCircle, Clock } from "lucide-react"
import { loadFakeData } from "@/utils/fakeData"

export default function AlertesPage() {
  const [alertes, setAlertes] = useState<any[]>([])
  useEffect(() => {
    loadFakeData<any[]>("alertes.json").then(setAlertes)
  }, [])

  const getGraviteColor = (gravite: string) => {
    switch (gravite) {
      case "critique":
        return "destructive"
      case "moyenne":
        return "secondary"
      case "faible":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "active":
        return "destructive"
      case "en_cours":
        return "secondary"
      case "resolu":
        return "default"
      case "ignore":
        return "outline"
      default:
        return "outline"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critique":
        return AlertTriangle
      case "warning":
        return AlertCircle
      case "info":
        return Info
      default:
        return Info
    }
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [graviteFilter, setGraviteFilter] = useState("tous")
  const [statutFilter, setStatutFilter] = useState("tous")
  const [selectedAlerte, setSelectedAlerte] = useState<(typeof alertes)[0] | null>(null)

  const filteredAlertes = alertes.filter((alerte) => {
    const matchesSearch =
      alerte.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alerte.bassin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alerte.capteur.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGravite = graviteFilter === "tous" || alerte.gravite === graviteFilter
    const matchesStatut = statutFilter === "tous" || alerte.statut === statutFilter

    return matchesSearch && matchesGravite && matchesStatut
  })

  const handleUpdateStatut = (alerteId: string, nouveauStatut: string, commentaire: string) => {
    // Ici on mettrait à jour l'alerte dans la base de données
    console.log(`Mise à jour alerte ${alerteId}: ${nouveauStatut} - ${commentaire}`)
    setSelectedAlerte(null)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alertes</h1>
          <p className="text-muted-foreground">Gestion des alertes et notifications du système</p>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total alertes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critiques</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {alertes.filter((a) => a.gravite === "critique" && a.statut === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {alertes.filter((a) => a.statut === "en_cours").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Résolues</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {alertes.filter((a) => a.statut === "resolu").length}
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
                  placeholder="Rechercher par titre, bassin ou capteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={graviteFilter} onValueChange={setGraviteFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Gravité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Toutes gravités</SelectItem>
                <SelectItem value="critique">Critique</SelectItem>
                <SelectItem value="moyenne">Moyenne</SelectItem>
                <SelectItem value="faible">Faible</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statutFilter} onValueChange={setStatutFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="resolu">Résolue</SelectItem>
                <SelectItem value="ignore">Ignorée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des alertes */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des alertes ({filteredAlertes.length})</CardTitle>
          <CardDescription>Toutes les alertes du système avec leur statut de traitement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alerte</TableHead>
                <TableHead>Bassin / Capteur</TableHead>
                <TableHead>Gravité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Traité par</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlertes.map((alerte) => {
                const Icon = getAlertIcon(alerte.type)
                return (
                  <TableRow key={alerte.id}>
                    <TableCell>
                      <div className="flex items-start space-x-2">
                        <Icon
                          className={`h-4 w-4 mt-0.5 ${
                            alerte.type === "critique"
                              ? "text-red-500"
                              : alerte.type === "warning"
                                ? "text-yellow-500"
                                : "text-blue-500"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{alerte.titre}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">{alerte.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline">{alerte.bassin}</Badge>
                        <div className="text-xs text-muted-foreground">{alerte.capteur}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getGraviteColor(alerte.gravite) as any}>{alerte.gravite}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatutColor(alerte.statut) as any}>{alerte.statut.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{alerte.timestamp}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{alerte.traitePar || "-"}</div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedAlerte(alerte)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Traiter
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <Icon
                                className={`h-5 w-5 ${
                                  alerte.type === "critique"
                                    ? "text-red-500"
                                    : alerte.type === "warning"
                                      ? "text-yellow-500"
                                      : "text-blue-500"
                                }`}
                              />
                              <span>{alerte.titre}</span>
                            </DialogTitle>
                            <DialogDescription>
                              ID: {alerte.id} • {alerte.timestamp}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium">Description</Label>
                              <p className="text-sm text-muted-foreground mt-1">{alerte.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Bassin</Label>
                                <p className="text-sm mt-1">{alerte.bassin}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Capteur</Label>
                                <p className="text-sm mt-1">{alerte.capteur}</p>
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Suggestion IA</Label>
                              <p className="text-sm text-muted-foreground mt-1">{alerte.suggestion}</p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="statut">Nouveau statut</Label>
                              <Select defaultValue={alerte.statut}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="en_cours">En cours</SelectItem>
                                  <SelectItem value="resolu">Résolue</SelectItem>
                                  <SelectItem value="ignore">Ignorée</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="commentaire">Commentaire / Action corrective</Label>
                              <Textarea
                                id="commentaire"
                                placeholder="Décrivez l'action entreprise..."
                                defaultValue={alerte.commentaire}
                                className="min-h-[100px]"
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline" onClick={() => setSelectedAlerte(null)}>
                              Annuler
                            </Button>
                            <Button onClick={() => handleUpdateStatut(alerte.id, "resolu", "")}>Sauvegarder</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
