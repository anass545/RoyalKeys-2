
import React, { useState } from 'react';
import { Product } from '../types.ts';
import { PRODUCTS } from '../constants.ts';
import ProductCard from './ProductCard.tsx';

interface ProductDetailProps {
  product: Product;
  onBuyNow: (product: Product) => void;
  onNavigateHome: () => void;
  onProductClick: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBuyNow, onNavigateHome, onProductClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-4 text-xs text-gray-400 flex gap-2">
        <button onClick={onNavigateHome} className="hover:text-amber-500">Home</button>
        <span>/</span>
        <span className="text-gray-200">{product.category}</span>
        <span>/</span>
        <span className="text-amber-500 line-clamp-1">{product.title}</span>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="bg-[#0a0c2e] p-8 rounded-2xl border border-gray-800 sticky top-32">
            <img src={product.image} alt={product.title} className="w-full h-auto rounded-lg shadow-2xl" />
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col gap-6">
          <h1 className="text-3xl font-black leading-tight tracking-tight uppercase">{product.title}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex text-amber-500 text-sm">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <span className="text-xs text-gray-400">5.0 (120 reviews)</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
            This is a restricted product and can only be redeemed in compatible countries. Digital keys are delivered instantly after payment verification. Please ensure system requirements are met before purchase.
          </p>

          <div className="bg-[#0a0c2e] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6 shadow-xl">
            <div className="flex items-center gap-6">
              <div className="flex border border-gray-700 rounded-lg overflow-hidden h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 bg-gray-800 hover:bg-gray-700 border-r border-gray-700 transition-colors"
                >-</button>
                <div className="w-14 flex items-center justify-center font-black text-lg">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 bg-gray-800 hover:bg-gray-700 border-l border-gray-700 transition-colors"
                >+</button>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Total Price</span>
                <div className="text-3xl font-black text-white">
                  ${(product.price * quantity).toFixed(2)} <span className="text-sm font-normal text-gray-500">USD</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                className="flex-1 bg-amber-500 hover:bg-white text-[#04051a] font-black py-4 rounded-xl uppercase tracking-[0.2em] text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-300"
                onClick={() => onBuyNow(product)}
              >
                Buy It Now
              </button>
              <button className="flex-1 py-4 bg-[#121431] border border-[#24274a] text-amber-500 font-bold rounded-xl hover:bg-[#1a1c3e] hover:border-amber-500/50 text-sm transition-all duration-300 flex items-center justify-center gap-2">
                <i className="fas fa-shopping-cart text-xs"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex gap-8 border-b border-gray-800 mb-8">
          {['Description', 'Reviews', 'System Requirement'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-4 text-xs font-black uppercase tracking-[0.15em] transition-all ${
                activeTab === tab.toLowerCase() ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="text-gray-400 text-sm leading-loose max-w-4xl bg-[#0a0c2e]/30 p-10 rounded-2xl border border-gray-800">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p>Embark on a journey of efficiency and power with <strong className="text-white">{product.title}</strong>. This product is designed for high-performance users who demand the best in digital solutions.</p>
              <h4 className="text-white font-black mt-8 uppercase tracking-widest text-xs">Key Features:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  "Global availability for unrestricted use.",
                  "Instant delivery to your email inbox.",
                  "24/7 Premium technical support included.",
                  "Regular updates and security patches."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-amber-500 text-xs"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'reviews' && <p>Customer feedback is outstanding for this product. 98% of buyers recommend it.</p>}
          {activeTab === 'system requirement' && <p>Minimum: 8GB RAM, i5 Processor, 50GB Space. Recommended: 16GB RAM, i7 Processor.</p>}
        </div>
      </div>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-xl font-black mb-8 uppercase tracking-widest">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} onClick={onProductClick} />
          ))}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-[#04051a]/95 backdrop-blur-md border-t border-gray-800 p-4 z-40 hidden md:block animate-in slide-in-from-bottom duration-500">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={product.image} className="w-12 h-12 rounded object-cover border border-gray-700" />
            <div>
              <div className="font-black text-xs uppercase tracking-tight truncate max-w-[300px]">{product.title}</div>
              <div className="text-amber-500 font-black text-lg">${product.price.toFixed(2)} <span className="text-[10px] text-gray-500">USD</span></div>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex border border-gray-700 rounded-lg overflow-hidden">
               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors">-</button>
               <div className="px-6 flex items-center justify-center font-black text-sm">{quantity}</div>
               <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors">+</button>
            </div>
            <button className="bg-[#121431] border border-[#24274a] text-amber-500 font-bold px-10 py-3 rounded-lg text-sm hover:bg-[#1a1c3e] hover:border-amber-500/50 transition-all active:scale-95 flex items-center gap-2" onClick={() => onBuyNow(product)}>
              <i className="fas fa-shopping-cart text-xs"></i>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
