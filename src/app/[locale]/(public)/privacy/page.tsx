import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - CreatorFlow',
  description: 'Learn how CreatorFlow protects your privacy and data when using our TikTok Shop automation platform.',
  robots: 'index, follow',
};

/**
 * Privacy Policy Page
 * Simple content layout with consistent styling
 */
export default function PrivacyPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b border-border bg-background/80 backdrop-blur-sm'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-bold text-foreground'>CreatorFlow</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className='container mx-auto px-4 py-16'>
        <div className='mx-auto max-w-4xl'>
          <h1 className='mb-8 text-4xl font-bold text-foreground'>Privacy Policy</h1>

          <div className='prose prose-lg max-w-none text-foreground'>
            <p className='text-muted-foreground'>Last updated: January 1, 2024</p>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Introduction</h2>
              <p>
                CreatorFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                you use our TikTok Shop automation platform.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Information We Collect</h2>
              <h3 className='mb-2 text-xl font-medium'>Personal Information</h3>
              <ul className='mb-4 ml-6 list-disc'>
                <li>Name, email address, and contact information</li>
                <li>TikTok Shop account information and credentials</li>
                <li>Payment and billing information</li>
                <li>Business information and order data</li>
              </ul>

              <h3 className='mb-2 text-xl font-medium'>Usage Information</h3>
              <ul className='ml-6 list-disc'>
                <li>Platform usage patterns and preferences</li>
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Performance metrics and analytics</li>
              </ul>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>How We Use Your Information</h2>
              <ul className='ml-6 list-disc'>
                <li>Provide and maintain our automation services</li>
                <li>Process orders and manage fulfillment</li>
                <li>Send important updates and notifications</li>
                <li>Improve our platform and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Data Security</h2>
              <p>
                We implement industry-standard security measures including encryption, secure servers, and regular
                security audits to protect your information. However, no method of transmission over the internet is
                100% secure.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. You can also opt out of
                certain communications and request data portability where applicable.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
                <br />
                Email: privacy@creatorflow.com
                <br />
                Address: 123 Creator Street, San Francisco, CA 94105
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
