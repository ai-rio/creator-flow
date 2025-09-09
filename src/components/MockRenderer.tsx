'use client'

import { useEffect,useState } from 'react'

// Simple JSX renderer that executes the component
export function MockRenderer({ jsxContent, filename }: { jsxContent: string, filename: string }) {
  const [RenderedComponent, setRenderedComponent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!jsxContent) return

    try {
      setError('')
      
      // Only import existing M-series components
      if (filename.includes('m1-executive')) {
        import('@/components/mocks/M1ExecutiveHeader').then((module) => {
          setRenderedComponent(() => module.default)
        })
      } else if (filename.includes('m2-business')) {
        import('@/components/mocks/M2BusinessSimphonyCard').then((module) => {
          setRenderedComponent(() => module.default)
        })
      } else if (filename.includes('m3-strategic')) {
        import('@/components/mocks/M3StrategicCommandCard').then((module) => {
          setRenderedComponent(() => module.default)
        })
      } else if (filename.includes('m4-liberation')) {
        import('@/components/mocks/M4LiberationOrchestraCard').then((module) => {
          setRenderedComponent(() => module.default)
        })
      } else if (filename.includes('m5-intel')) {
        import('@/components/mocks/M5IntelBriefingCard').then((module) => {
          setRenderedComponent(() => module.default)
        })
      } else if (filename.includes('m6-mobile')) {
        import('@/components/mocks/M6MobileNavbar').then((module) => {
          setRenderedComponent(() => module.default)
        })
      } else {
        // Placeholder for non-converted components
        const PlaceholderComponent = () => (
          <div className="p-8 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Component: {filename}
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
              This component is pending TypeScript conversion
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded border-2 border-dashed border-yellow-300 dark:border-yellow-700">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Original JSX content would be rendered here after conversion
              </p>
            </div>
          </div>
        );
        PlaceholderComponent.displayName = `Placeholder_${filename}`;
        setRenderedComponent(() => PlaceholderComponent);
      }
    } catch (err) {
      setError(`Error loading component: ${err}`)
      setRenderedComponent(null)
    }
  }, [jsxContent, filename])

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
        <h3 className="text-red-800 dark:text-red-200 font-semibold mb-2">Render Error</h3>
        <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
      </div>
    )
  }

  if (!RenderedComponent) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading component...</p>
      </div>
    )
  }

  return <RenderedComponent />
}
