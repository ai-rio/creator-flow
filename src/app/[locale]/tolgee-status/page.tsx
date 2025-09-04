export default function TolgeeStatusPage() {
  const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;
  const hasApiKey = !!process.env.NEXT_PUBLIC_TOLGEE_API_KEY;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tolgee Configuration Status</h1>
      <div className="space-y-2">
        <p><strong>API URL:</strong> {apiUrl || 'Not set'}</p>
        <p><strong>API Key:</strong> {hasApiKey ? '✅ Set' : '❌ Not set'}</p>
        <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
      </div>
    </div>
  );
}