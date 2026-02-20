import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { Product } from '../types.ts';
import { PRODUCTS } from '../constants.ts';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    BarChart3,
    MessageSquare,
    Settings,
    LogOut,
    ExternalLink,
    DollarSign,
    Users,
    Eye,
    Box,
    CheckCircle2,
    Clock,
    Database
} from 'lucide-react';
import Logo from './Logo';

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

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
        if (!confirm('Start migration?')) return;
        setLoading(true);
        for (const p of PRODUCTS) {
            await supabase.from('products').upsert({
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
        }
        await fetchProducts();
        setLoading(false);
        alert('Migration complete!');
    };

    const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
        <div className="bg-[#1a1c35] p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className={`absolute top-4 right-4 p-2 rounded-lg bg-${color}-500/10 text-${color}-400`}>
                <Icon size={20} />
            </div>
            <div>
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h4>
                <div className="text-2xl font-black text-white">{value}</div>
            </div>
            <div className="text-xs text-green-400 font-bold flex items-center gap-1">
                {subtext}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#04051a] flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0a0b1e] border-r border-white/5 flex flex-col fixed h-full z-10">
                <div className="p-8">
                    <Logo className="w-12 h-12" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-2 ml-1">Control Center</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <LayoutDashboard size={18} /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <ShoppingBag size={18} /> Products
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                        <Package size={18} /> Inventory
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                        <BarChart3 size={18} /> Sales
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                        <MessageSquare size={18} /> Messages
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                        <Settings size={18} /> Settings
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                        <ExternalLink size={18} /> View Live Site
                    </a>
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-white">{activeTab === 'overview' ? 'Overview' : 'Products'}</h2>
                        <p className="text-gray-400 text-xs mt-1">Welcome back, Admin</p>
                    </div>
                    {products.length === 0 && (
                        <button
                            onClick={handleMigration}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
                        >
                            <Database size={14} /> Sync Database
                        </button>
                    )}
                </div>

                {activeTab === 'overview' && (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <StatCard title="Revenue" value="$23.03" subtext="+12% from last month" icon={DollarSign} color="blue" />
                            <StatCard title="Orders" value="6" subtext="Avg. $3.84 / order" icon={ShoppingBag} color="purple" />
                            <StatCard title="Visits" value="254" subtext="Total page views" icon={Eye} color="pink" />
                            <StatCard title="Products" value={products.length} subtext={`${products.length} keys available`} icon={Box} color="orange" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Top Products */}
                            <div className="lg:col-span-1 bg-[#1a1c35] rounded-2xl border border-white/5 p-6">
                                <div className="flex items-center gap-2 mb-6 text-yellow-500">
                                    <div className="p-1.5 bg-yellow-500/10 rounded-lg"><BarChart3 size={16} /></div>
                                    <h3 className="font-bold text-white text-sm">Top Performing Products</h3>
                                </div>
                                <div className="space-y-4">
                                    {products.slice(0, 3).map((p, i) => (
                                        <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl bg-[#04051a]/50 hover:bg-[#04051a] transition-colors group">
                                            <div className="text-gray-500 font-black text-lg">#{i + 1}</div>
                                            <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-gray-800" />
                                            <div className="flex-1 min-w-0">
                                                <div className="text-white text-xs font-bold truncate">{p.title}</div>
                                                <div className="text-gray-500 text-[10px] uppercase font-bold text-blue-400">{i} Sold</div>
                                            </div>
                                            <div className="text-green-400 font-bold text-sm">${p.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Orders (Mock) */}
                            <div className="lg:col-span-2 bg-[#1a1c35] rounded-2xl border border-white/5 p-6">
                                <div className="flex items-center gap-2 mb-6 text-orange-500">
                                    <div className="p-1.5 bg-orange-500/10 rounded-lg"><Clock size={16} /></div>
                                    <h3 className="font-bold text-white text-sm">Recent Orders</h3>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                            <div className="p-2 bg-green-500/20 text-green-400 rounded-full">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white text-sm font-bold">Microsoft Windows 11 Professional</div>
                                                <div className="text-gray-500 text-xs">customer{i}@example.com</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-bold">$1.00</div>
                                                <div className="text-gray-500 text-[10px]">1{i}/02/2026</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'products' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map(p => (
                            <div key={p.id} className="bg-[#1a1c35] rounded-2xl overflow-hidden border border-white/5 group hover:border-blue-500/50 transition-all">
                                <div className="relative h-40 overflow-hidden">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider truncate max-w-[100px]">{p.category}</span>
                                        <span className="text-white font-black">${p.price}</span>
                                    </div>
                                    <h3 className="text-gray-200 font-bold text-sm leading-tight mb-4 line-clamp-2 h-10">{p.title}</h3>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-white/5 hover:bg-blue-600 hover:text-white text-gray-400 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all">Edit</button>
                                        <button className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-2 rounded-lg transition-all"><LogOut size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
};

export default AdminDashboard;
