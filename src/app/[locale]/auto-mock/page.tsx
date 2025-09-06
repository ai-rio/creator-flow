'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function AutoMockPage() {
  const [selectedMock, setSelectedMock] = useState('')
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-bold mb-2">
          🔄 Auto Mock Page (Under Construction)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page is being updated. Please use /direct-mock for component testing.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Page Under Maintenance</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're updating this page to work with the new TypeScript components.
          </p>
          <Button onClick={() => window.location.href = '/en/direct-mock'}>
            Go to Direct Mock Page
          </Button>
        </div>
      </div>
    </div>
  )
}
