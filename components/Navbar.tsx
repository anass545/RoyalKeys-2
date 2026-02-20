
import React, { useState } from 'react';
import { CategoryType } from '../types.ts';

interface NavbarProps {
  onCategoryClick: (category: CategoryType) => void;
  onHomeClick: () => void;
  onDashboardClick: () => void;
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCategoryClick, onHomeClick, onDashboardClick, onSearch }) => {
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
          <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(84,255,38,0.5)]">
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#54FF26" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#54FF26" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M50 5 L93.3 30 V80 L50 105 L6.7 80 V30 Z"
                fill="none"
                stroke="url(#logo-gradient)"
                strokeWidth="3"
                className="animate-[spin_8s_linear_infinite]"
              />
              <path
                d="M50 20 L75 35 V65 L50 80 L25 65 V35 Z"
                fill="rgba(84,255,38,0.1)"
                stroke="#54FF26"
                strokeWidth="2"
              />
              <text
                x="50"
                y="62"
                fontFamily="inherit"
                fontWeight="900"
                fontSize="28"
                fill="white"
                textAnchor="middle"
                className="drop-shadow-md"
              >
                RK
              </text>
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg">
              S
            </div>
            <span className="text-xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Softonicus</span>
          </div>
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
