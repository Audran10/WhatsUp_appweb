import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import frTranslation from './fr.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,  
    },
  },
  debug: true,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
