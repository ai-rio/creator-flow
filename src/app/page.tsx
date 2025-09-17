import { redirect } from 'next/navigation';

// Root page redirects to localized homepage
export default function RootPage() {
  redirect('/en');
}
