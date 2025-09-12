import TestimonialsCarousel from '@/components/mvpblocks/testimonials-carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GlobalThemeToggle, ThemeToggle } from '@/components/ui/theme-toggle';

export default function ThemeDemoPage() {
  return (
    <div className='min-h-screen bg-background py-8'>
      <div className='container mx-auto space-y-12 px-4'>
        {/* Header Section */}
        <div className='space-y-6 text-center'>
          <h1 className='bg-gradient-to-b from-brand-teal-600 to-brand-teal-primary/60 bg-clip-text text-4xl font-bold text-transparent dark:from-brand-teal-400 dark:to-brand-teal-600/70 md:text-6xl'>
            CreatorFlow Theme System
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
            Experience our comprehensive dark and light theme system with smooth transitions, accessibility compliance,
            and design system integration.
          </p>
        </div>

        {/* Theme Controls Section */}
        <Card className='mx-auto max-w-2xl'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              Theme Controls
              <Badge variant='outline'>Interactive</Badge>
            </CardTitle>
            <CardDescription>
              Try our different theme toggle components and see the instant visual feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              {/* Primary dropdown theme toggle */}
              <div className='flex flex-col items-center gap-2'>
                <ThemeToggle />
                <span className='text-sm text-muted-foreground'>Dropdown Toggle</span>
              </div>

              {/* Global theme toggle */}
              <div className='flex flex-col items-center gap-2'>
                <GlobalThemeToggle />
                <span className='text-sm text-muted-foreground'>Cycling Toggle</span>
              </div>
            </div>

            <div className='text-center'>
              <p className='text-sm text-muted-foreground'>
                Theme preferences are automatically saved and restored. System mode respects your OS preference.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feature Showcase */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>🎨 Design System Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                All colors, gradients, and effects adapt seamlessly between themes following our comprehensive design
                system specifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>♿ Accessibility First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                AAA contrast compliance, reduced motion respect, high contrast mode support, and full keyboard
                navigation across all themes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>⚡ Performance Optimized</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Smooth transitions, cached CSS variables, and optimized rendering ensure 60fps theme switching without
                layout shifts.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demo Buttons */}
        <div className='flex flex-wrap justify-center gap-4'>
          <Button variant='default'>Primary Button</Button>
          <Button variant='outline'>Outline Button</Button>
          <Button variant='ghost'>Ghost Button</Button>
          <Button variant='destructive'>Destructive Button</Button>
          <Button variant='secondary'>Secondary Button</Button>
        </div>

        {/* Theme-Aware Testimonials Carousel */}
        <div>
          <TestimonialsCarousel
            title='Theme-Aware Testimonials'
            subtitle='Watch how our testimonials carousel adapts to theme changes with proper contrast, colors, and glassmorphism effects.'
          />
        </div>

        {/* Technical Details */}
        <Card className='mx-auto max-w-4xl'>
          <CardHeader>
            <CardTitle>🔧 Implementation Features</CardTitle>
            <CardDescription>Technical highlights of our theme system implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-3'>
                <h4 className='text-sm font-semibold'>Theme System Features:</h4>
                <ul className='space-y-1 text-sm text-muted-foreground'>
                  <li>• Light, Dark, and System modes</li>
                  <li>• Local storage persistence</li>
                  <li>• Smooth CSS transitions</li>
                  <li>• No layout shift during switches</li>
                  <li>• Server-side rendering support</li>
                </ul>
              </div>

              <div className='space-y-3'>
                <h4 className='text-sm font-semibold'>Design System Integration:</h4>
                <ul className='space-y-1 text-sm text-muted-foreground'>
                  <li>• Brand color adaptation</li>
                  <li>• Glassmorphism effects</li>
                  <li>• Consistent typography scaling</li>
                  <li>• Theme-aware animations</li>
                  <li>• WCAG 2.1 AAA compliance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className='space-y-4 py-8 text-center'>
          <h2 className='text-2xl font-bold'>Try It Yourself</h2>
          <p className='mx-auto max-w-md text-muted-foreground'>
            Toggle between themes using the floating button in the bottom-right corner or the controls above to see the
            instant visual transformation.
          </p>
        </div>
      </div>
    </div>
  );
}
