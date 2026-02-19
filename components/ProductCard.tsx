
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(product)}
      className="bg-[#0a0c2e] rounded-xl overflow-hidden flex flex-col group h-full cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(84,255,38,0.1)] border border-gray-800/50 hover:border-amber-500/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter shadow-lg">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter shadow-lg">
              -{product.discount}%
            </span>
          )}
          {product.instantDelivery && (
            <span className="bg-amber-500 text-[#04051a] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter flex items-center gap-1 shadow-lg">
              <i className="fas fa-bolt text-[8px]"></i> Instant
            </span>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1 opacity-70">
          {product.category.split(' ').pop()}
        </div>
        <h3 className="text-sm font-bold line-clamp-2 mb-2 min-h-[40px] group-hover:text-amber-500 transition-colors duration-300">
          {product.title}
        </h3>
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-black text-white tracking-tight">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <button className="w-full py-2.5 bg-amber-500 text-[#04051a] text-xs font-black uppercase tracking-widest rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 group/btn active:scale-95 shadow-lg shadow-amber-500/10">
            <i className="fas fa-bolt text-[10px]"></i>
            Buy Instant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
