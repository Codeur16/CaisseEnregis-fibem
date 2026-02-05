'use client'

import { useRef, useEffect } from 'react'
import { useMotionTemplate, useMotionValue, useTransform, animate } from 'framer-motion'

export const useScrollAnimation = () => {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element is visible in viewport
          entry.target.classList.add('animate-in')
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return ref
}

// Hook for fade-in animations on scroll
export const useFadeInOnScroll = (delay = 0) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current as HTMLElement | null
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.animation = `fadeIn 0.6s ease-out ${delay}s both`
        }
      },
      {
        threshold: 0.1,
      }
    )

    observer.observe(element)

    return () => observer.unobserve(element)
  }, [delay])

  return ref
}
