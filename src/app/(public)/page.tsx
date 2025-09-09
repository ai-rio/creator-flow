import { redirect } from 'next/navigation';

// Root public page redirects to homepage
export default function PublicRootPage() {
  redirect('/homepage');
}