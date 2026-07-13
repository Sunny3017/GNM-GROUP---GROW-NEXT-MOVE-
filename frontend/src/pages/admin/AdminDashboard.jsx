import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { PropertyContext } from '../../context/PropertyContext';
import { 
    LayoutDashboard, PlusCircle, Settings, LogOut, 
    Home, Users, TrendingUp, Clock, ArrowRight,
    Building2, MapPin, IndianRupee, Star, Briefcase, FileText,
    MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { logout, admin } = useContext(AuthContext);
    const { properties, fetchProperties } = useContext(PropertyContext);
    const navigate = useNavigate();

    const [inquiriesCount, setInquiriesCount] = useState(0);

    useEffect(() => {
        fetchProperties({ listingType: null }); // Fetch all properties (sale and rent)
        fetchInquiriesCount();
    }, []);

    const fetchInquiriesCount = async () => {
        try {
            const adminInfo = localStorage.getItem('adminInfo');
            if (adminInfo) {
                const { token } = JSON.parse(adminInfo);
                const { data } = await axios.get('/api/inquiries', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setInquiriesCount(data.length);
            }
        } catch (error) {
            console.error('Error fetching inquiries count:', error);
        }
    };

    const stats = [
        { label: 'Total Properties', value: properties.length, icon: <Building2 className="text-blue-500" />, trend: '+12%' },
        { label: 'Featured Listings', value: properties.filter(p => p.featured).length, icon: <Star className="text-gold" />, trend: '+5%' },
        { label: 'Active Locations', value: [...new Set(properties.map(p => p.location))].length, icon: <MapPin className="text-green-500" />, trend: 'Stable' },
        { label: 'Total Inquiries', value: inquiriesCount, icon: <MessageSquare className="text-purple-500" />, trend: 'New' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-primary-dark text-white hidden lg:flex flex-col">
                <div className="p-8 border-b border-gray-800">
                    <span className="text-2xl font-bold font-serif tracking-tighter">
                        GNM <span className="text-gold">ADMIN</span>
                    </span>
                </div>
                <nav className="flex-grow p-6 space-y-2">
                    <Link to="/admin" className="flex items-center gap-4 px-6 py-4 bg-gold text-primary-dark rounded-2xl font-bold transition-all">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/add" className="flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                        <PlusCircle size={20} /> Add Property
                    </Link>
                    <Link to="/admin/manage" className="flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                        <Settings size={20} /> Manage Properties
                    </Link>
                    <Link to="/admin/jobs" className="flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                        <Briefcase size={20} /> Manage Jobs
                    </Link>
                    <Link to="/admin/applications" className="flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                        <FileText size={20} /> Job Applications
                    </Link>
                    <Link to="/admin/inquiries" className="flex items-center gap-4 px-6 py-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                        <MessageSquare size={20} /> Customer Inquiries
                    </Link>
                </nav>
                <div className="p-6 border-t border-gray-800">
                    <button 
                        onClick={() => { logout(); navigate('/admin/login'); }}
                        className="flex items-center gap-4 px-6 py-4 w-full text-red-400 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6 md:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold font-serif text-primary-dark">Welcome back, Admin</h1>
                        <p className="text-gray-500">Here's what's happening with your properties today.</p>
                    </div>
                    <Link to="/admin/add" className="bg-gold text-primary-dark px-8 py-4 rounded-2xl font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-primary-dark hover:text-white transition-all shadow-xl shadow-gold/10">
                        <PlusCircle size={20} /> New Property
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {stats.map((stat, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-primary-dark">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Recent Listings */}
                    <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="text-xl font-bold font-serif">Recent Listings</h3>
                            <Link to="/admin/manage" className="text-gold font-bold text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
                                View All <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                    <tr>
                                        <th className="px-8 py-4 text-left">Property</th>
                                        <th className="px-8 py-4 text-left">Location</th>
                                        <th className="px-8 py-4 text-left">Price</th>
                                        <th className="px-8 py-4 text-left">Type</th>
                                        <th className="px-8 py-4 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {properties.slice(0, 5).map((p) => (
                                        <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <img src={p.images[0]?.url} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                                    <div>
                                                        <p className="font-bold text-primary-dark line-clamp-1">{p.title}</p>
                                                        <p className="text-xs text-gray-400">{p.propertyType}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-gray-500">{p.location}</td>
                                            <td className="px-8 py-6 font-bold text-primary-dark">₹{(p.price / 100000).toFixed(1)}L</td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                                    (p.listingType || 'sale') === 'sale' 
                                                        ? 'bg-blue-50 text-blue-600' 
                                                        : 'bg-purple-50 text-purple-600'
                                                }`}>
                                                    {(p.listingType || 'sale').toUpperCase()}
                                                    {p.listingType === 'rent' && p.tenantType && ` • ${p.tenantType.toUpperCase()}`}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${p.featured ? 'bg-gold/10 text-gold' : 'bg-gray-100 text-gray-400'}`}>
                                                    {p.featured ? 'Featured' : 'Standard'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-primary-dark text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            <h3 className="text-xl font-bold font-serif mb-6 relative z-10">Quick Actions</h3>
                            <div className="space-y-4 relative z-10">
                                <Link to="/admin/add" className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group">
                                    <div className="p-3 bg-gold rounded-xl text-primary-dark group-hover:scale-110 transition-transform">
                                        <PlusCircle size={20} />
                                    </div>
                                    <span className="font-bold">Add New Property</span>
                                </Link>
                                <Link to="/admin/manage" className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group">
                                    <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform text-gold">
                                        <Settings size={20} />
                                    </div>
                                    <span className="font-bold">Edit Listings</span>
                                </Link>
                                <Link to="/admin/inquiries" className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group">
                                    <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform text-gold">
                                        <MessageSquare size={20} />
                                    </div>
                                    <span className="font-bold">View Inquiries</span>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-3">
                                <Clock size={20} className="text-gold" /> System Status
                            </h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Database</span>
                                    <span className="flex items-center gap-2 text-green-500 font-bold text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Connected
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">API Server</span>
                                    <span className="flex items-center gap-2 text-green-500 font-bold text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Online
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Image Storage</span>
                                    <span className="flex items-center gap-2 text-green-500 font-bold text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
