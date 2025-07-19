"use client"
import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AddAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddAgentDialog({ open, onOpenChange, onSuccess }: AddAgentDialogProps) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    organization: "",
    language: "fr",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel agent</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input name="username" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="first_name" placeholder="Prénom" value={form.first_name} onChange={handleChange} required />
          <Input name="last_name" placeholder="Nom" value={form.last_name} onChange={handleChange} required />
          <Input name="phone_number" placeholder="Téléphone" value={form.phone_number} onChange={handleChange} required />
          <Input name="organization" placeholder="Organisation" value={form.organization} onChange={handleChange} required />
          <Input name="language" placeholder="Langue" value={form.language} onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
          {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-1">Agent ajouté avec succès !</div>}
          <DialogFooter>
            <Button type="submit" disabled={loading}>{loading ? "Ajout..." : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 