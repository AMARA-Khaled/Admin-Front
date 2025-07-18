// @ts-ignore: No type definitions for 'qs'
"use client"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import qs from "qs"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        qs.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      const { access_token, user } = response.data
      localStorage.setItem("access_token", access_token)
      localStorage.setItem("user", JSON.stringify(user))
      await router.push("/dashboard")
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail[0]?.msg || "Nom d'utilisateur ou mot de passe incorrect.")
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect.")
      }
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      minWidth: "100vw",
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 48,
          borderRadius: 28,
          background: "#fff",
          boxShadow: "0 8px 32px rgba(31, 41, 55, 0.12)",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          alignItems: "center"
        }}
      >
        {/* Logo placeholder */}
        <div style={{ marginBottom: 8 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#6366f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            color: "#fff",
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(99,102,241,0.15)"
          }}>
            {/* You can replace this with your logo */}
            <span>🦐</span>
          </div>
        </div>
        <h2 style={{ marginBottom: 0, textAlign: "center", fontWeight: 800, fontSize: 30, color: "#1e293b", letterSpacing: 0.5 }}>Connexion</h2>
        <p style={{ marginBottom: 12, textAlign: "center", color: "#64748b", fontSize: 16, fontWeight: 500 }}>
          Connectez-vous à votre compte administrateur
        </p>
        <div style={{ marginBottom: 10, width: "100%" }}>
          <label style={{ fontWeight: 600, color: "#334155", fontSize: 15, marginBottom: 4, display: "block" }}>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Entrez votre nom d'utilisateur"
            style={{
              width: "100%",
              padding: "12px 14px",
              marginTop: 4,
              border: "1.5px solid #e0e7ef",
              borderRadius: 10,
              fontSize: 17,
              outline: "none",
              marginBottom: 2,
              background: "#f1f5f9",
              transition: "border 0.2s, box-shadow 0.2s"
            }}
            onFocus={e => e.currentTarget.style.border = '#6366f1'}
            onBlur={e => e.currentTarget.style.border = '#e0e7ef'}
          />
        </div>
        <div style={{ marginBottom: 10, width: "100%" }}>
          <label style={{ fontWeight: 600, color: "#334155", fontSize: 15, marginBottom: 4, display: "block" }}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            style={{
              width: "100%",
              padding: "12px 14px",
              marginTop: 4,
              border: "1.5px solid #e0e7ef",
              borderRadius: 10,
              fontSize: 17,
              outline: "none",
              marginBottom: 2,
              background: "#f1f5f9",
              transition: "border 0.2s, box-shadow 0.2s"
            }}
            onFocus={e => e.currentTarget.style.border = '#6366f1'}
            onBlur={e => e.currentTarget.style.border = '#e0e7ef'}
          />
        </div>
        {error && <div style={{ color: "#d32f2f", background: "#fff0f0", border: "1px solid #ffd6d6", borderRadius: 8, padding: "10px 14px", marginBottom: 8, textAlign: "center", width: "100%", fontWeight: 500 }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 0",
            background: loading ? "#a5b4fc" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 18,
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: 8,
            boxShadow: "0 2px 8px rgba(37,99,235,0.10)",
            letterSpacing: 0.5,
            transition: "background 0.2s"
          }}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  )
} 