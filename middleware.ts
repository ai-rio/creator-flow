import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  console.log('🔥 MIDDLEWARE - URL:', request.url);
  console.log('🔥 MIDDLEWARE - pathname:', request.nextUrl.pathname);
  console.log('🔥 MIDDLEWARE - routing config:', JSON.stringify(routing, null, 2));

  const response = intlMiddleware(request);

  console.log('🔥 MIDDLEWARE - response status:', response?.status);
  console.log('🔥 MIDDLEWARE - response headers:', Object.fromEntries(response?.headers.entries() || []));

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
