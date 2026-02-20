import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { Product, CategoryType } from '../types.ts';
import { PRODUCTS } from '../constants.ts'; // Fallback / Migration source

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase.from('products').select('*');
            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMigration = async () => {
        if (!confirm('Start migration of ' + PRODUCTS.length + ' products? This usually only needs to be done once.')) return;

        setLoading(true);
        for (const p of PRODUCTS) {
            const { error } = await supabase.from('products').upsert({
                id: p.id,
                title: p.title,
                price: p.price,
                category: p.category,
                image: p.image,
                old_price: p.oldPrice,
                discount: p.discount,
                badge: p.badge,
                instant_delivery: p.instantDelivery,
            });
            if (error) console.error('Migration error for', p.title, error);
        }
        await fetchProducts();
        setLoading(false);
        alert('Migration complete!');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) fetchProducts();
    };

    return (
        <div className="min-h-screen bg-[#04051a]">
            <nav className="bg-[#1a1c35] border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-xl font-black text-white uppercase tracking-tighter">
                    <span className="text-amber-500">Royal</span>Keys Admin
                </h1>
                <div className="flex gap-4">
                    <button
                        onClick={handleMigration}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
                    >
                        Sync constants.ts
                    </button>
                    <button
                        onClick={onLogout}
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container mx-auto p-6">
                {loading ? (
                    <div className="text-white text-center py-20">Loading vault data...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Add New Product Card */}
                        <div className="border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center p-8 text-gray-500 hover:border-amber-500 hover:text-amber-500 cursor-pointer transition-all group min-h-[300px]" onClick={() => alert('Feature coming soon: Add Product Modal')}>
                            <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">+</span>
                            <span className="text-xs font-black uppercase tracking-widest">Add New Product</span>
                        </div>

                        {/* Product List */}
                        {products.map(p => (
                            <div key={p.id} className="bg-[#1a1c35] rounded-xl overflow-hidden border border-white/5 group hover:border-amber-500/50 transition-all">
                                <div className="relative h-40 overflow-hidden">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <button onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }} className="bg-red-600 text-white p-1.5 rounded hover:bg-red-500">
                                            <i className="fas fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">{p.category}</span>
                                        <span className="text-white font-black">${p.price}</span>
                                    </div>
                                    <h3 className="text-gray-200 font-bold text-sm leading-tight mb-4 line-clamp-2">{p.title}</h3>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded text-xs font-bold uppercase tracking-wider">Edit</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
