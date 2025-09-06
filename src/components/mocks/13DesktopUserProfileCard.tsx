'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, UploadCloud, Sun, Moon } from 'lucide-react';


// --- TypeScript Interfaces ---
interface ThemeToggleProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}



// Mock initial user data for standalone demonstration
const initialUserData = {
    fullName: 'Elara Vance',
    displayName: 'ElaraV',
    bio: 'CEO @ CreatorFlow | Empowering the next generation of digital entrepreneurs.',
    avatarUrl: 'https://placehold.co/256x256/7e22ce/ffffff?text=EV',
};

const GlassPane = ({ children, className = ''  }: any) => (
    <div className={`bg-white/30 dark:bg-slate-800/20 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl shadow-lg ${className}`}>
        {children}
    </div>
);

const ThemeToggle = ({ theme, setTheme  }: any) => (
    <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-8 right-8 z-10 p-2 rounded-full text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-800/40"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
    >
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </AnimatePresence>
    </motion.button>
);


const ProfileSettingsCard = () => {
    const [userData, setUserData] = useState<any>(initialUserData);
    const [newAvatar, setNewAvatar] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<any>(initialUserData.avatarUrl);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>('dark');

    useEffect(() => {
        const hasChanged = 
            userData.fullName !== initialUserData.fullName ||
            userData.displayName !== initialUserData.displayName ||
            userData.bio !== initialUserData.bio ||
            newAvatar !== null;
        setIsDirty(hasChanged);
    }, [userData, newAvatar]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target as HTMLInputElement;
        setUserData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: any) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            setNewAvatar(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Saving data:", { ...userData, newAvatar });
        initialUserData.fullName = userData.fullName;
        initialUserData.displayName = userData.displayName;
        initialUserData.bio = userData.bio;
        if (newAvatar) {
            initialUserData.avatarUrl = previewUrl;
        }
        setIsDirty(false);
    };

    return (
        <div className={`${theme} font-sans`}>
            <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#0A090F] p-4 transition-colors duration-500 relative">
                <ThemeToggle theme={theme} setTheme={setTheme} />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring' as any, stiffness: 120 }}
                    className="w-full max-w-4xl"
                >
                    <GlassPane className="p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                                    <User className="text-teal-600 dark:text-teal-400" size={32} />
                                    Profile Settings
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your public-facing identity.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-1 flex flex-col items-center">
                                    <motion.div 
                                        className="relative group"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring' as any, stiffness: 300 }}
                                    >
                                        <img src={previewUrl} alt="User Avatar" className="w-40 h-40 rounded-full object-cover border-4 border-slate-300 dark:border-slate-700 group-hover:border-teal-600 dark:group-hover:border-teal-400 transition-colors duration-300" />
                                        <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                            <div className="text-center text-slate-100">
                                                <UploadCloud size={32} />
                                                <span className="mt-1 text-xs font-semibold">Change</span>
                                            </div>
                                        </label>
                                        <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                                    </motion.div>
                                    <p className="text-xs text-slate-500 mt-4 text-center">Recommended: 256x256px<br/>JPG, PNG, or GIF</p>
                                </div>

                                <div className="md:col-span-2 space-y-6">
                                    <InputField label="Full Name" id="fullName" name="fullName" value={userData.fullName} onChange={handleInputChange} />
                                    <InputField label="Display Name" id="displayName" name="displayName" value={userData.displayName} onChange={handleInputChange} helperText="This name will be visible to other users." />
                                    <InputField isTextArea={true} label="Short Bio" id="bio" name="bio" value={userData.bio} onChange={handleInputChange} helperText="A brief description of yourself." />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <AnimatePresence>
                                    {isDirty && (
                                        <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: 'spring' as any, stiffness: 400, damping: 15 }}
                                            type="submit"
                                            className="bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-900 font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-[0px_0px_12px_rgba(13,148,136,0.5)] dark:hover:shadow-[0px_0px_12px_rgba(29,255,233,0.5)] transition-all duration-300"
                                        >
                                            Save Changes
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </GlassPane>
                </motion.div>
            </div>
        </div>
    );
};


const InputField: React.FC<any> = ({ label, id, name, value, onChange, helperText, isTextArea = false  }: any) => {
    const commonProps = {
        id,
        name,
        value,
        onChange,
        className: "w-full bg-slate-200/50 dark:bg-slate-900/50 border-2 border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 focus:border-teal-600 dark:focus:border-teal-400 outline-none transition-all duration-300",
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
            <div className="relative">
                {isTextArea ? (
                    <motion.textarea {...commonProps} rows={3} whileFocus={{ boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.4)' }} />
                ) : (
                    <motion.input {...commonProps} type="text" whileFocus={{ boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.4)' }} />
                )}
            </div>
            {helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
        </div>
    );
};

export default ProfileSettingsCard;


