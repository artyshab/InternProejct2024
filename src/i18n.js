import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './languages/en.json';
import deTranslations from './languages/de.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    de: { translation: deTranslations },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for React
  },
});

export default i18n;
