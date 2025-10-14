import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languageState } from '../../types/types';

import enTranslations from './locales/en.json';
import siTranslations from './locales/si.json';
import taTranslations from './locales/ta.json';

// Set language from sessionStorage (fallback to 'en')
if (typeof window !== 'undefined') {
  const storedLang = sessionStorage.getItem('appLanguage');
  if (storedLang === 'en' || storedLang === 'si' || storedLang === 'ta') {
    languageState.currentLanguage = storedLang;
  } else {
    languageState.currentLanguage = 'en';
  }
}

// Translation resources
const resources = {
  en: { translation: enTranslations },
  si: { translation: siTranslations },
  ta: { translation: taTranslations },
};

// Custom language detector using languageState
const customLanguageDetector = {
  name: 'customDetector',
  lookup: () => languageState.currentLanguage,
  cacheUserLanguage: (lng: string) => {
    languageState.currentLanguage = lng as 'en' | 'si' | 'ta';
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('appLanguage', lng);
    }
  },
  type: 'languageDetector' as const,
  init: () => {},
};

i18n
  .use(LanguageDetector) // Default browser detection
  .use(customLanguageDetector) // Custom detector
  .use(initReactI18next)
  .init({
    resources,
    lng: languageState.currentLanguage,
    fallbackLng: 'en',

    detection: {
      order: ['customDetector', 'navigator', 'htmlTag'],
      caches: [], // Disable localStorage
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    saveMissing: false,
  });

// Override changeLanguage to sync with languageState + sessionStorage
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = (lng?: string) => {
  if (lng && (lng === 'en' || lng === 'si' || lng === 'ta')) {
    languageState.currentLanguage = lng;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('appLanguage', lng);
    }
  }
  return originalChangeLanguage(lng);
};

export default i18n;
