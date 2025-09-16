/* eslint-disable */
'use client';

import React from 'react';

// Post Card Component
const PostCard: React.FC<any> = ({ imageUrl, category, title, excerpt, author, date, href }: any) => {
  return (
    <a
      href={href}
      className='group block transform overflow-hidden rounded-executive transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-teal-primary focus:ring-offset-4 focus:ring-offset-background'
      aria-label={`Read article: ${title}`}
    >
      <div className='relative flex h-full flex-col rounded-executive border border-border/10 bg-card/40 backdrop-blur-xl group-hover:border-brand-teal-primary/80'>
        <div className='relative h-48 w-full'>
          <img src={imageUrl} alt={`Featured image for ${title}`} className='h-full w-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-background/60 to-transparent'></div>
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

// Main Component with Demo Posts
const PostCardDemo = () => {
  const mockPosts = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
      category: 'Operations',
      title: 'The Definitive Guide to Scaling Your TikTok Shop from 50 to 500 Orders',
      excerpt:
        'Deconstructing the operational bottlenecks that prevent growth and architecting a command center for scale.',
      author: { name: 'The Architect', avatarUrl: 'https://placehold.co/100x100/0A090F/FFFFFF?text=A&font=inter' },
      date: 'Sep 09, 2025',
      href: '#',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop',
      category: 'Growth',
      title: 'Market Intelligence: Identifying Undersaturated Niches in the Creator Economy',
      excerpt:
        'A first-principles approach to discovering and dominating new market segments before they become mainstream.',
      author: { name: 'The Strategist', avatarUrl: 'https://placehold.co/100x100/0A090F/FFFFFF?text=S&font=inter' },
      date: 'Sep 02, 2025',
      href: '#',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1587825140708-df876c12b44e?q=80&w=1471&auto=format&fit=crop',
      category: 'Market Intelligence',
      title: 'The Trinity of Doctrine: A Framework for "Definitive" Content Creation',
      excerpt:
        'How to establish thought leadership through a rigorous, principle-driven content strategy that builds trust.',
      author: { name: 'The Architect', avatarUrl: 'https://placehold.co/100x100/0A090F/FFFFFF?text=A&font=inter' },
      date: 'Aug 28, 2025',
      href: '#',
    },
  ];

  return (
    <div className='min-h-screen bg-background p-strategic font-sans'>
      <div className='w-full'>
        <div className='mb-command text-left'>
          <h1 className='md:text-heading-2xl text-heading-xl font-black text-foreground'>
            Recent <span className='text-brand-teal-primary'>Dispatches</span>
          </h1>
          <p className='mt-tactical text-body-lg text-muted-foreground'>
            Strategic insights from the CreatorFlow command center.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-strategic md:grid-cols-2 lg:grid-cols-3'>
          {mockPosts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCardDemo;
