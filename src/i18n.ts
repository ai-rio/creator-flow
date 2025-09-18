import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  console.log('i18n config - received locale param:', locale);
  
  // Use the locale parameter directly if provided
  let finalLocale = locale;
  
  // Final validation and fallback
  if (!finalLocale || !['en', 'es', 'pt-br'].includes(finalLocale)) {
    finalLocale = 'en';
  }

  console.log('i18n config - final locale:', finalLocale);

  const messages = (await import(`./messages/${finalLocale}.json`)).default;
  console.log('i18n config - loaded messages for:', finalLocale);
  
  return {
    locale: finalLocale,
    messages
  };
});
