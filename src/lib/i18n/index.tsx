'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import gu from './locales/gu.json';
import te from './locales/te.json';

const translations: { [key: string]: any } = {
  en,
  hi,
  mr,
  gu,
  te,
};

type I18nContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && translations[storedLang]) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const t = (key: string, replacements?: { [key: string]: string | number }): string => {
    const keys = key.split('.');
    let text = translations[language] || translations['en'];
    try {
      for (const k of keys) {
        text = text[k];
      }
      if (typeof text !== 'string') {
        // Fallback to English if translation is missing
        let fallbackText = translations['en'];
        for (const k of keys) {
            fallbackText = fallbackText[k];
        }
        if (typeof fallbackText === 'string') {
            text = fallbackText;
        } else {
            return key;
        }
      }
    } catch (error) {
       // Fallback to English if key path doesn't exist
        try {
            let fallbackText = translations['en'];
            for (const k of keys) {
                fallbackText = fallbackText[k];
            }
            if (typeof fallbackText === 'string') {
                text = fallbackText;
            } else {
                return key;
            }
        } catch (fallbackError) {
            return key;
        }
    }

    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            const regex = new RegExp(`{{${rKey}}}`, 'g');
            text = text.replace(regex, String(replacements[rKey]));
        });
    }

    return text;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
