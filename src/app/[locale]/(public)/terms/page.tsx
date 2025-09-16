import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - CreatorFlow',
  description: 'Read the terms and conditions for using CreatorFlow&apos;s TikTok Shop automation platform.',
  robots: 'index, follow',
};

/**
 * Terms of Service Page
 * Simple content layout with consistent styling
 */
export default function TermsPage() {
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
          <h1 className='mb-8 text-4xl font-bold text-foreground'>Terms of Service</h1>

          <div className='prose prose-lg max-w-none text-foreground'>
            <p className='text-muted-foreground'>Last updated: January 1, 2024</p>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Agreement to Terms</h2>
              <p>
                By accessing and using CreatorFlow (&quot;the Service&quot;), you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Service Description</h2>
              <p>
                CreatorFlow provides TikTok Shop automation services including order management, fulfillment automation,
                and business analytics for content creators and e-commerce businesses.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>User Obligations</h2>
              <ul className='ml-6 list-disc'>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Use the service only for lawful business purposes</li>
                <li>Not attempt to interfere with or disrupt the service</li>
              </ul>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Payment Terms</h2>
              <p>
                Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except
                as required by law. We reserve the right to change our pricing with 30 days notice.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Service Availability</h2>
              <p>
                We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We may temporarily
                suspend service for maintenance, updates, or due to circumstances beyond our control.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Intellectual Property</h2>
              <p>
                The service and its original content, features, and functionality are and will remain the exclusive
                property of CreatorFlow and its licensors. The service is protected by copyright, trademark, and other
                laws.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Limitation of Liability</h2>
              <p>
                In no event shall CreatorFlow be liable for any indirect, incidental, special, consequential, or
                punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                Email: legal@creatorflow.com
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
