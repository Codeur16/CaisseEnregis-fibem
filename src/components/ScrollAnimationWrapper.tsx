'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollAnimationWrapperProps {
  children: ReactNode
  delay?: number
  duration?: number
  type?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'fadeIn'
  threshold?: number
}

export const ScrollAnimationWrapper = ({
  children,
  delay = 0,
  duration = 0.6,
  type = 'fadeInUp',
  threshold = 0.1,
}: ScrollAnimationWrapperProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay },
      },
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay },
      },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, delay },
      },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 40 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, delay },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration, delay },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, delay },
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[type]}
    >
      {children}
    </motion.div>
  )
}
