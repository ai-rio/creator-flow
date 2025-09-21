'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';

// Mock Data
const mockPosts = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
    category: 'Operations',
    title: 'The Definitive Guide to Scaling Your TikTok Shop',
    excerpt:
      'Deconstructing the operational bottlenecks that prevent growth and architecting a command center for scale.',
    author: { name: 'The Architect', avatarUrl: 'https://placehold.co/40x40/0A090F/FFFFFF?text=A&font=inter' },
    date: 'Sep 09, 2025',
    href: '#',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop',
    category: 'Growth',
    title: 'Identifying Undersaturated Niches in the Creator Economy',
    excerpt:
      'A first-principles approach to discovering and dominating new market segments before they become mainstream.',
    author: { name: 'The Strategist', avatarUrl: 'https://placehold.co/40x40/0A090F/FFFFFF?text=S&font=inter' },
    date: 'Sep 02, 2025',
    href: '#',
  },
];

function BP010CompleteContentHubComponent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('components.atomic.organisms.BP010CompleteContentHub');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (!mounted) {
    return null;
  }

  const categories = [...new Set(mockPosts.map((p) => p.category))];
  const featuredPost = mockPosts[0];

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted/10 font-sans antialiased'>
      <div className='mx-auto w-full max-w-7xl px-4 py-24 sm:px-8 md:px-12'>
        {/* Featured Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='group relative mb-12 h-[60vh] max-h-[600px] min-h-[450px] w-full overflow-hidden rounded-2xl'
        >
          <motion.div
            className='absolute inset-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${featuredPost.imageUrl})` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent' />
          <div className='relative flex h-full flex-col justify-end p-8 md:p-12'>
            <Card className='w-full border border-border bg-card/80 p-6 backdrop-blur-lg md:w-2/3 md:p-8 lg:w-1/2'>
              <p className='text-sm font-bold uppercase tracking-wider text-primary'>{t('featured.label')}</p>
              <h2 className='mt-2 text-3xl font-black leading-tight text-foreground md:text-4xl'>
                {featuredPost.title}
              </h2>
              <div className='mt-4 flex items-center text-sm text-muted-foreground'>
                <span>
                  {t('featured.by')} {featuredPost.author.name}
                </span>
                <span className='mx-2'>&bull;</span>
                <span>{featuredPost.date}</span>
              </div>
              <motion.a
                href={featuredPost.href}
                className='mt-6 inline-flex items-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('featured.cta')}
                <ArrowRight size={20} className='ml-2' />
              </motion.a>
            </Card>
          </div>
        </motion.div>

        {/* Content Toolbar */}
        <Card className='mb-12 border border-border bg-card/60 p-4 backdrop-blur-lg'>
          <div className='flex flex-col items-center gap-4 sm:flex-row'>
            <div className='flex flex-wrap items-center justify-center gap-2 sm:justify-start'>
              {['All', ...categories].map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                    activeCategory === cat
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
            <div className='relative w-full sm:ml-auto sm:w-auto'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <Search size={18} className='text-muted-foreground' />
              </div>
              <input
                type='text'
                placeholder={t('toolbar.searchPlaceholder')}
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full rounded-md border border-border bg-background/80 py-2 pl-10 pr-4 text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background sm:w-64'
              />
            </div>
          </div>
        </Card>

        {/* Posts Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='mb-8 text-left'
        >
          <h1 className='text-5xl font-black text-foreground md:text-7xl'>
            {t('posts.title')} <span className='text-primary'>{t('posts.subtitle')}</span>
          </h1>
        </motion.div>

        {/* Posts Grid */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {mockPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.href}
              className='group block'
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className='h-full overflow-hidden border border-border bg-card/60 backdrop-blur-lg transition-shadow duration-300 hover:shadow-lg'>
                <div className='relative h-48 w-full'>
                  <Image src={post.imageUrl} alt={`Featured image for ${post.title}`} fill className='object-cover' />
                </div>
                <div className='flex flex-grow flex-col p-6'>
                  <p className='text-xs uppercase tracking-wider text-primary'>{post.category}</p>
                  <h3 className='mt-2 flex-grow text-xl font-black text-foreground'>{post.title}</h3>
                  <p className='mt-2 text-base text-muted-foreground'>{post.excerpt}</p>
                  <div className='mt-6 flex items-center border-t border-border pt-4'>
                    <Image
                      src={post.author.avatarUrl}
                      alt={`Avatar for ${post.author.name}`}
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                    <div className='ml-4'>
                      <p className='font-semibold text-foreground'>{post.author.name}</p>
                      <p className='text-sm text-muted-foreground'>{post.date}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

export const BP010CompleteContentHub = React.memo(BP010CompleteContentHubComponent);
