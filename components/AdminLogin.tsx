import React, { useState } from 'react';
import { supabase } from '../lib/supabase.ts';


interface AdminLoginProps {
    onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            onLogin(); // Parent component handles redirect/state
        }
    };

    return (
        <div className="min-h-screen bg-[#04051a] flex items-center justify-center p-4">
            <div className="bg-[#1a1c35] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/5">
                <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter text-center">
                    Admin Portal
                </h2>

                {error && (
                    <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-sm font-bold border border-red-500/50">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#04051a] text-white p-3 rounded border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                            placeholder="admin@royalkeys.io"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Password</label>
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
            </div>
        </div>
    );
};

export default AdminLogin;
