"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/components/language-provider"
import { Search, Plus, Users, UserCheck, WifiOff, MapPin, Phone, Mail, UserPlus, Loader2 } from "lucide-react"
import { loadFakeData } from "@/utils/fakeData"
import { AppSidebar } from "@/components/app-sidebar"
import axios from "axios"

const getStatusBadge = (statut: string) => {
  switch (statut) {
    case "disponible":
      return (
        <Badge className="bg-green-100 text-green-800">
          <UserCheck className="mr-1 h-3 w-3" />
          Disponible
        </Badge>
      )
    case "affecte":
      return (
        <Badge variant="secondary">
          <Users className="mr-1 h-3 w-3" />
          Affecté
        </Badge>
      )
    case "hors_ligne":
      return (
        <Badge variant="outline">
          <WifiOff className="mr-1 h-3 w-3" />
          Hors ligne
        </Badge>
      )
    default:
      return <Badge variant="outline">{statut}</Badge>
  }
}

export default function AgentsPage() {
  const { t } = useLanguage()
  const [agents, setAgents] = useState<any[]>([])
  const [showNewAgentDialog, setShowNewAgentDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  // New agent form state
  const [newAgent, setNewAgent] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    organization: "",
    language: "fr",
    password: ""
  })

  useEffect(() => {
    loadFakeData<any[]>("agents.json").then(setAgents)
  }, [])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("tous")
  const [zoneFilter, setZoneFilter] = useState("tous")
  const [selectedAgent, setSelectedAgent] = useState<(typeof agents)[0] | null>(null)

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "tous" || agent.statut === statusFilter
    const matchesZone = zoneFilter === "tous" || agent.zone === zoneFilter

    return matchesSearch && matchesStatus && matchesZone
  })

  const handleCreateAgent = async () => {
    
  }

  const handleInputChange = (field: string, value: string) => {
    setNewAgent(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <AppSidebar />
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agents terrain</h1>
          <p className="text-muted-foreground">Gestion des agents de maintenance et supervision</p>
        </div>
        <Dialog open={showNewAgentDialog} onOpenChange={setShowNewAgentDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setShowNewAgentDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvel agent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un nouvel agent</DialogTitle>
              <DialogDescription>Remplissez les informations pour créer un nouvel agent terrain</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Nom d'utilisateur *</Label>
                  <Input
                    id="username"
                    value={newAgent.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="nom.utilisateur"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAgent.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="user@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">Prénom *</Label>
                  <Input
                    id="first_name"
                    value={newAgent.first_name}
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                    placeholder="Prénom"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Nom *</Label>
                  <Input
                    id="last_name"
                    value={newAgent.last_name}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                    placeholder="Nom"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone_number">Numéro de téléphone *</Label>
                  <Input
                    id="phone_number"
                    value={newAgent.phone_number}
                    onChange={(e) => handleInputChange("phone_number", e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organisation</Label>
                  <Input
                    id="organization"
                    value={newAgent.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    placeholder="Nom de l'organisation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Langue</Label>
                  <Select value={newAgent.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newAgent.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Mot de passe"
                    required
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewAgentDialog(false)} disabled={loading}>
                Annuler
              </Button>
              <Button onClick={handleCreateAgent} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  "Créer l'agent"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {agents.filter((a) => a.statut === "disponible").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affectés</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {agents.filter((a) => a.statut === "affecte").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hors ligne</CardTitle>
            <WifiOff className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {agents.filter((a) => a.statut === "hors_ligne").length}
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
                  placeholder="Rechercher par nom, ID ou email..."
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
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="affecte">Affecté</SelectItem>
                <SelectItem value="hors_ligne">Hors ligne</SelectItem>
              </SelectContent>
            </Select>
            <Select value={zoneFilter} onValueChange={setZoneFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Toutes les zones</SelectItem>
                <SelectItem value="Zone Nord">Zone Nord</SelectItem>
                <SelectItem value="Zone Sud">Zone Sud</SelectItem>
                <SelectItem value="Zone Est">Zone Est</SelectItem>
                <SelectItem value="Zone Ouest">Zone Ouest</SelectItem>
                <SelectItem value="Zone Centre">Zone Centre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des agents */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des agents ({filteredAgents.length})</CardTitle>
          <CardDescription>Vue d'ensemble de tous vos agents terrain</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Spécialité</TableHead>
                <TableHead>Mission actuelle</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {agent.nom
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{agent.nom}</div>
                        <div className="text-sm text-muted-foreground">{agent.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="mr-1 h-3 w-3" />
                        {agent.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-1 h-3 w-3" />
                        {agent.telephone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(agent.statut)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                      {agent.zone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{agent.specialite}</Badge>
                  </TableCell>
                  <TableCell>
                    {agent.missionActuelle ? (
                      <div className="text-sm">
                        <div className="font-medium">{agent.missionActuelle}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedAgent(agent)}>
                          <UserPlus className="mr-1 h-3 w-3" />
                          Affecter
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Affecter une mission - {agent.nom}</DialogTitle>
                          <DialogDescription>Assigner une nouvelle mission à cet agent</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Type de mission</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="maintenance">Maintenance</SelectItem>
                                  <SelectItem value="inspection">Inspection</SelectItem>
                                  <SelectItem value="reparation">Réparation</SelectItem>
                                  <SelectItem value="calibration">Calibration</SelectItem>
                                  <SelectItem value="urgence">Urgence</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Priorité</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="faible">Faible</SelectItem>
                                  <SelectItem value="normale">Normale</SelectItem>
                                  <SelectItem value="elevee">Élevée</SelectItem>
                                  <SelectItem value="critique">Critique</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Bassin/Capteur</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="B-001">Bassin B-001</SelectItem>
                                  <SelectItem value="B-002">Bassin B-002</SelectItem>
                                  <SelectItem value="C-018">Capteur C-018</SelectItem>
                                  <SelectItem value="C-024">Capteur C-024</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Durée estimée</Label>
                              <Input placeholder="ex: 2 heures" />
                            </div>
                          </div>

                          <div>
                            <Label>Description de la mission</Label>
                            <Textarea placeholder="Décrivez la mission à effectuer..." className="min-h-[100px]" />
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedAgent(null)}>
                            Annuler
                          </Button>
                          <Button>Affecter la mission</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
