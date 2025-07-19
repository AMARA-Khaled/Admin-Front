"use client"

import { usePathname } from "next/navigation"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 overflow-auto lg:ml-64">{children}</main>
    </div>
  )
} 