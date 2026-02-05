'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'wo', name: 'Wolof', flag: '🇸🇳' },
]

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  const handleSelect = (language: Language) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    // Here you would typically trigger i18n language change
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-fibem-primary transition-colors rounded-md hover:bg-gray-100"
      >
        <span className="text-xl">{selectedLanguage.flag}</span>
        <span className="hidden sm:inline text-sm">{selectedLanguage.code.toUpperCase()}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg py-2 z-50 min-w-[180px] max-h-[300px] overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleSelect(language)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-fibem-light transition-colors ${
                  selectedLanguage.code === language.code
                    ? 'bg-fibem-light text-fibem-primary'
                    : 'text-gray-700'
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
