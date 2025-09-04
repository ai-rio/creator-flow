'use client';

import { useEffect,useState } from 'react';

export default function TolgeeDirectPage() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    // Test Tolgee initialization directly
    import('@/lib/i18n/tolgee').then(({ tolgee }) => {
      tolgee.run().then(() => {
        setStatus('✅ Tolgee initialized successfully!');
      }).catch((error) => {
        setStatus(`❌ Tolgee error: ${error.message}`);
      });
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tolgee Direct Test</h1>
      <p>Status: {status}</p>
      <p className="text-sm text-gray-600 mt-4">
        If successful, try Alt+Click on text to edit!
      </p>
    </div>
  );
}