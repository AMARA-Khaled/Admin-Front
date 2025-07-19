import { useState, useCallback } from 'react'

interface UseLoadingStateOptions {
  initialLoading?: boolean
  delay?: number
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const { initialLoading = false, delay = 0 } = options
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [error, setError] = useState<string | null>(null)

  const startLoading = useCallback(() => {
    setError(null)
    if (delay > 0) {
      setTimeout(() => setIsLoading(true), delay)
    } else {
      setIsLoading(true)
    }
  }, [delay])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const setLoadingError = useCallback((errorMessage: string) => {
    setError(errorMessage)
    setIsLoading(false)
  }, [])

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
  }, [])

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setLoadingError,
    reset,
  }
}

// Hook for managing multiple loading states
export function useMultipleLoadingStates(keys: string[]) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    keys.reduce((acc, key) => ({ ...acc, [key]: false }), {})
  )

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }))
  }, [])

  const isAnyLoading = Object.values(loadingStates).some(Boolean)

  return {
    loadingStates,
    setLoading,
    isAnyLoading,
  }
} 