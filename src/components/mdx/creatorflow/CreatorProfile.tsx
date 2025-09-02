/**
 * Creator Profile Component
 * Displays creator information in MDX content
 */

import React from 'react';
import { MapPin, Calendar, Star } from 'lucide-react';

interface CreatorProfileProps {
  name: string;
  handle: string;
  location: string;
  joinDate: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  avatar?: string;
}

export function CreatorProfile({ name, handle, location, joinDate, tier, avatar }: CreatorProfileProps) {
  const tierColors = {
    Bronze: 'from-amber-600 to-amber-800',
    Silver: 'from-gray-400 to-gray-600',
    Gold: 'from-yellow-400 to-yellow-600',
    Platinum: 'from-purple-400 to-purple-600'
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-gray/20 p-6 mb-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-charcoal">{name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${tierColors[tier]}`}>
              <Star className="w-3 h-3 inline mr-1" />
              {tier}
            </span>
          </div>
          <p className="text-forest-green font-medium mb-2">@{handle}</p>
          <div className="flex items-center gap-4 text-sm text-stone-gray">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined {joinDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
