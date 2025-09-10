'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

export function ThemeProvider({ children, ...props }: Parameters<typeof NextThemesProvider>[0]) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
