'use client'

import { useState, useEffect } from 'react'

/**
 * Hook qui retourne le pourcentage de scroll (0-100)
 * basé sur la position verticale dans la page
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const percentage = scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0
      setProgress(percentage)
    }

    handleScroll() // Valeur initiale
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
