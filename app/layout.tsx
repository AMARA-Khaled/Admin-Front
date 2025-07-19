import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { NavigationProgress } from "@/components/navigation-progress"
import { PerformanceOptimizer } from "@/components/performance-optimizer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AquaMonitor - Système de monitoring aquacole",
  description: "Plateforme de surveillance et d'analyse des bassins aquacoles",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <SidebarProvider>
              <PerformanceOptimizer>
                <NavigationProgress />
                <LayoutWrapper>{children}</LayoutWrapper>
              </PerformanceOptimizer>
            </SidebarProvider>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
