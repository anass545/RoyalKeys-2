
import React, { useState } from 'react';
import { CategoryType, User } from '../types.ts';

interface NavbarProps {
  onCategoryClick: (category: CategoryType) => void;
  onHomeClick: () => void;
  onDashboardClick: () => void;
  onSearch: (term: string) => void;
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ onCategoryClick, onHomeClick, onDashboardClick, onSearch, user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#04051a]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={onHomeClick}>
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-[#04051a] group-hover:rotate-12 transition-transform shadow-lg shadow-amber-500/20">RK</div>
          <span className="text-xl font-bold uppercase tracking-tighter">RoyalKeys</span>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl relative mx-4">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keys, games, software..." 
            className="w-full bg-[#0a0c2e] border border-gray-700 rounded-lg py-2.5 px-4 pr-10 focus:outline-none focus:border-amber-500 transition-colors text-sm"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={onDashboardClick}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-amber-500 transition-all">
              <i className="fas fa-user text-xs"></i>
            </div>
            <div className="hidden lg:flex flex-col items-start leading-none text-left">
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-0.5">My Account</span>
              <span className="text-xs text-white font-bold group-hover:text-amber-500 transition-colors">
                {user.isLoggedIn ? user.email.split('@')[0] : 'Sign In'}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 text-amber-500 cursor-pointer hover:scale-105 transition-transform">
            <div className="relative">
              <i className="fas fa-shopping-cart text-lg"></i>
              <span className="absolute -top-2 -right-2 bg-white text-[#04051a] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <span className="font-black text-sm hidden sm:inline">$0.00</span>
          </div>
        </div>
      </div>

      <nav className="bg-[#0a0c2e]/50 py-2 border-t border-gray-900">
        <div className="container mx-auto px-4 flex gap-6 text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 overflow-x-auto scrollbar-hide">
          {Object.values(CategoryType).map((cat) => (
            <button 
              key={cat}
              onClick={() => onCategoryClick(cat)} 
              className="hover:text-amber-500 transition-colors whitespace-nowrap px-1 py-1"
            >
              {cat.replace('Best-Selling ', '').replace('Latest ', '').replace('Security & ', '')}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
