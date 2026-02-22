import React, { useState } from 'react';
import { supabase } from '../lib/supabase.ts';


interface AdminLoginProps {
    onLogin: () => void;
}

const ALLOWED_ADMINS = ['v0896980v@gmail.com', 'mtcrs604@gmail.com'];

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resetMode, setResetMode] = useState<'login' | 'forgot' | 'update'>('login');
    const [message, setMessage] = useState<string | null>(null);

    React.useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace('#', '?'));

        // Handle explicit errors from Supabase in the URL
        const errorCode = params.get('error_code');
        const errorDesc = params.get('error_description');

        if (errorCode === 'otp_expired' || errorCode === 'access_denied') {
            setError(errorDesc || 'This recovery link has expired or is invalid. Please request a new one.');
            setResetMode('forgot');
            window.location.hash = ''; // Clean up URL
            return;
        }

        if (hash.includes('type=recovery') || hash.includes('access_token=')) {
            setResetMode('update');
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Whitelist check
        if (!ALLOWED_ADMINS.includes(email)) {
            setError('Access Denied: This email is not authorized to access the Admin Portal.');
            setLoading(false);
            return;
        }

        // Temporary Master Password Fallback (Updated to your email)
        if (email === 'v0896980v@gmail.com' && password === 'admin123456') {
            onLogin();
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            onLogin();
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        // Security Whitelist Check for Reset
        if (!ALLOWED_ADMINS.includes(email)) {
            setError('Access Denied: This email is not authorized for password recovery.');
            setLoading(false);
            return;
        }

        // Use a more robust dynamic redirect that handles both local and live sites
        // This ensures the link always points back to exactly where the user is
        const redirectUrl = window.location.origin + window.location.pathname;

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectUrl,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('A secure recovery link has been sent to your email.');
        }
        setLoading(false);
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setMessage('Password updated successfully! You can now log in.');
            setResetMode('login');
            setPassword('');
            setLoading(false);
            // Clear hash
            window.location.hash = '';
        }
    };

    return (
        <div className="min-h-screen bg-[#04051a] flex items-center justify-center p-4">
            <div className="bg-[#1a1c35] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/5">
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter text-center">
                    Admin Portal
                </h2>
                <p className="text-gray-500 text-[10px] text-center uppercase tracking-widest font-bold mb-8">
                    {resetMode === 'forgot' ? 'Password Recovery' : resetMode === 'update' ? 'Set New Password' : 'Secure Authorization'}
                </p>

                {error && (
                    <div className="bg-red-500/20 text-red-200 p-3 rounded mb-6 text-sm font-bold border border-red-500/50">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-500/20 text-green-200 p-3 rounded mb-6 text-sm font-bold border border-green-500/50">
                        {message}
                    </div>
                )}

                {resetMode === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#04051a] text-white p-3 rounded border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                                placeholder="v0896980v@gmail.com"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-gray-400 text-xs uppercase font-bold tracking-wider">Password</label>
                                <button
                                    type="button"
                                    onClick={() => setResetMode('forgot')}
                                    className="text-amber-500 hover:text-amber-400 text-[10px] font-black uppercase tracking-wider"
                                >
                                    Forgot?
                                </button>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#04051a] text-white p-3 rounded border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-[#04051a] font-black uppercase py-4 rounded tracking-widest transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Accessing...' : 'Enter Vault'}
                        </button>
                    </form>
                ) : resetMode === 'forgot' ? (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#04051a] text-white p-3 rounded border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                                placeholder="your-email@example.com"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-[#04051a] font-black uppercase py-4 rounded tracking-widest transition-all transform active:scale-95"
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setResetMode('login')}
                            className="w-full text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-wider mt-4"
                        >
                            Back to Login
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#04051a] text-white p-3 rounded border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                                placeholder="Min 6 characters"
                                minLength={6}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-[#04051a] font-black uppercase py-4 rounded tracking-widest transition-all transform active:scale-95"
                        >
                            {loading ? 'Updating...' : 'Save New Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
