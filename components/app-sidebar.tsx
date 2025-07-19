"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Waves,
  Cpu,
  AlertTriangle,
  FileText,
  Settings,
  Home,
  Users,
  Globe,
  ChevronDown,
  Moon,
  Sun,
  Menu,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { RoutePrefetcher } from "@/components/route-prefetcher"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const menuItems = [
  {
    titleKey: "nav.dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    titleKey: "nav.bassins",
    url: "/bassins",
    icon: Waves,
  },
  {
    titleKey: "nav.capteurs",
    url: "/capteurs",
    icon: Cpu,
  },
  {
    titleKey: "nav.alertes",
    url: "/alertes",
    icon: AlertTriangle,
  },
  {
    titleKey: "nav.rapports",
    url: "/rapports",
    icon: FileText,
  },
  {
    titleKey: "nav.agents",
    url: "/agents",
    icon: Users,
  },
  {
    titleKey: "nav.ai_assistant",
    url: "/ai-assistant",
    icon: BarChart3,
  },
  {
    titleKey: "nav.parametres",
    url: "/parametres",
    icon: Settings,
  },
]

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", flag: "🇺🇸" },
]

// Composant pour le contenu de la sidebar
function SidebarContent() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { language, setLanguage, t, isRTL } = useLanguage()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-sidebar-border px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-sidebar-foreground">AquaMonitor</span>
            <span className="text-xs text-sidebar-foreground/70">v2.1.0</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4">
        <div className="px-3">
          <div className="mb-2 px-3 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
            Navigation
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url))
              return (
                <RoutePrefetcher key={item.url} href={item.url}>
                  <Link
                    href={item.url}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{t(item.titleKey)}</span>
                  </Link>
                </RoutePrefetcher>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Globe className="mr-2 h-4 w-4" />
              <span className="flex-1 text-left">
                {languages.find((l) => l.code === language)?.flag} {languages.find((l) => l.code === language)?.name}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
            {languages.map((lang) => (
              <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code as any)}>
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="flex-1 text-left">Admin</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ?   <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              {theme === "dark" ? "Mode clair" : "Mode sombre"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// Composant pour le bouton mobile
function MobileSidebarTrigger() {
  const { isRTL } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`fixed top-4 ${isRTL ? "right-4" : "left-4"} z-50 bg-background/80 backdrop-blur-sm border`}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side={isRTL ? "right" : "left"}
          className="w-64 p-0 bg-sidebar border-sidebar-border"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export function AppSidebar() {
  const { isRTL } = useLanguage()

  return (
    <>
      {/* Mobile Sidebar Trigger */}
      <MobileSidebarTrigger />

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex fixed top-0 ${
          isRTL ? "right-0" : "left-0"
        } h-full w-64 bg-sidebar border-r border-sidebar-border flex-col z-40`}
      >
        <SidebarContent />
      </div>
    </>
  )
}
