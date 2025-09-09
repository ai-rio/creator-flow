'use client'

import MSeries from '@/components/mocks/MSeries'

export default function MSeriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Individual inspection mode */}
        <MSeries mode="individual" />
      </div>
    </div>
  )
}