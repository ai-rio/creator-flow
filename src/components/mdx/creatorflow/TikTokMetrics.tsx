/**
 * TikTok Metrics Display Component
 * Shows creator performance metrics in MDX content
 */

import { Heart, Share,TrendingUp, Users } from 'lucide-react';
import React from 'react';

interface TikTokMetricsProps {
  followers: number;
  avgViews: number;
  engagementRate: number;
  totalLikes: number;
}

export function TikTokMetrics({ followers, avgViews, engagementRate, totalLikes }: TikTokMetricsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        TikTok Performance
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <Users className="w-6 h-6 mx-auto mb-2 opacity-80" />
          <div className="text-2xl font-bold">{formatNumber(followers)}</div>
          <div className="text-sm opacity-80">Followers</div>
        </div>
        <div className="text-center">
          <TrendingUp className="w-6 h-6 mx-auto mb-2 opacity-80" />
          <div className="text-2xl font-bold">{formatNumber(avgViews)}</div>
          <div className="text-sm opacity-80">Avg Views</div>
        </div>
        <div className="text-center">
          <Heart className="w-6 h-6 mx-auto mb-2 opacity-80" />
          <div className="text-2xl font-bold">{formatNumber(totalLikes)}</div>
          <div className="text-sm opacity-80">Total Likes</div>
        </div>
        <div className="text-center">
          <Share className="w-6 h-6 mx-auto mb-2 opacity-80" />
          <div className="text-2xl font-bold">{engagementRate}%</div>
          <div className="text-sm opacity-80">Engagement</div>
        </div>
      </div>
    </div>
  );
}
