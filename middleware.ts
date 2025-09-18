import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es', 'pt-br'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export default function middleware(request: any) {
  console.log('Middleware - pathname:', request.nextUrl.pathname);
  const response = intlMiddleware(request);
  console.log('Middleware - response status:', response?.status);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};
