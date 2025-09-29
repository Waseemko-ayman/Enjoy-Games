import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'ar',
  // Disable automatic locale detection based on the user's preferences
  // Simply means: **Disable automatic language selection based on browser or cookies**.
  localeDetection: false,
});
