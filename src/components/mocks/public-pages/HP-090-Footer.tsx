import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { Bolt,Instagram, Linkedin, Moon, Sun, Twitter } from 'lucide-react';
import * as React from 'react';
import { useEffect,useState } from 'react';


// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// --- Main Showcase Component ---
export default function FooterShowcase(): React.JSX.Element {
    const [theme, setTheme] = useState<string>('dark');
    useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);

    return (
        <div className="font-sans bg-slate-100 dark:bg-[#0A090F] transition-colors duration-300">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display.swap'); body { font-family: 'Inter', sans-serif; }`}</style>
            <div className="h-screen" />
            <HP090Footer />
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
        </div>
    );
}

// --- HP-090-Footer Component ---
const HP090Footer = () => {
    const linkSections = [
        { title: "Product", links: ["Features", "Pricing", "Testimonials"] },
        { title: "Company", links: ["About Us", "Careers", "Contact"] },
        { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
    ];
    const socialLinks = [ { Icon: Twitter }, { Icon: Instagram }, { Icon: Linkedin } ];

    return (
        <footer className="relative w-full bg-slate-200/50 dark:bg-black/20 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
                {/* Event Horizon Separator */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-16" />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                    <div className="md:col-span-2">
                        <a href="#" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                            <Bolt className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            CreatorFlow
                        </a>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs">
                            The automated command center for ambitious TikTok Shop creators.
                        </p>
                    </div>

                    {linkSections.map(section => (
                        <div key={section.title}>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">{section.title}</h3>
                            <ul className="mt-4 space-y-3">
                                {section.links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-slate-900/10 dark:border-slate-100/10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        © {new Date().getFullYear()} CreatorFlow. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        {socialLinks.map((social, i) => (
                             <a key={i} href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                <social.Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- Helper: Theme Toggle Button ---
const ThemeToggleButton = ({ theme, setTheme  }: any) => (
    <motion.button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="fixed top-4 right-4 z-50 h-12 w-12 flex items-center justify-center rounded-full backdrop-blur-xl bg-slate-200/50 dark:bg-white/5 border border-slate-900/10 dark:border-slate-100/10 text-slate-800 dark:text-slate-200" aria-label="Toggle theme" whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9, rotate: -15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
        <AnimatePresence mode="wait" initial={false}>
            <motion.div key={theme} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);
