
import React from 'react';
import { CategoryType } from '../types';

interface HeroProps {
  onCategoryClick: (category: CategoryType) => void;
}

const Hero: React.FC<HeroProps> = ({ onCategoryClick }) => {
  const features = [
    { 
      title: 'Global Gaming', 
      type: CategoryType.GAMES, 
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000', 
      color: 'from-purple-600/40' 
    },
    { 
      title: 'Premium Software', 
      type: CategoryType.SOFTWARE, 
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000', 
      color: 'from-blue-600/40' 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-8 mb-12 opacity-50 grayscale hover:grayscale-0 transition-all">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em]">
          <i className="fas fa-shield-alt text-amber-500"></i> Secure Payments
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em]">
          <i className="fas fa-bolt text-amber-500"></i> Instant Delivery
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em]">
          <i className="fas fa-headset text-amber-500"></i> 24/7 Support
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <div 
            key={i} 
            onClick={() => onCategoryClick(f.type)}
            className="group relative overflow-hidden rounded-2xl aspect-[21/9] cursor-pointer shadow-2xl"
          >
            <img 
              src={f.img} 
              alt={f.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${f.color} via-[#04051a]/80 to-transparent flex flex-col justify-end p-8`}>
              <h3 className="text-4xl font-black mb-3 text-white drop-shadow-2xl italic uppercase tracking-tighter">{f.title}</h3>
              <div className="flex items-center gap-2 text-amber-500 group-hover:gap-4 transition-all duration-300">
                <span className="text-xs font-black uppercase tracking-[0.2em]">View All Items</span>
                <i className="fas fa-arrow-right text-sm"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
