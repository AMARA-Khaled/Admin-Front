"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, Bell, Search } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface MobileHeaderProps {
  title: string
  onMenuClick?: () => void
}

export function MobileHeader({ title, onMenuClick }: MobileHeaderProps) {
  const { isRTL } = useLanguage()

  return (
    <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
        </Button>
      </div>
    </div>
  )
}
