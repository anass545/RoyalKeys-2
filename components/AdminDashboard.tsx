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
                    <Logo className="h-16 w-auto" />
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
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Package size={18} /> Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab('sales')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'sales' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <BarChart3 size={18} /> Sales
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'messages' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <MessageSquare size={18} /> Messages
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
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
                                                <div className="text-gray-500 text-xs">{i % 2 === 0 ? 'v0896980v@gmail.com' : 'mtcrs604@gmail.com'}</div>
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

                {activeTab === 'inventory' && (
                    <div className="bg-[#1a1c35] rounded-2xl border border-white/5 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-[#0a0b1e] border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map(p => (
                                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={p.image} className="w-8 h-8 rounded bg-gray-800 object-cover" />
                                                <span className="text-sm font-bold text-white truncate max-w-[200px]">{p.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-300">Unlimited</td>
                                        <td className="px-6 py-4 text-sm font-bold text-green-400">${p.price}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-[10px] font-black uppercase tracking-widest">Active</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-400 hover:text-blue-300 text-xs font-bold mr-3 underline decoration-blue-400/30">Restock</button>
                                            <button className="text-gray-500 hover:text-white text-xs font-bold transition-colors">Manage</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'sales' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard title="Total Volume" value="$12,400" subtext="+5.2% vs yesterday" icon={DollarSign} color="blue" />
                            <StatCard title="Conversion" value="3.2%" subtext="Consistent performance" icon={BarChart3} color="purple" />
                            <StatCard title="Customers" value="482" subtext="New accounts today" icon={Users} color="pink" />
                        </div>
                        <div className="bg-[#1a1c35] rounded-2xl border border-white/5 p-6">
                            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Recent Transactions</h3>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#04051a]/50 border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">#O</div>
                                            <div>
                                                <div className="text-white text-sm font-bold">Order #7432{i}</div>
                                                <div className="text-gray-500 text-[10px]">Processing • {i} min ago</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-400 font-bold">$24.99</div>
                                            <div className="text-gray-500 text-[10px]">Stripe • ID: {Math.random().toString(36).substring(7).toUpperCase()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="bg-[#1a1c35] rounded-2xl border border-white/5 h-[600px] flex flex-col">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs">Support Inbox</h3>
                            <span className="bg-amber-500 text-[#04051a] px-2 py-0.5 rounded text-[10px] font-black">2 NEW</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={`p-4 rounded-2xl border ${i === 1 ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/5 bg-[#04051a]/30'} hover:border-white/10 cursor-pointer transition-all`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-black text-white">Customer Support Inquiry #{i}</span>
                                        <span className="text-[10px] text-gray-500 uppercase font-bold">{i}h ago</span>
                                    </div>
                                    <p className="text-gray-400 text-xs line-clamp-2 italic leading-relaxed">
                                        "Hi RoyalKeys team, I purchased a Windows 11 key but I am having trouble activating it on my new build. Can you please assist..."
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="text-[10px] text-blue-400 font-black uppercase">Pending Response</div>
                                        <button className="text-white bg-blue-600 px-3 py-1 rounded text-[10px] font-black uppercase hover:bg-blue-500 transition-colors">Reply Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-4xl space-y-6">
                        <div className="bg-[#1a1c35] rounded-2xl border border-white/5 p-8">
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                                <Settings size={14} className="text-gray-500" /> Portal Configuration
                            </h3>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="block text-gray-400 text-[10px] uppercase font-black tracking-widest">Portal Name</label>
                                        <input type="text" defaultValue="RoyalKeys Control Center" className="w-full bg-[#04051a] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-amber-500 focus:outline-none" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-gray-400 text-[10px] uppercase font-black tracking-widest">Admin Notification Email</label>
                                        <input type="email" defaultValue="v0896980v@gmail.com" className="w-full bg-[#04051a] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-amber-500 focus:outline-none" />
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                    <h4 className="text-amber-500 font-black uppercase text-[10px] tracking-widest mb-4">Security Whitelist</h4>
                                    <div className="space-y-3">
                                        {['v0896980v@gmail.com', 'mtcrs604@gmail.com'].map(email => (
                                            <div key={email} className="flex items-center justify-between bg-[#04051a]/50 p-3 rounded-xl border border-white/5">
                                                <span className="text-white text-xs font-bold underline decoration-blue-500/30">{email}</span>
                                                <span className="text-[10px] text-green-400 font-black uppercase tracking-tighter">Authorized</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="mt-4 w-full bg-white text-[#04051a] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                                        Register New Admin Access
                                    </button>
                                </div>

                                <div className="flex justify-end gap-4 border-t border-white/5 pt-8">
                                    <button className="px-6 py-3 text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Discard Changes</button>
                                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all">Save Global Settings</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default AdminDashboard;
