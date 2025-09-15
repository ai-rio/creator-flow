/* eslint-disable */
'use client';

import { ArrowRight, Search } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Featured Dossier Hero Component
const FeaturedDossierHero: React.FC<any> = ({ post }: any) => {
  if (!post) return null;

  return (
    <div className='group relative mb-command h-[60vh] max-h-[600px] min-h-[450px] w-full overflow-hidden rounded-executive'>
      <div
        className='absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105'
        style={{ backgroundImage: `url(${post.imageUrl})` }}
      ></div>
      <div className='absolute inset-0 bg-gradient-to-t from-background/70 via-background/40 to-transparent'></div>
      <div className='relative flex h-full flex-col justify-end p-strategic md:p-command'>
        <div className='w-full rounded-executive border border-border/20 bg-card/50 p-tactical backdrop-blur-xl transition-colors duration-300 md:w-2/3 md:p-strategic lg:w-1/2'>
          <p className='text-body-sm font-bold uppercase tracking-wider text-brand-teal-primary'>Featured Dossier</p>
          <h2 className='md:text-heading-2xl mt-2 text-heading-xl font-black leading-tight text-foreground'>
            {post.title}
          </h2>
          <div className='mt-tactical flex items-center text-body-sm text-muted-foreground'>
            <span>By {post.author.name}</span>
            <span className='mx-2'>&bull;</span>
            <span>{post.date}</span>
          </div>
          <Button asChild className='mt-tactical bg-brand-teal-primary text-background hover:bg-brand-teal-primary/90'>
            <a href={post.href}>
              Read the Briefing
              <ArrowRight className='ml-2 h-icon-sm w-icon-sm' />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Post Card Component
const PostCard: React.FC<any> = ({ imageUrl, category, title, excerpt, author, date, href }: any) => {
  return (
    <a
      href={href}
      className='group block transform overflow-hidden rounded-executive transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-teal-primary focus:ring-offset-4 focus:ring-offset-background'
      aria-label={`Read article: ${title}`}
    >
      <div className='relative flex h-full flex-col rounded-executive border border-border/20 bg-card/40 backdrop-blur-xl group-hover:border-brand-teal-primary/80'>
        <div className='relative h-48 w-full'>
          <img src={imageUrl} alt={`Featured image for ${title}`} className='h-full w-full object-cover' />
        </div>
        <div className='flex flex-grow flex-col p-tactical'>
          <p className='text-body-xs font-bold uppercase tracking-wider text-brand-teal-primary'>{category}</p>
          <h3 className='mt-2 flex-grow text-heading-md font-black text-foreground'>{title}</h3>
          <p className='mt-2 text-body-md text-muted-foreground'>{excerpt}</p>
          <div className='mt-tactical flex items-center border-t border-border pt-tactical'>
            <img
              src={author.avatarUrl}
              alt={`Avatar for ${author.name}`}
              width={40}
              height={40}
              className='rounded-full'
            />
            <div className='ml-tactical'>
              <p className='font-semibold text-foreground'>{author.name}</p>
              <p className='text-body-sm text-muted-foreground'>{date}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

// Content Toolbar Component
const ContentToolbar: React.FC<any> = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}: any) => {
  const allCategories = ['All', ...categories];

  return (
    <div className='mb-command rounded-executive border border-border/20 bg-card/40 p-tactical backdrop-blur-xl'>
      <div className='flex flex-col items-center gap-tactical sm:flex-row'>
        <div className='flex flex-wrap items-center justify-center gap-2 sm:justify-start'>
          {allCategories.map((cat) => (
            <Button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size='sm'
              className={
                activeCategory === cat
                  ? 'border-brand-teal-primary bg-brand-teal-primary text-background'
                  : 'border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground'
              }
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className='relative w-full sm:ml-auto sm:w-auto'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-tactical'>
            <Search className='h-icon-sm w-icon-sm text-muted-foreground' />
          </div>
          <Input
            type='text'
            placeholder='Search dispatches...'
            value={searchTerm}
            onChange={onSearchChange}
            className='w-full border-border bg-background/80 pl-10 text-foreground placeholder:text-muted-foreground focus:ring-brand-teal-primary sm:w-64'
          />
        </div>
      </div>
    </div>
  );
};

// Main Complete Content Hub Component
const CompleteContentHub = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

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
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1587825140708-df876c12b44e?q=80&w=1471&auto=format&fit=crop',
      category: 'Market Intelligence',
      title: 'The Trinity of Doctrine: A Framework for Content',
      excerpt:
        'How to establish thought leadership through a rigorous, principle-driven content strategy that builds trust.',
      author: { name: 'The Architect', avatarUrl: 'https://placehold.co/40x40/0A090F/FFFFFF?text=A&font=inter' },
      date: 'Aug 28, 2025',
      href: '#',
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1470&auto=format&fit=crop',
      category: 'Growth',
      title: 'Advanced Analytics for Viral Content Loops',
      excerpt: 'Moving beyond vanity metrics to build sustainable, data-driven growth engines for your content.',
      author: { name: 'The Strategist', avatarUrl: 'https://placehold.co/40x40/0A090F/FFFFFF?text=S&font=inter' },
      date: 'Aug 21, 2025',
      href: '#',
    },
  ];

  const categories = [...new Set(mockPosts.map((p) => p.category))];
  const featuredPost = mockPosts[0];

  const filteredPosts = mockPosts
    .filter((post) => activeCategory === 'All' || post.category === activeCategory)
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className='min-h-screen bg-background p-tactical font-sans sm:p-strategic md:p-command'>
      <div className='w-full'>
        <FeaturedDossierHero post={featuredPost} />

        <ContentToolbar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchTerm={searchTerm}
          onSearchChange={(e: any) => setSearchTerm(e.target.value)}
        />

        <div className='mb-strategic text-left'>
          <h1 className='md:text-heading-2xl text-heading-xl font-black text-foreground'>
            Recent <span className='text-brand-teal-primary'>Dispatches</span>
          </h1>
        </div>

        <div className='grid grid-cols-1 gap-strategic md:grid-cols-2 lg:grid-cols-3'>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className='col-span-full py-command text-center text-muted-foreground'>
            <h3 className='text-heading-lg font-bold text-foreground'>No Dispatches Found</h3>
            <p className='mt-2'>Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteContentHub;
