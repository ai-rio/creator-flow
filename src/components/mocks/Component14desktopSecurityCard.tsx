import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}


import { AnimatePresence,motion } from 'framer-motion';
import { KeyRound, LogOut, Monitor, Moon,ShieldCheck, Smartphone, Sun } from 'lucide-react';

// Mock active sessions data for demonstration
const mockSessions = [
    { id: 1, type: 'Desktop', browser: 'Chrome', location: 'Rio de Janeiro, Brazil', ip: '189.45.122.155', isCurrent: true },
    { id: 2, type: 'Smartphone', browser: 'Safari', location: 'New York, USA', ip: '207.97.227.239', isCurrent: false },
];

const GlassPane: React.FC<any> = ({ children, className = ''  }) => (
    <div className={`bg-white/30 dark:bg-slate-800/20 backdrop-blur-xl border border-slate-900/10 dark:border-slate-100/10 rounded-2xl shadow-lg ${className}`}>
        {children}
    </div>
);

const ThemeToggle: React.FC<any> = ({ theme, setTheme  }) => (
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

const SecuritySettingsCard = () => {
    const [theme, settheme] = useState<any>('dark');
    const [is2faEnabled, setis2faEnabled] = useState<any>(true);
    const [activeSessions, setactiveSessions] = useState<any>(mockSessions);

    const logoutSession = (id) => {
        setActiveSessions(prev => prev.filter(session => session.id !== id));
    };
    
    return (
        <div className={`${theme} font-sans`}>
            <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-[#0A090F] p-4 transition-colors duration-500 relative">
                <ThemeToggle theme={theme} setTheme={setTheme} />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                    className="w-full max-w-4xl"
                >
                    <GlassPane className="p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                                <ShieldCheck className="text-purple-600 dark:text-purple-400" size={32} />
                                Security & Access
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your account's security and active sessions.</p>
                        </div>

                        {/* Password Section */}
                        <SettingsSection icon={KeyRound} title="Password">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField id="currentPassword" label="Current Password" type="password" />
                                <InputField id="newPassword" label="New Password" type="password" />
                            </div>
                            <div className="flex justify-end mt-4">
                                <ActionButton>Update Password</ActionButton>
                            </div>
                        </SettingsSection>

                        {/* 2FA Section */}
                        <SettingsSection icon={ShieldCheck} title="Two-Factor Authentication">
                             <div className="flex items-center justify-between p-4 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg">
                                <div>
                                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">{is2faEnabled ? "2FA is Enabled" : "Enable 2FA"}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security to your account.</p>
                                </div>
                                <ToggleSwitch enabled={is2faEnabled} setEnabled={setIs2faEnabled} />
                            </div>
                        </SettingsSection>

                        {/* Active Sessions Section */}
                        <SettingsSection icon={Monitor} title="Active Sessions">
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {activeSessions.map(session => (
                                        <motion.div 
                                            key={session.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
                                            className="flex items-center justify-between p-4 bg-slate-200/50 dark:bg-slate-900/50 rounded-lg"
                                        >
                                            <div className="flex items-center gap-4">
                                                {session.type === 'Desktop' ? <Monitor className="text-slate-600 dark:text-slate-400" /> : <Smartphone className="text-slate-600 dark:text-slate-400" />}
                                                <div>
                                                    <p className="font-semibold text-slate-800 dark:text-slate-200">{session.browser} on {session.type} {session.isCurrent && <span className="text-xs text-teal-600 dark:text-teal-400 font-medium"> (Current)</span>}</p>
                                                    <p className="text-sm text-slate-600 dark:text-slate-500">{session.location} - {session.ip}</p>
                                                </div>
                                            </div>
                                            {!session.isCurrent && (
                                                <motion.button 
                                                    onClick={() => logoutSession(session.id)}
                                                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 font-semibold"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <LogOut size={16} />
                                                    Log Out
                                                </motion.button>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </SettingsSection>

                    </GlassPane>
                </motion.div>
            </div>
        </div>
    );
};

const SettingsSection: React.FC<any> = ({ icon: Icon, title, children  }) => (
    <div className="border-t border-slate-300/50 dark:border-slate-700/50 py-6">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-3 mb-4">
            <Icon className="text-slate-500" size={24} />
            {title}
        </h2>
        {children}
    </div>
);

const InputField: React.FC<any> = ({ label, id, type  }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <motion.input
            type={type}
            id={id}
            className="w-full bg-slate-200/50 dark:bg-slate-900/50 border-2 border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 focus:border-purple-600 dark:focus:border-purple-400 outline-none transition-all duration-300"
            whileFocus={{ boxShadow: '0 0 0 2px rgba(168, 85, 247, 0.4)' }}
        />
    </div>
);

const ActionButton: React.FC<any> = ({ children  }) => (
     <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-900 font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-[0px_0px_12px_rgba(29,255,233,0.5)] transition-all duration-300"
    >
        {children}
    </motion.button>
);

const ToggleSwitch: React.FC<any> = ({ enabled, setEnabled  }) => (
    <div 
        onClick={() => setEnabled(!enabled)}
        className={`flex items-center w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${enabled ? 'bg-teal-500' : 'bg-slate-400 dark:bg-slate-600'}`}
    >
        <motion.div 
            layout 
            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
            className="w-6 h-6 bg-white rounded-full shadow-md"
            style={{ marginLeft: enabled ? '1.8rem' : '0.2rem' }}
        />
    </div>
);


export default SecuritySettingsCard;
