import { ButtonEnhanced } from '@/components/ui/button-enhanced-preview';

export default function ButtonPreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">CreatorFlow Button Enhancement</h1>
        <p className="text-center text-slate-600 mb-12">CDH Components + Manifesto Design System</p>
        
        {/* Original CDH Style */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800">Original CDH Style</h2>
          <div className="flex flex-wrap gap-4 p-6 bg-white rounded-lg border">
            <ButtonEnhanced variant="default">Default</ButtonEnhanced>
            <ButtonEnhanced variant="destructive">Destructive</ButtonEnhanced>
            <ButtonEnhanced variant="outline">Outline</ButtonEnhanced>
            <ButtonEnhanced variant="secondary">Secondary</ButtonEnhanced>
            <ButtonEnhanced variant="ghost">Ghost</ButtonEnhanced>
            <ButtonEnhanced variant="link">Link</ButtonEnhanced>
          </div>
        </section>

        {/* CreatorFlow Manifesto Enhancements */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800">CreatorFlow Manifesto Enhancements</h2>
          <div className="flex flex-wrap gap-4 p-6 bg-white rounded-lg border">
            <ButtonEnhanced variant="clarity">Clarity Over Chaos</ButtonEnhanced>
            <ButtonEnhanced variant="data-art">Data is Art</ButtonEnhanced>
            <ButtonEnhanced variant="automation">Automation Power</ButtonEnhanced>
            <ButtonEnhanced variant="executive">Executive Level</ButtonEnhanced>
          </div>
        </section>

        {/* Creator Economy Specials */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800">Creator Economy Specials</h2>
          <div className="flex flex-wrap gap-4 p-6 bg-white rounded-lg border">
            <ButtonEnhanced variant="tiktok" size="lg">Connect TikTok Shop</ButtonEnhanced>
            <ButtonEnhanced variant="viral-alert">🔥 Viral Alert</ButtonEnhanced>
            <ButtonEnhanced variant="creator-success" size="xl">Creator Success</ButtonEnhanced>
          </div>
        </section>

        {/* Size Variations */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-slate-800">Size Variations</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 bg-white rounded-lg border">
            <ButtonEnhanced variant="executive" size="sm">Small</ButtonEnhanced>
            <ButtonEnhanced variant="executive" size="default">Default</ButtonEnhanced>
            <ButtonEnhanced variant="executive" size="lg">Large</ButtonEnhanced>
            <ButtonEnhanced variant="executive" size="xl">Creator XL</ButtonEnhanced>
          </div>
        </section>
      </div>
    </div>
  );
}
