"use client"

import { useEffect, useState } from "react"

interface PerformanceOptimizerProps {
  children: React.ReactNode
}

export function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Preload critical resources
  useEffect(() => {
    // Preload critical CSS
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    // Preload critical fonts
    const fontLink = document.createElement('link')
    fontLink.rel = 'preload'
    fontLink.as = 'font'
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    fontLink.crossOrigin = 'anonymous'
    document.head.appendChild(fontLink)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(fontLink)
    }
  }, [])

  if (!isClient) {
    return null
  }

  return <>{children}</>
}

// Hook for measuring performance
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    navigationStart: 0,
    loadEventEnd: 0,
    domContentLoaded: 0,
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        setMetrics({
          navigationStart: navigation.navigationStart,
          loadEventEnd: navigation.loadEventEnd,
          domContentLoaded: navigation.domContentLoadedEventEnd,
        })
      }
    }
  }, [])

  return metrics
} 