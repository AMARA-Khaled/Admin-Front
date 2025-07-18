"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import seuilsData from "@/data/seuil.json"
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
import { Settings, Users, Bell, Plus, Edit, Key } from "lucide-react"

// Données simulées des utilisateurs
const utilisateurs = [
  {
    id: "USR-001",
    nom: "Admin Principal",
    email: "admin@aquamonitor.com",
    role: "administrateur",
    statut: "actif",
    dernierConnexion: "2024-01-15 15:30",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-002",
    nom: "Technicien Chef",
    email: "tech.chef@aquamonitor.com",
    role: "technicien",
    statut: "actif",
    dernierConnexion: "2024-01-15 14:45",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-003",
    nom: "Superviseur",
    email: "superviseur@aquamonitor.com",
    role: "superviseur",
    statut: "actif",
    dernierConnexion: "2024-01-15 12:20",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "USR-004",
    nom: "Opérateur",
    email: "operateur@aquamonitor.com",
    role: "operateur",
    statut: "inactif",
    dernierConnexion: "2024-01-10 09:15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const getRoleBadge = (role: string) => {
  switch (role) {
    case "administrateur":
      return <Badge variant="destructive">Administrateur</Badge>
    case "superviseur":
      return <Badge variant="default">Superviseur</Badge>
    case "technicien":
      return <Badge variant="secondary">Technicien</Badge>
    case "operateur":
      return <Badge variant="outline">Opérateur</Badge>
    default:
      return <Badge variant="outline">{role}</Badge>
  }
}

const getStatusBadge = (statut: string) => {
  switch (statut) {
    case "actif":
      return <Badge className="bg-green-100 text-green-800">Actif</Badge>
    case "inactif":
      return <Badge variant="secondary">Inactif</Badge>
    case "suspendu":
      return <Badge variant="destructive">Suspendu</Badge>
    default:
      return <Badge variant="outline">{statut}</Badge>
  }
}

export default function ParametresPage() {
  const { t } = useLanguage()
  const [showNewUserDialog, setShowNewUserDialog] = useState(false)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">Configuration système et gestion des utilisateurs</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="seuils">Seuils</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Paramètres généraux
              </CardTitle>
              <CardDescription>Configuration de base du système</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom-site">Nom du site</Label>
                  <Input id="nom-site" defaultValue="Ferme Aquacole Principale" />
                </div>
                <div>
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select defaultValue="africa/tunis">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa/tunis">Africa/Tunis</SelectItem>
                      <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="langue-defaut">Langue par défaut</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="unite-temp">Unité de température</Label>
                  <Select defaultValue="celsius">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celsius">Celsius (°C)</SelectItem>
                      <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description du site</Label>
                <Textarea
                  id="description"
                  defaultValue="Ferme aquacole moderne spécialisée dans l'élevage de saumons atlantiques avec système de monitoring IoT avancé."
                  className="min-h-[100px]"
                />
              </div>

              <Button>Sauvegarder les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seuils" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seuils d'alerte globaux</CardTitle>
              <CardDescription>Configuration des seuils par défaut pour tous les bassins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Température</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="temp-min">Minimum (°C)</Label>
                      <Input id="temp-min" type="number" defaultValue={seuilsData.temperature.min} />
                    </div>
                    <div>
                      <Label htmlFor="temp-max">Maximum (°C)</Label>
                      <Input id="temp-max" type="number" defaultValue={seuilsData.temperature.max} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Salinité</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sal-min">Minimum (‰)</Label>
                      <Input id="sal-min" type="number" defaultValue={seuilsData.salinite.min} />
                    </div>
                    <div>
                      <Label htmlFor="sal-max">Maximum (‰)</Label>
                      <Input id="sal-max" type="number" defaultValue={seuilsData.salinite.max} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">pH</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ph-min">Minimum</Label>
                      <Input id="ph-min" type="number" step="0.1" defaultValue={seuilsData.ph.min} />
                    </div>
                    <div>
                      <Label htmlFor="ph-max">Maximum</Label>
                      <Input id="ph-max" type="number" step="0.1" defaultValue={seuilsData.ph.max} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Oxygène dissous</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="o2-min">Minimum (mg/L)</Label>
                      <Input id="o2-min" type="number" defaultValue={seuilsData.oxygene.min} />
                    </div>
                    <div>
                      <Label htmlFor="o2-max">Maximum (mg/L)</Label>
                      <Input id="o2-max" type="number" defaultValue={seuilsData.oxygene.max} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Solides suspendus</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ss-min">Minimum (mg/L)</Label>
                      <Input id="ss-min" type="number" defaultValue={seuilsData.solidesSuspendus.min} />
                    </div>
                    <div>
                      <Label htmlFor="ss-max">Maximum (mg/L)</Label>
                      <Input id="ss-max" type="number" defaultValue={seuilsData.solidesSuspendus.max} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Nitrate</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="no3-min">Minimum (mg/L)</Label>
                      <Input id="no3-min" type="number" defaultValue={seuilsData.nitrate.min} />
                    </div>
                    <div>
                      <Label htmlFor="no3-max">Maximum (mg/L)</Label>
                      <Input id="no3-max" type="number" defaultValue={seuilsData.nitrate.max} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Ammoniac</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nh3-min">Minimum (mg/L)</Label>
                      <Input id="nh3-min" type="number" step="0.01" defaultValue={seuilsData.ammoniac.min} />
                    </div>
                    <div>
                      <Label htmlFor="nh3-max">Maximum (mg/L)</Label>
                      <Input id="nh3-max" type="number" step="0.01" defaultValue={seuilsData.ammoniac.max} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Niveau d'eau</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eau-min">Minimum (%)</Label>
                      <Input id="eau-min" type="number" defaultValue={seuilsData.niveauEau.min} />
                    </div>
                    <div>
                      <Label htmlFor="eau-max">Maximum (%)</Label>
                      <Input id="eau-max" type="number" defaultValue={seuilsData.niveauEau.max} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Turbidité / MES</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="turb-min">Minimum (NTU)</Label>
                      <Input id="turb-min" type="number" defaultValue={seuilsData.turbidite.min} />
                    </div>
                    <div>
                      <Label htmlFor="turb-max">Maximum (NTU)</Label>
                      <Input id="turb-max" type="number" defaultValue={seuilsData.turbidite.max} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Chlorophylle / Phycocyanine</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="chl-min">Minimum (μg/L)</Label>
                      <Input id="chl-min" type="number" defaultValue={seuilsData.chlorophylle.min} />
                    </div>
                    <div>
                      <Label htmlFor="chl-max">Maximum (μg/L)</Label>
                      <Input id="chl-max" type="number" defaultValue={seuilsData.chlorophylle.max} />
                    </div>
                  </div>
                </div>
              </div>

              <Button>Appliquer aux nouveaux bassins</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Paramètres de notification
              </CardTitle>
              <CardDescription>Configuration des alertes et notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-alerts">Alertes par email</Label>
                    <p className="text-sm text-muted-foreground">Recevoir les alertes critiques par email</p>
                  </div>
                  <Switch id="email-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-alerts">Alertes par SMS</Label>
                    <p className="text-sm text-muted-foreground">Recevoir les alertes urgentes par SMS</p>
                  </div>
                  <Switch id="sms-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Notifications push</Label>
                    <p className="text-sm text-muted-foreground">Notifications dans l'application</p>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily-reports">Rapports quotidiens</Label>
                    <p className="text-sm text-muted-foreground">Recevoir un résumé quotidien par email</p>
                  </div>
                  <Switch id="daily-reports" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Contacts d'urgence</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email-urgence">Email d'urgence</Label>
                    <Input id="email-urgence" type="email" defaultValue="urgence@aquamonitor.com" />
                  </div>
                  <div>
                    <Label htmlFor="tel-urgence">Téléphone d'urgence</Label>
                    <Input id="tel-urgence" type="tel" defaultValue="+216 98 123 456" />
                  </div>
                </div>
              </div>

              <Button>Sauvegarder les notifications</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilisateurs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestion des utilisateurs
                  </CardTitle>
                  <CardDescription>Administration des comptes utilisateurs</CardDescription>
                </div>
                <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nouvel utilisateur
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
                      <DialogDescription>Ajouter un nouveau compte utilisateur au système</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="user-nom">Nom complet</Label>
                          <Input id="user-nom" placeholder="ex: Jean Dupont" />
                        </div>
                        <div>
                          <Label htmlFor="user-email">Email</Label>
                          <Input id="user-email" type="email" placeholder="jean.dupont@exemple.com" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="user-role">Rôle</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="administrateur">Administrateur</SelectItem>
                              <SelectItem value="superviseur">Superviseur</SelectItem>
                              <SelectItem value="technicien">Technicien</SelectItem>
                              <SelectItem value="operateur">Opérateur</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="user-statut">Statut</Label>
                          <Select defaultValue="actif">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="actif">Actif</SelectItem>
                              <SelectItem value="inactif">Inactif</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="user-password">Mot de passe temporaire</Label>
                        <Input id="user-password" type="password" placeholder="Mot de passe temporaire" />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>
                        Annuler
                      </Button>
                      <Button onClick={() => setShowNewUserDialog(false)}>Créer l'utilisateur</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {utilisateurs.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.nom
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.nom}</div>
                            <div className="text-sm text-muted-foreground">{user.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.statut)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{user.dernierConnexion}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="mr-1 h-3 w-3" />
                            Modifier
                          </Button>
                          <Button size="sm" variant="outline">
                            <Key className="mr-1 h-3 w-3" />
                            Réinitialiser
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
