"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import qs from "qs"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { Loader2, Moon, Sun } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()
  const { theme, setTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      // @ts-ignore: No type definitions for 'qs'
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        qs.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      const { access_token, user } = response.data
      localStorage.setItem("access_token", access_token)
      localStorage.setItem("user", JSON.stringify(user))
      await router.push("/dashboard")
    } catch (err: any) {
      setError(t("login.error") || "Nom d'utilisateur ou mot de passe incorrect.")
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Card className="w-full max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg relative mx-4">
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        
        <CardHeader className="text-center space-y-2 p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">{t("login.title") || "Se connecter"}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {t("login.subtitle") || "Entrez vos identifiants pour accéder à votre compte."}
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">{t("login.username") || "Nom d'utilisateur"}</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("login.password") || "Mot de passe"}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600"
              />
            </div>
            {error && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("login.loading") || "Connexion..."}
                </>
              ) : (
                t("login.submit") || "Se connecter"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 p-6 pt-0 text-sm text-center text-gray-500 dark:text-gray-400">
          <a href="#" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            {t("login.forgotPassword") || "Mot de passe oublié ?"}
          </a>
          <p>
            {t("login.noAccount") || "Vous n'avez pas de compte ?"}
            <a href="#" className="ml-1 underline hover:text-gray-700 dark:hover:text-gray-300">
              {t("login.signUp") || "S'inscrire"}
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
