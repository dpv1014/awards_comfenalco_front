import i18n from 'i18next';
import { initReactI18next  } from 'react-i18next';
import resources from './translate.json';

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    debug: true,
    interpolation: {
        escapeValue: false
    }
  });

export default i18n;