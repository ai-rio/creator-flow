import { redirect } from 'next/navigation';

/**
 * Root locale page - redirects to public homepage
 * Maintains clean URL structure: /en -> /en/homepage
 */
export default function LocaleRootPage() {
  // Redirect to the enhanced public homepage with bento grid
  redirect('/homepage');
}
