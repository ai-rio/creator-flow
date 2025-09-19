'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Home, Layers, Mail } from 'lucide-react';
import React from 'react';

import { Card } from '@/components/ui/card';

export default function GlobalNotFound() {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className='flex min-h-screen items-center justify-center overflow-hidden p-4 font-sans antialiased'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Card className='relative w-full max-w-3xl bg-card/80 p-8 text-center backdrop-blur-xl md:p-12'>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10'
          >
            <AlertTriangle className='text-primary' size={48} />
          </motion.div>

          <h1 className='text-4xl font-black text-primary md:text-5xl'>Transmission Error: Invalid Route</h1>

          <p className='mx-auto mt-4 max-w-xl text-lg text-muted-foreground'>
            The path you requested is not a recognized vector within our current architecture. The system is stable.
            Your session is secure.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-4 md:grid-cols-3'>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Card
                className='cursor-pointer p-6 text-left transition-colors duration-300 hover:bg-accent/50'
                onClick={() => handleNavigation('/')}
              >
                <Home className='mb-3 h-8 w-8 text-primary' />
                <h3 className='text-lg font-bold text-foreground'>Return to Command Center</h3>
                <p className='text-sm text-muted-foreground'>Go to the Homepage</p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Card
                className='cursor-pointer p-6 text-left transition-colors duration-300 hover:bg-accent/50'
                onClick={() => handleNavigation('/en/features')}
              >
                <Layers className='mb-3 h-8 w-8 text-primary' />
                <h3 className='text-lg font-bold text-foreground'>Review the Armory</h3>
                <p className='text-sm text-muted-foreground'>Explore Features</p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Card
                className='cursor-pointer p-6 text-left transition-colors duration-300 hover:bg-accent/50'
                onClick={() => handleNavigation('/en/contact')}
              >
                <Mail className='mb-3 h-8 w-8 text-primary' />
                <h3 className='text-lg font-bold text-foreground'>Open a Secure Channel</h3>
                <p className='text-sm text-muted-foreground'>Contact Us</p>
              </Card>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
