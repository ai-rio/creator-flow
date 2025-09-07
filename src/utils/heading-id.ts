import { ReactNode } from 'react';

// Heading ID utility
export function generateHeadingId(children: ReactNode): string {
  const text = typeof children === 'string' ? children : '';
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
