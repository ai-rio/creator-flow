import type { LucideIcon } from 'lucide-react';
import { Binary, Scaling, ShieldCheck, Zap } from 'lucide-react';

export interface Principle {
  id: string;
  Icon: LucideIcon;
  position: {
    angle: number;
    distance: number;
  };
}

export const principles: Principle[] = [
  {
    id: 'scalability',
    Icon: Scaling,
    position: { angle: -45, distance: 160 },
  },
  {
    id: 'reliability',
    Icon: ShieldCheck,
    position: { angle: 45, distance: 160 },
  },
  {
    id: 'clarity',
    Icon: Binary,
    position: { angle: 135, distance: 160 },
  },
  {
    id: 'velocity',
    Icon: Zap,
    position: { angle: 225, distance: 160 },
  },
];
