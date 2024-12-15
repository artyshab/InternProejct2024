import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './languages/en.json';
import deTranslations from './languages/de.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    de: { translation: deTranslations },
  },
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
