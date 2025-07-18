import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className} style={{ minHeight: "100vh", minWidth: "100vw" }}>
        {children}
      </body>
    </html>
  )
} 