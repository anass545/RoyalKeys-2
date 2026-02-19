
import React, { useState } from 'react';
import { User, LicenseKey } from '../types';

interface DashboardProps {
  user: User;
  onNavigateHome: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigateHome }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">My Royal Vault</h1>
          <p className="text-gray-400 mt-2">Welcome back, <span className="text-amber-500 font-bold">{user.email}</span></p>
        </div>
        <button 
          onClick={onNavigateHome}
          className="px-6 py-2 border border-gray-700 rounded-lg text-sm text-gray-400 hover:text-white hover:border-amber-500 transition-all flex items-center gap-2"
        >
          <i className="fas fa-shopping-bag"></i> Continue Shopping
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0a0c2e] p-6 rounded-2xl border border-gray-800 shadow-xl">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-4">Account Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total Keys</span>
                <span className="text-white font-bold">{user.keys.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Status</span>
                <span className="text-green-500 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Premium Member
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Orders Verified</span>
                <span className="text-white font-bold">100%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl text-[#04051a] shadow-xl">
            <h3 className="font-black uppercase text-sm mb-2">Need Support?</h3>
            <p className="text-xs font-bold opacity-80 mb-4">Our royal engineers are available 24/7 for activation assistance.</p>
            <button className="w-full py-2 bg-[#04051a] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">Contact Support</button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#0a0c2e] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-white">Your Purchased Licenses</h3>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest bg-gray-900 px-2 py-1 rounded">Secured</span>
            </div>
            
            {user.keys.length === 0 ? (
              <div className="p-20 text-center">
                <i className="fas fa-key text-4xl text-gray-700 mb-4"></i>
                <p className="text-gray-500">Your vault is currently empty.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {user.keys.map((k) => (
                  <div key={k.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/5 transition-colors">
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase">{k.productName}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest flex items-center gap-2">
                        <i className="fas fa-clock"></i> Delivered on {k.date}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="flex-1 md:flex-none bg-[#04051a] border border-gray-700 rounded-lg px-4 py-2 font-mono text-amber-500 text-sm flex items-center justify-between gap-6 relative">
                        <span className="select-all">{k.key}</span>
                        <button 
                          onClick={() => handleCopy(k.key, k.id)}
                          className={`transition-colors ${copiedId === k.id ? 'text-green-500' : 'text-gray-500 hover:text-white'}`}
                        >
                          <i className={`fas ${copiedId === k.id ? 'fa-check' : 'fa-copy'}`}></i>
                        </button>
                        {copiedId === k.id && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] px-2 py-1 rounded animate-in fade-in slide-in-from-bottom-1 uppercase font-bold">
                            Copied!
                          </div>
                        )}
                      </div>
                      <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
                        {k.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
