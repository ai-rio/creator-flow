/* eslint-disable */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun, UploadCloud, User } from 'lucide-react';

// Mock initial user data for standalone demonstration
const initialUserData = {
  fullName: 'Elara Vance',
  displayName: 'ElaraV',
  bio: 'CEO @ CreatorFlow | Empowering the next generation of digital entrepreneurs.',
  avatarUrl: 'https://placehold.co/256x256/7e22ce/ffffff?text=EV',
};

const GlassPane: React.FC<any> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-slate-900/10 bg-white/30 shadow-lg backdrop-blur-xl dark:border-slate-100/10 dark:bg-slate-800/20 ${className}`}
  >
    {children}
  </div>
);

const ThemeToggle: React.FC<any> = ({ theme, setTheme }) => (
  <motion.button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className='absolute right-8 top-8 z-10 rounded-full bg-white/40 p-2 text-slate-500 dark:bg-slate-800/40 dark:text-slate-400'
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
  >
    <AnimatePresence mode='wait' initial={false}>
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
  const [userData, setuserData] = useState<any>(initialUserData);
  const [newAvatar, setnewAvatar] = useState<any>(null);
  const [previewUrl, setpreviewUrl] = useState<any>(initialUserData.avatarUrl);
  const [isDirty, setisDirty] = useState<any>(false);
  const [theme, settheme] = useState<any>('dark');

  useEffect(() => {
    const hasChanged =
      userData.fullName !== initialUserData.fullName ||
      userData.displayName !== initialUserData.displayName ||
      userData.bio !== initialUserData.bio ||
      newAvatar !== null;
    setIsDirty(hasChanged);
  }, [userData, newAvatar]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Saving data:', { ...userData, newAvatar });
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
      <div className='relative flex min-h-screen items-center justify-center bg-slate-100 p-4 transition-colors duration-500 dark:bg-[#0A090F]'>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          className='w-full max-w-4xl'
        >
          <GlassPane className='p-8'>
            <form onSubmit={handleSubmit}>
              <div className='mb-6'>
                <h1 className='flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-slate-100'>
                  <User className='text-teal-600 dark:text-teal-400' size={32} />
                  Profile Settings
                </h1>
                <p className='mt-1 text-slate-600 dark:text-slate-400'>Manage your public-facing identity.</p>
              </div>

              <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                <div className='flex flex-col items-center md:col-span-1'>
                  <motion.div
                    className='group relative'
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img
                      src={previewUrl}
                      alt='User Avatar'
                      className='h-40 w-40 rounded-full border-4 border-slate-300 object-cover transition-colors duration-300 group-hover:border-teal-600 dark:border-slate-700 dark:group-hover:border-teal-400'
                    />
                    <label
                      htmlFor='avatar-upload'
                      className='absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                    >
                      <div className='text-center text-slate-100'>
                        <UploadCloud size={32} />
                        <span className='mt-1 text-xs font-semibold'>Change</span>
                      </div>
                    </label>
                    <input
                      type='file'
                      id='avatar-upload'
                      className='hidden'
                      accept='image/*'
                      onChange={handleAvatarChange}
                    />
                  </motion.div>
                  <p className='mt-4 text-center text-xs text-slate-500'>
                    Recommended: 256x256px
                    <br />
                    JPG, PNG, or GIF
                  </p>
                </div>

                <div className='space-y-6 md:col-span-2'>
                  <InputField
                    label='Full Name'
                    id='fullName'
                    name='fullName'
                    value={userData.fullName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label='Display Name'
                    id='displayName'
                    name='displayName'
                    value={userData.displayName}
                    onChange={handleInputChange}
                    helperText='This name will be visible to other users.'
                  />
                  <InputField
                    isTextArea={true}
                    label='Short Bio'
                    id='bio'
                    name='bio'
                    value={userData.bio}
                    onChange={handleInputChange}
                    helperText='A brief description of yourself.'
                  />
                </div>
              </div>

              <div className='mt-8 flex justify-end'>
                <AnimatePresence>
                  {isDirty && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      type='submit'
                      className='rounded-lg bg-teal-600 px-6 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:shadow-[0px_0px_12px_rgba(13,148,136,0.5)] dark:bg-teal-500 dark:text-slate-900 dark:hover:shadow-[0px_0px_12px_rgba(29,255,233,0.5)]'
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

const InputField = ({ label, id, name, value, onChange, helperText, isTextArea = false }) => {
  const commonProps = {
    id,
    name,
    value,
    onChange,
    className:
      'w-full bg-slate-200/50 dark:bg-slate-900/50 border-2 border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-400 focus:border-teal-600 dark:focus:border-teal-400 outline-none transition-all duration-300',
  };

  return (
    <div>
      <label htmlFor={id} className='mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300'>
        {label}
      </label>
      <div className='relative'>
        {isTextArea ? (
          <motion.textarea {...commonProps} rows='3' whileFocus={{ boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.4)' }} />
        ) : (
          <motion.input {...commonProps} type='text' whileFocus={{ boxShadow: '0 0 0 2px rgba(13, 148, 136, 0.4)' }} />
        )}
      </div>
      {helperText && <p className='mt-1 text-xs text-slate-500'>{helperText}</p>}
    </div>
  );
};

export default ProfileSettingsCard;
