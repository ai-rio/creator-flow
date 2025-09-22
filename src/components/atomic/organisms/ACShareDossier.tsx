'use client';

import { Check, Copy, ExternalLink, Linkedin, LucideIcon, Mail, MessageCircle, Share, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

// --- TypeScript Interfaces ---

export interface SharePlatform {
  id: string;
  name: string;
  icon: LucideIcon;
  generateUrl: (url: string, title: string, description?: string) => string;
  ariaLabel: string;
  color: string;
}

export interface ShareLink {
  platform: string;
  url: string;
  title: string;
  description?: string;
}

export interface ShareDossierProps {
  /** Title of the article/content being shared */
  articleTitle: string;
  /** Optional description for enhanced sharing */
  description?: string;
  /** Custom URL to share (defaults to current page) */
  shareUrl?: string;
  /** Array of platform IDs to show (defaults to all) */
  enabledPlatforms?: string[];
  /** Custom CSS class for the container */
  className?: string;
  /** Size variant for buttons */
  size?: 'sm' | 'md' | 'lg';
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Show labels next to icons */
  showLabels?: boolean;
  /** Custom share text per platform */
  customShareText?: Record<string, string>;
  /** Analytics callback for tracking share events */
  onShare?: (platform: string, url: string) => void;
  /** Internationalization strings */
  i18n?: {
    title?: string;
    copyLabel?: string;
    copiedLabel?: string;
    copySuccess?: string;
    copyError?: string;
  };
}

// --- Share Platform Configurations ---

const SHARE_PLATFORMS: SharePlatform[] = [
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: Twitter,
    generateUrl: (url: string, title: string, description?: string) => {
      const text = description ? `${title} - ${description}` : title;
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    },
    ariaLabel: 'Share on Twitter/X',
    color: 'hover:text-blue-500',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    generateUrl: (url: string, title: string, description?: string) => {
      const summary = description ? `${title} - ${description}` : title;
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}&summary=${encodeURIComponent(summary)}`;
    },
    ariaLabel: 'Share on LinkedIn',
    color: 'hover:text-blue-600',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    generateUrl: (url: string, title: string, description?: string) => {
      const text = description ? `${title} - ${description}\n${url}` : `${title}\n${url}`;
      return `https://wa.me/?text=${encodeURIComponent(text)}`;
    },
    ariaLabel: 'Share on WhatsApp',
    color: 'hover:text-green-500',
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    generateUrl: (url: string, title: string, description?: string) => {
      const subject = encodeURIComponent(title);
      const body = description
        ? encodeURIComponent(`${description}\n\nRead more: ${url}`)
        : encodeURIComponent(`Check out this article: ${url}`);
      return `mailto:?subject=${subject}&body=${body}`;
    },
    ariaLabel: 'Share via Email',
    color: 'hover:text-red-500',
  },
];

// --- Enhanced Sparkle Animation Styles ---

const SparkleStyles = () => (
  <style jsx>{`
    @keyframes spark {
      0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0.7;
      }
      80% {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(2.5);
        opacity: 0;
      }
    }

    @keyframes sparkle-pulse {
      0%,
      100% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0.8;
      }
    }

    .sparkle-button {
      position: relative;
      overflow: hidden;
      transform-origin: center;
      transition: all 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    .sparkle-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 120%;
      height: 120%;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(255, 255, 255, 0.3) 40%,
        rgba(255, 255, 255, 0) 70%
      );
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
    }

    .sparkle-button:hover::before {
      animation: spark 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    .sparkle-button:focus-visible::before {
      animation: sparkle-pulse 1s ease-in-out infinite;
    }

    .sparkle-icon {
      transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      will-change: transform;
    }

    .sparkle-button:hover .sparkle-icon {
      transform: scale(1.2) rotate(-10deg);
    }

    .sparkle-button:active .sparkle-icon {
      transform: scale(0.95) rotate(-5deg);
    }

    .copy-success {
      animation: copy-bounce 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    @keyframes copy-bounce {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }

    .glass-morphism {
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .glass-morphism-dark {
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  `}</style>
);

// --- Copy to Clipboard Hook ---

const useCopyToClipboard = (timeout = 2000) => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        // Check if clipboard API is available
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers or non-secure contexts
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.left = '-999999px';
          textarea.style.top = '-999999px';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();

          const success = document.execCommand('copy');
          document.body.removeChild(textarea);

          if (!success) {
            throw new Error('Copy command failed');
          }
        }

        setIsCopied(true);
        setError(null);
        setTimeout(() => setIsCopied(false), timeout);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Copy failed');
        setTimeout(() => setError(null), timeout);
      }
    },
    [timeout]
  );

  return { copyToClipboard, isCopied, error };
};

// --- Main Component ---

export function ACShareDossier({
  articleTitle,
  description,
  shareUrl,
  enabledPlatforms,
  className,
  size = 'md',
  orientation = 'horizontal',
  showLabels = false,
  customShareText,
  onShare,
  i18n = {},
}: ShareDossierProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const { theme, resolvedTheme } = useTheme();
  const { copyToClipboard, isCopied, error } = useCopyToClipboard();

  // Set current URL on client side
  useEffect(() => {
    setCurrentUrl(shareUrl || window.location.href);
  }, [shareUrl]);

  // Memoized share links generation
  const shareLinks = useMemo(() => {
    if (!currentUrl) return [];

    const platformsToShow = enabledPlatforms
      ? SHARE_PLATFORMS.filter((platform) => enabledPlatforms.includes(platform.id))
      : SHARE_PLATFORMS;

    return platformsToShow.map((platform) => ({
      ...platform,
      url: platform.generateUrl(currentUrl, customShareText?.[platform.id] || articleTitle, description),
    }));
  }, [currentUrl, articleTitle, description, enabledPlatforms, customShareText]);

  // Handle copy action
  const handleCopy = useCallback(async () => {
    await copyToClipboard(currentUrl);
    onShare?.('copy', currentUrl);
  }, [copyToClipboard, currentUrl, onShare]);

  // Handle platform share
  const handlePlatformShare = useCallback(
    (platform: string, url: string) => {
      onShare?.(platform, url);
    },
    [onShare]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }, []);

  // Theme-based styling
  const isDark = resolvedTheme === 'dark';
  const containerClasses = cn(
    'my-12 rounded-xl border p-4 sm:p-6 transition-all duration-300',
    isDark ? 'glass-morphism-dark border-slate-800/80' : 'glass-morphism border-slate-300/80',
    className
  );

  const titleClasses = cn(
    'text-lg font-semibold transition-colors duration-200',
    isDark ? 'text-slate-100' : 'text-slate-900',
    orientation === 'vertical' ? 'mb-4' : 'mb-4 sm:mb-0'
  );

  const buttonSizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  const iconSizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const containerLayout =
    orientation === 'vertical'
      ? 'flex-col items-center space-y-4'
      : 'flex-col items-center justify-between sm:flex-row';

  const buttonsLayout = orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-2';

  return (
    <>
      <SparkleStyles />
      <div className={containerClasses} role='region' aria-label='Share options'>
        <div className={cn('flex', containerLayout)}>
          <h4 className={titleClasses}>{i18n.title || 'Share This Dossier'}</h4>

          <div className={cn('flex items-center', buttonsLayout)} role='group' aria-label='Share buttons'>
            {/* Platform Share Buttons */}
            {shareLinks.map((platform) => (
              <Button
                key={platform.id}
                asChild
                variant='ghost'
                size='icon'
                className={cn(
                  'sparkle-button rounded-full transition-colors duration-200',
                  buttonSizeClasses[size],
                  isDark
                    ? 'bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'bg-slate-100/50 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
                  platform.color
                )}
                aria-label={platform.ariaLabel}
              >
                <a
                  href={platform.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => handlePlatformShare(platform.id, platform.url)}
                  onKeyDown={(e) => handleKeyDown(e, () => handlePlatformShare(platform.id, platform.url))}
                  className='flex items-center gap-2'
                >
                  <platform.icon size={iconSizeMap[size]} className='sparkle-icon' />
                  {showLabels && <span className='text-sm font-medium'>{platform.name}</span>}
                </a>
              </Button>
            ))}

            {/* Copy Link Button */}
            <Button
              variant='ghost'
              size='icon'
              onClick={handleCopy}
              onKeyDown={(e) => handleKeyDown(e, handleCopy)}
              className={cn(
                'sparkle-button rounded-full transition-colors duration-200',
                buttonSizeClasses[size],
                isDark
                  ? 'bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'bg-slate-100/50 text-slate-600 hover:bg-slate-200 hover:text-slate-900',
                'flex items-center gap-2',
                isCopied && 'copy-success'
              )}
              aria-label={isCopied ? i18n.copiedLabel || 'Link copied' : i18n.copyLabel || 'Copy link'}
              disabled={!currentUrl}
            >
              {isCopied ? (
                <Check size={iconSizeMap[size]} className='text-green-500' />
              ) : (
                <Copy size={iconSizeMap[size]} className='sparkle-icon' />
              )}
              {showLabels && (
                <span className='text-sm font-medium'>
                  {isCopied ? i18n.copiedLabel || 'Copied!' : i18n.copyLabel || 'Copy'}
                </span>
              )}
            </Button>

            {/* General Share Button (for mobile native sharing) */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => {
                  navigator
                    .share({
                      title: articleTitle,
                      text: description,
                      url: currentUrl,
                    })
                    .then(() => {
                      onShare?.('native', currentUrl);
                    })
                    .catch(() => {
                      // Silently handle share cancellation
                    });
                }}
                className={cn(
                  'sparkle-button rounded-full transition-colors duration-200',
                  buttonSizeClasses[size],
                  isDark
                    ? 'bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'bg-slate-100/50 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                )}
                aria-label='Share via system'
              >
                <Share size={iconSizeMap[size]} className='sparkle-icon' />
                {showLabels && <span className='text-sm font-medium'>Share</span>}
              </Button>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className='mt-4 text-center text-sm text-red-500' role='alert'>
            {i18n.copyError || 'Failed to copy link. Please try again.'}
          </div>
        )}
      </div>
    </>
  );
}

export default ACShareDossier;
