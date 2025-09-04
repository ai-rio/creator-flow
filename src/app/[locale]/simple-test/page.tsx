export default function SimpleTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Test Page</h1>
      <p>This page should load without Tolgee hooks.</p>
      <p>Environment check:</p>
      <ul className="list-disc ml-6">
        <li>API URL: {process.env.NEXT_PUBLIC_TOLGEE_API_URL || 'Not set'}</li>
        <li>Has API Key: {process.env.NEXT_PUBLIC_TOLGEE_API_KEY ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  );
}