"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/components/language-provider"
import { t } from "@/utils/translation"
import {
  Search,
  Plus,
  FileText,
  Download,
  Eye,
  Calendar,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Send,
  Mail,
} from "lucide-react"
import { loadFakeData } from "@/utils/fakeData"

export default function RapportsPage() {
  const { language } = useLanguage()
  const [rapports, setRapports] = useState<any[]>([])
  const [rapportsEnvoyes, setRapportsEnvoyes] = useState<any[]>([])

  useEffect(() => {
    loadFakeData<{rapports: any[], rapportsEnvoyes: any[]}>('rapports.json').then(data => {
      setRapports(data.rapports)
      setRapportsEnvoyes(data.rapportsEnvoyes)
    })
  }, [])

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "genere":
        return (
          <Badge className="bg-green-100 text-green-800">
            <FileText className="mr-1 h-3 w-3" />
            Généré
          </Badge>
        )
      case "envoye":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Send className="mr-1 h-3 w-3" />
            Envoyé
          </Badge>
        )
      case "en_attente":
        return (
          <Badge variant="secondary">
            <TrendingUp className="mr-1 h-3 w-3" />
            En attente
          </Badge>
        )
      case "en_cours":
        return (
          <Badge variant="secondary">
            <TrendingUp className="mr-1 h-3 w-3" />
            En cours
          </Badge>
        )
      case "echec":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Échec
          </Badge>
        )
      default:
        return <Badge variant="outline">{statut}</Badge>
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "mensuel":
        return "bg-blue-100 text-blue-800"
      case "trimestriel":
        return "bg-purple-100 text-purple-800"
      case "incident":
        return "bg-red-100 text-red-800"
      case "predictif":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("tous")
  const [statutFilter, setStatutFilter] = useState("tous")
  const [showNewReportDialog, setShowNewReportDialog] = useState(false)
  const [showSendDialog, setShowSendDialog] = useState(false)
  const [selectedReport, setSelectedReport] = useState<any>(null)

  const filteredRapports = rapports.filter((rapport) => {
    const matchesSearch =
      rapport.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rapport.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "tous" || rapport.type === typeFilter
    const matchesStatut = statutFilter === "tous" || rapport.statut === statutFilter

    return matchesSearch && matchesType && matchesStatut
  })

  const filteredRapportsEnvoyes = rapportsEnvoyes.filter((rapport) => {
    const matchesSearch =
      rapport.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rapport.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatut = statutFilter === "tous" || rapport.statut === statutFilter

    return matchesSearch && matchesStatut
  })

  const handleSendReport = (rapport: any) => {
    setSelectedReport(rapport)
    setShowSendDialog(true)
  }

  return (
    <>
    <AppSidebar />
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("rapports.title", language)}</h1>
          <p className="text-muted-foreground">{t("rapports.subtitle", language)}</p>
        </div>
        <Dialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("rapports.new_report", language)}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Générer un nouveau rapport</DialogTitle>
              <DialogDescription>Configurez les paramètres pour générer un rapport personnalisé</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type de rapport</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensuel">Mensuel</SelectItem>
                      <SelectItem value="trimestriel">Trimestriel</SelectItem>
                      <SelectItem value="annuel">Annuel</SelectItem>
                      <SelectItem value="personnalise">Personnalisé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date de début</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Date de fin</Label>
                  <Input type="date" />
                </div>
              </div>

              <div>
                <Label>Bassins à inclure</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {["B-001", "B-002", "B-003", "B-004", "B-005", "B-007"].map((bassin) => (
                    <div key={bassin} className="flex items-center space-x-2">
                      <Checkbox id={bassin} defaultChecked />
                      <Label htmlFor={bassin} className="text-sm">
                        {bassin}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Paramètres à analyser</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Température", "Salinité", "pH", "Oxygène", "Ammoniac", "Nitrites"].map((param) => (
                    <div key={param} className="flex items-center space-x-2">
                      <Checkbox id={param} defaultChecked />
                      <Label htmlFor={param} className="text-sm">
                        {param}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="includeIA" defaultChecked />
                <Label htmlFor="includeIA">Inclure les prédictions IA</Label>
              </div>

              <div>
                <Label>Notes additionnelles</Label>
                <Textarea placeholder="Commentaires ou instructions spéciales..." />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewReportDialog(false)}>
                {t("common.cancel", language)}
              </Button>
              <Button onClick={() => setShowNewReportDialog(false)}>Générer le rapport</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total rapports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rapports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {rapports.filter((r) => new Date(r.dateCreation).getMonth() === new Date().getMonth()).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avec IA</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{rapports.filter((r) => r.incluIA).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Envoyés</CardTitle>
            <Send className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {rapportsEnvoyes.filter((r) => r.statut === "envoye").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="generated" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generated">Rapports générés</TabsTrigger>
          <TabsTrigger value="sent">Rapports envoyés</TabsTrigger>
        </TabsList>

        <TabsContent value="generated" className="space-y-4">
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
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les types</SelectItem>
                    <SelectItem value="mensuel">Mensuel</SelectItem>
                    <SelectItem value="trimestriel">Trimestriel</SelectItem>
                    <SelectItem value="incident">Incident</SelectItem>
                    <SelectItem value="predictif">Prédictif</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statutFilter} onValueChange={setStatutFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les statuts</SelectItem>
                    <SelectItem value="genere">Généré</SelectItem>
                    <SelectItem value="en_cours">En cours</SelectItem>
                    <SelectItem value="erreur">Erreur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des rapports générés */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des rapports ({filteredRapports.length})</CardTitle>
              <CardDescription>Tous vos rapports générés et leur statut</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rapport</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>IA incluse</TableHead>
                    <TableHead>Créé par</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRapports.map((rapport) => (
                    <TableRow key={rapport.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rapport.nom}</div>
                          <div className="text-sm text-muted-foreground">{rapport.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(rapport.type)}>{rapport.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(rapport.dateDebut).toLocaleDateString("fr-FR")}</div>
                          <div className="text-muted-foreground">
                            au {new Date(rapport.dateFin).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(rapport.statut)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{rapport.taille}</div>
                          <div className="text-muted-foreground">{rapport.pages} pages</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {rapport.incluIA ? (
                          <Badge variant="outline" className="text-green-600">
                            Oui
                          </Badge>
                        ) : (
                          <Badge variant="outline">Non</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{rapport.creePar}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(rapport.dateCreation).toLocaleDateString("fr-FR")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {rapport.statut === "genere" && (
                            <>
                              <Button size="sm" variant="outline">
                                <Eye className="mr-1 h-3 w-3" />
                                Aperçu
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="mr-1 h-3 w-3" />
                                Télécharger
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleSendReport(rapport)}>
                                <Send className="mr-1 h-3 w-3" />
                                Envoyer
                              </Button>
                            </>
                          )}
                          {rapport.statut === "en_cours" && <Badge variant="secondary">Génération...</Badge>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          {/* Filtres pour rapports envoyés */}
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
                <Select value={statutFilter} onValueChange={setStatutFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Statut d'envoi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tous">Tous les statuts</SelectItem>
                    <SelectItem value="envoye">Envoyé</SelectItem>
                    <SelectItem value="en_attente">En attente</SelectItem>
                    <SelectItem value="echec">Échec</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des rapports envoyés */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t("rapports.sent_reports", language)} ({filteredRapportsEnvoyes.length})
              </CardTitle>
              <CardDescription>Historique des rapports envoyés avec leurs destinataires</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rapport</TableHead>
                    <TableHead>Date d'envoi</TableHead>
                    <TableHead>Destinataires</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRapportsEnvoyes.map((rapport) => (
                    <TableRow key={rapport.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rapport.nom}</div>
                          <div className="text-sm text-muted-foreground">{rapport.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{rapport.dateEnvoi}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {rapport.destinataires.map((dest: string, index: number) => (
                            <div key={index} className="text-sm flex items-center">
                              <Mail className="mr-1 h-3 w-3" />
                              {dest}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(rapport.statut)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{rapport.taille}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-1 h-3 w-3" />
                            {t("rapports.view_report", language)}
                          </Button>
                          {rapport.statut === "echec" && (
                            <Button size="sm" variant="outline">
                              <Send className="mr-1 h-3 w-3" />
                              {t("rapports.resend", language)}
                            </Button>
                          )}
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

      {/* Dialog pour envoyer un rapport */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("rapports.send_report", language)}</DialogTitle>
            <DialogDescription>Envoyer le rapport "{selectedReport?.nom}" par email</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="recipients">{t("rapports.recipients", language)}</Label>
              <Textarea
                id="recipients"
                placeholder="email1@exemple.com, email2@exemple.com"
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label htmlFor="subject">Sujet</Label>
              <Input id="subject" defaultValue={`Rapport: ${selectedReport?.nom}`} />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Message d'accompagnement..." className="min-h-[100px]" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSendDialog(false)}>
              {t("common.cancel", language)}
            </Button>
            <Button onClick={() => setShowSendDialog(false)}>
              <Send className="mr-2 h-4 w-4" />
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div></>
  )
}
