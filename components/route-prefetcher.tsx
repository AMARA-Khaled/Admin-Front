"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface RoutePrefetcherProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function RoutePrefetcher({ href, children, className, onClick }: RoutePrefetcherProps) {
  const router = useRouter()

  const handleMouseEnter = () => {
    router.prefetch(href)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {children}
    </div>
  )
} 