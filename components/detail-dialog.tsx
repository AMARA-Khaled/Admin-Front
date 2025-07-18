"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "bassin" | "capteur" | "alerte"
  item: any
  onSave?: (data: any) => void
  onDelete?: () => void
}

export function DetailDialog({ open, onOpenChange, type, item, onSave, onDelete }: DetailDialogProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState(item || {})

  const handleSave = () => {
    onSave?.(formData)
    onOpenChange(false)
  }

  const handleDelete = () => {
    onDelete?.()
    onOpenChange(false)
  }

  const renderBassinContent = () => (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">Général</TabsTrigger>
        <TabsTrigger value="parameters">Paramètres</TabsTrigger>
        <TabsTrigger value="sensors">Capteurs</TabsTrigger>
        <TabsTrigger value="history">Historique</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nom">{t("common.name")}</Label>
            <Input
              id="nom"
              value={formData.nom || ""}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="statut">{t("common.status")}</Label>
            <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="capacite">Capacité</Label>
            <Input
              id="capacite"
              value={formData.capacite || ""}
              onChange={(e) => setFormData({ ...formData, capacite: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="production">Production</Label>
            <Input
              id="production"
              value={formData.production || ""}
              onChange={(e) => setFormData({ ...formData, production: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="localisation">Localisation</Label>
          <Input
            id="localisation"
            value={formData.localisation || ""}
            onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="description">{t("common.description")}</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      </TabsContent>

      <TabsContent value="parameters" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Température</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Min (°C)</Label>
                  <Input type="number" defaultValue="22" />
                </div>
                <div>
                  <Label className="text-xs">Max (°C)</Label>
                  <Input type="number" defaultValue="26" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Salinité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Min (‰)</Label>
                  <Input type="number" defaultValue="34" />
                </div>
                <div>
                  <Label className="text-xs">Max (‰)</Label>
                  <Input type="number" defaultValue="36" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="sensors" className="space-y-4">
        <div className="space-y-2">
          {item?.capteurs?.map((capteur: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">{capteur.id}</div>
                <div className="text-sm text-muted-foreground">{capteur.type}</div>
              </div>
              <Badge variant={capteur.statut === "actif" ? "default" : "destructive"}>
                {capteur.statut}
              </Badge>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Historique des modifications et événements du bassin...
        </div>
      </TabsContent>
    </Tabs>
  )

  const renderCapteurContent = () => (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">Général</TabsTrigger>
        <TabsTrigger value="config">Configuration</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="data">Données</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="id">ID Capteur</Label>
            <Input
              id="id"
              value={formData.id || ""}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="type">{t("common.type")}</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temperature">Température</SelectItem>
                <SelectItem value="salinite">Salinité</SelectItem>
                <SelectItem value="ph">pH</SelectItem>
                <SelectItem value="oxygene">Oxygène</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bassin">Bassin</Label>
            <Select value={formData.bassin} onValueChange={(value) => setFormData({ ...formData, bassin: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B-001">B-001</SelectItem>
                <SelectItem value="B-002">B-002</SelectItem>
                <SelectItem value="B-003">B-003</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="statut">{t("common.status")}</Label>
            <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
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
      </TabsContent>

      <TabsContent value="config" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="frequence">Fréquence (sec)</Label>
            <Input
              id="frequence"
              type="number"
              value={formData.frequence || 30}
              onChange={(e) => setFormData({ ...formData, frequence: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="precision">Précision</Label>
            <Input
              id="precision"
              value={formData.precision || ""}
              onChange={(e) => setFormData({ ...formData, precision: e.target.value })}
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="maintenance" className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Dernière maintenance:</span>
            <span>{formData.derniereMaintenance || "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Prochaine maintenance:</span>
            <span>{formData.prochaineMaintenance || "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Batterie:</span>
            <span>{formData.batterie || 0}%</span>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="data" className="space-y-4">
        <div className="text-sm">
          <div>Dernière mesure: {formData.derniereMesure || "N/A\
