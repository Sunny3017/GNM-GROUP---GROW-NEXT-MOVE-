import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../../context/PropertyContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
    Edit, Trash2, Search, Filter, ArrowLeft, 
    PlusCircle, ExternalLink, MapPin, IndianRupee,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageProperties = () => {
    const { properties, loading, pagination, fetchProperties } = useContext(PropertyContext);
    const { admin } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProperties({ listingType: null }); // Fetch all properties (sale and rent)
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
            try {
                await axios.delete(`/api/properties/${id}`, {
                    headers: { Authorization: `Bearer ${admin.token}` }
                });
                toast.success('Property deleted successfully');
                fetchProperties({ listingType: null });
            } catch (error) {
                toast.error(error.response?.data?.message || 'Delete failed');
            }
        }
    };

    const filteredProperties = properties.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.societyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Admin Header */}
            <div className="bg-primary-dark text-white py-12 mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <Link to="/admin" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                                <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                            </Link>
                            <h1 className="text-4xl font-serif font-bold">Manage Listings</h1>
                            <p className="text-gray-400 mt-2">Edit, update, or remove your property listings.</p>
                        </div>
                        <Link to="/admin/add" className="bg-gold text-primary-dark px-8 py-4 rounded-2xl font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-xl shadow-gold/10">
                            <PlusCircle size={20} /> Add Property
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Controls */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Filter by title, society, or location..." 
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold border-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="px-6 py-3 bg-gray-50 rounded-xl font-bold text-sm text-gray-500 flex items-center gap-2">
                            Total: <span className="text-primary-dark">{filteredProperties.length} Properties</span>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-6 text-left">Property Details</th>
                                    <th className="px-8 py-6 text-left">Pricing & Size</th>
                                    <th className="px-8 py-6 text-left">Type</th>
                                    <th className="px-8 py-6 text-left">Status</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    [1, 2, 3].map(i => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan="5" className="px-8 py-12"><div className="h-12 bg-gray-100 rounded-xl"></div></td>
                                        </tr>
                                    ))
                                ) : (
                                    <AnimatePresence>
                                        {filteredProperties.map((p) => (
                                            <motion.tr 
                                                key={p._id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="hover:bg-gray-50/50 transition-colors"
                                            >
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-6">
                                                        <div className="relative flex-shrink-0">
                                                            <img src={p.images[0]?.url} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
                                                            {p.featured && (
                                                                <div className="absolute -top-2 -left-2 bg-gold p-1 rounded-lg text-white shadow-lg">
                                                                    <PlusCircle size={12} className="rotate-45" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-primary-dark text-lg line-clamp-1">{p.title}</p>
                                                            <p className="text-gold font-bold text-xs uppercase tracking-widest mb-2">{p.societyName}</p>
                                                            <div className="flex items-center text-gray-400 text-sm">
                                                                <MapPin size={14} className="mr-1" /> {p.location}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="space-y-1">
                                                        <p className="font-bold text-primary-dark text-lg">₹{p.price.toLocaleString('en-IN')}</p>
                                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{p.size} Sq Ft • {p.bhk}</p>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] ${
                                                        (p.listingType || 'sale') === 'sale' 
                                                        ? 'bg-blue-50 text-blue-600' 
                                                        : 'bg-purple-50 text-purple-600'
                                                    }`}>
                                                        {(p.listingType || 'sale').toUpperCase()}
                                                        {p.listingType === 'rent' && p.tenantType && ` • ${p.tenantType.toUpperCase()}`}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] ${
                                                        p.possessionStatus === 'Ready to Move' 
                                                        ? 'bg-green-50 text-green-600' 
                                                        : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                        {p.possessionStatus}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex justify-end gap-3">
                                                        <Link 
                                                            to={`/property/${p.slug}`} 
                                                            target="_blank"
                                                            className="p-3 bg-gray-50 text-gray-400 hover:text-primary-dark rounded-xl transition-colors"
                                                            title="View Live"
                                                        >
                                                            <ExternalLink size={18} />
                                                        </Link>
                                                        <Link 
                                                            to={`/admin/edit/${p._id}`}
                                                            className="p-3 bg-gray-50 text-gray-400 hover:text-gold rounded-xl transition-colors"
                                                            title="Edit Listing"
                                                        >
                                                            <Edit size={18} />
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleDelete(p._id)}
                                                            className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-colors"
                                                            title="Delete Listing"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-4">
                        <button className="p-3 rounded-full bg-white shadow-sm border border-gray-100 disabled:opacity-30"><ChevronLeft /></button>
                        <span className="font-bold text-gray-400">Page {pagination.page} of {pagination.pages}</span>
                        <button className="p-3 rounded-full bg-white shadow-sm border border-gray-100 disabled:opacity-30"><ChevronRight /></button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProperties;
