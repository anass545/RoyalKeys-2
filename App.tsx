
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import ProductSection from './components/ProductSection.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import Footer from './components/Footer.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import Checkout from './components/Checkout.tsx';
import Dashboard from './components/Dashboard.tsx';
import StaticPage from './components/StaticPage.tsx';
import ProductCard from './components/ProductCard.tsx';
import { PRODUCTS } from './constants.ts';
import { CategoryType, Product, AppView, InfoPageType, User, LicenseKey } from './types.ts';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [activeInfoPage, setActiveInfoPage] = useState<InfoPageType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const [user, setUser] = useState<User>(() => {
    const defaultUser: User = {
      email: 'customer@royalkeys.io',
      isLoggedIn: true,
      keys: []
    };
    try {
      const saved = localStorage.getItem('royalkeys_session');
      return saved ? JSON.parse(saved) : defaultUser;
    } catch (e) {
      return defaultUser;
    }
  });

  useEffect(() => {
    localStorage.setItem('royalkeys_session', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string) => {
    setToast({ message, type: 'success' });
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower));
    } else if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    return result;
  }, [searchTerm, selectedCategory]);

  const handleCategoryNav = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setSearchTerm('');
    setView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  const handleHomeClick = () => {
    setView('home');
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckoutSuccess = () => {
    const newKey: LicenseKey = {
      id: `RK-${Date.now()}`,
      productId: selectedProduct?.id || 'gen',
      productName: selectedProduct?.title || 'Royal License',
      key: `${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}-XXXX`,
      date: new Date().toLocaleDateString(),
      status: 'active'
    };

    setUser(prev => ({ ...prev, keys: [newKey, ...prev.keys] }));
    showToast("License generated! Check your vault.");
    setView('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#04051a]">
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
          <div className="bg-amber-500 text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl">
            👑 {toast.message}
          </div>
        </div>
      )}

      <div className="bg-amber-500 py-1.5 text-center text-[9px] font-black uppercase tracking-[0.4em] text-[#04051a] relative z-50">
        Premium Global Keys • Instant Email Delivery • 24/7 Royal Support
      </div>

      <Navbar
        onCategoryClick={handleCategoryNav}
        onHomeClick={handleHomeClick}
        onDashboardClick={() => setView('dashboard')}
        onSearch={(term) => { setSearchTerm(term); setView('catalog'); }}
      />

      <main className="flex-1">
        {view === 'home' && (
          <>
            <Hero onCategoryClick={handleCategoryNav} />
            {Object.values(CategoryType).map(cat => (
              <ProductSection
                key={cat}
                title={cat}
                products={PRODUCTS.filter(p => p.category === cat)}
                onProductClick={handleProductClick}
              />
            ))}
          </>
        )}

        {view === 'catalog' && (
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-black mb-8 uppercase tracking-tighter">
              {searchTerm ? `Results for "${searchTerm}"` : selectedCategory}
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} onClick={handleProductClick} />
              ))}
            </div>
          </div>
        )}

        {view === 'product' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBuyNow={() => setView('checkout')}
            onNavigateHome={handleHomeClick}
            onProductClick={handleProductClick}
          />
        )}

        {view === 'checkout' && selectedProduct && (
          <Checkout product={selectedProduct} onCancel={() => setView('product')} onSuccess={handleCheckoutSuccess} />
        )}

        {view === 'dashboard' && <Dashboard user={user} onNavigateHome={handleHomeClick} />}

        {view === 'info' && activeInfoPage && (
          <StaticPage type={activeInfoPage} onNavigateHome={handleHomeClick} />
        )}
      </main>

      <Footer onLinkClick={(type) => { setActiveInfoPage(type); setView('info'); }} />
      <AIAssistant />
    </div>
  );
};

export default App;
