'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface ProgressStep {
  number: number
  title: string
  description: string
}

interface ProgressStepsProps {
  steps: ProgressStep[]
  currentStep: number
  onStepClick?: (stepNumber: number) => void
  className?: string
}

export default function ProgressSteps({ 
  steps, 
  currentStep, 
  onStepClick,
  className = '' 
}: ProgressStepsProps) {

  return (
    <div className={`w-full ${className}`}>
      {/* Version desktop */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Ligne de progression */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-fibem-border z-0">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-linear-to-r from-fibem-primary to-fibem-secondary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep
          const isCurrent = step.number === currentStep || (step.number === 4 && currentStep > 4)
          const isClickable = step.number < currentStep && onStepClick

          return (
            <div key={step.number} className="relative z-10">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(step.number)}
                disabled={!isClickable}
                className={`flex flex-col items-center group ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {/* Cercle de l'étape */}
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 mb-3
                  ${isCompleted ? 'bg-linear-to-r from-fibem-primary to-fibem-secondary border-transparent text-white' :
                    isCurrent ? 'border-fibem-primary bg-white text-fibem-primary shadow-lg' :
                    'border-fibem-border bg-white text-fibem-textSecondary'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-lg font-semibold">{step.number}</span>
                  )}
                </div>

                {/* Texte */}
                <div className="text-center max-w-[120px]">
                  <p className={`font-medium mb-1 transition-colors ${
                    isCompleted ? 'text-fibem-primary' :
                    isCurrent ? 'text-fibem-dark font-semibold' :
                    'text-fibem-textSecondary'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-fibem-textSecondary hidden lg:block">
                    {step.description}
                  </p>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Version mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1">
            {/* Ligne de progression */}
            <div className="absolute top-3 left-0 right-0 h-1 bg-fibem-border">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-linear-to-r from-fibem-primary to-fibem-secondary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Points d'étape */}
            <div className="relative flex justify-between">
              {steps.map((step) => {
                const isCompleted = step.number < currentStep
                const isCurrent = step.number === currentStep

                return (
                  <div key={step.number} className="relative">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${isCompleted ? 'bg-linear-to-r from-fibem-primary to-fibem-secondary border-transparent' :
                        isCurrent ? 'border-fibem-primary bg-white' :
                        'border-fibem-border bg-white'
                      }`}
                    >
                      {isCompleted && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Texte de l'étape actuelle */}
        <div className="text-center">
          <p className="font-semibold text-fibem-dark">
            Étape {currentStep} : {steps[currentStep - 1]?.title}
          </p>
          <p className="text-sm text-fibem-textSecondary mt-1">
            {steps[currentStep - 1]?.description}
          </p>
        </div>
      </div>
    </div>
  )
}