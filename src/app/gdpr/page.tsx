import { redirect } from 'next/navigation';

export default function GDPRRedirect() {
  redirect('/en/gdpr');
}
