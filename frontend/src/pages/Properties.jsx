import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import { Filter, SlidersHorizontal, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Properties = () => {
    const { properties, loading, pagination, fetchProperties } = useContext(PropertyContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);

    // Filter states
    const [filters, setFilters] = useState({
        bhk: searchParams.get('bhk') || '',
        propertyType: searchParams.get('type') || '',
        sort: searchParams.get('sort') || 'latest',
        search: searchParams.get('search') || '',
        pageNumber: searchParams.get('pageNumber') || 1
    });

    useEffect(() => {
        setFilters({
            bhk: searchParams.get('bhk') || '',
            propertyType: searchParams.get('type') || '',
            sort: searchParams.get('sort') || 'latest',
            search: searchParams.get('search') || '',
            pageNumber: searchParams.get('pageNumber') || 1
        });

        const params = {
            bhk: searchParams.get('bhk'),
            propertyType: searchParams.get('type'),
            sort: searchParams.get('sort'),
            location: searchParams.get('search'),
            pageNumber: searchParams.get('pageNumber')
        };
        fetchProperties(params);
    }, [searchParams]);

    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters, [name]: value, pageNumber: 1 };
        setFilters(newFilters);
        
        // Update URL params
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(name === 'search' ? 'search' : (name === 'propertyType' ? 'type' : name), value);
        } else {
            newParams.delete(name === 'search' ? 'search' : (name === 'propertyType' ? 'type' : name));
        }
        newParams.set('pageNumber', 1);
        setSearchParams(newParams);
    };

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('pageNumber', newPage);
        setSearchParams(newParams);
    };

    return (
        <div className="min-h-screen pt-12 pb-24 bg-primary-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <span className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block text-center">Exclusive Listings</span>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary-dark text-center mb-4">Our Properties</h1>
                    <div className="w-20 h-1.5 bg-gold mx-auto mb-8"></div>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white rounded-2xl shadow-sm p-4 mb-12 flex flex-col lg:flex-row gap-4 items-center justify-between border border-gray-100">
                    <div className="relative w-full lg:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search location, society..." 
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold border-none font-medium"
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
                        <select 
                            className="w-full lg:w-40 bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-1 focus:ring-gold outline-none font-bold text-sm text-primary-dark"
                            value={filters.bhk}
                            onChange={(e) => handleFilterChange('bhk', e.target.value)}
                        >
                            <option value="">All BHK</option>
                            <option value="1BHK">1 BHK</option>
                            <option value="2BHK">2 BHK</option>
                            <option value="3BHK">3 BHK</option>
                            <option value="4BHK">4 BHK</option>
                            <option value="5BHK">5 BHK</option>
                        </select>

                        <select 
                            className="w-full lg:w-40 bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-1 focus:ring-gold outline-none font-bold text-sm text-primary-dark"
                            value={filters.propertyType}
                            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Plot">Plot</option>
                        </select>

                        <select 
                            className="w-full lg:w-48 bg-gray-50 border-none rounded-xl px-4 py-4 focus:ring-1 focus:ring-gold outline-none font-bold text-sm text-primary-dark"
                            value={filters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                        >
                            <option value="latest">Latest First</option>
                            <option value="priceLow">Price: Low to High</option>
                            <option value="priceHigh">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-[500px] bg-gray-200 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        {properties.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                                <Search size={64} className="mx-auto text-gray-200 mb-6" />
                                <h3 className="text-2xl font-serif font-bold text-primary-dark mb-2">No Properties Found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                                <button 
                                    onClick={() => {
                                        setSearchParams({});
                                        setFilters({ bhk: '', propertyType: '', sort: 'latest', search: '', pageNumber: 1 });
                                    }}
                                    className="mt-8 text-gold font-bold uppercase tracking-widest hover:underline"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                                <AnimatePresence mode="popLayout">
                                    {properties.map((property, idx) => (
                                        <motion.div
                                            key={property._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        >
                                            <PropertyCard property={property} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="flex justify-center items-center gap-4">
                                <button 
                                    disabled={pagination.page === 1}
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    className="p-3 rounded-full bg-white shadow-sm border border-gray-100 disabled:opacity-30 hover:text-gold transition-colors"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                
                                <div className="flex items-center gap-2">
                                    {[...Array(pagination.pages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-12 h-12 rounded-full font-bold transition-all ${
                                                pagination.page === i + 1 
                                                ? 'bg-primary-dark text-white shadow-lg' 
                                                : 'bg-white text-gray-500 hover:text-gold border border-gray-100'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    disabled={pagination.page === pagination.pages}
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    className="p-3 rounded-full bg-white shadow-sm border border-gray-100 disabled:opacity-30 hover:text-gold transition-colors"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Properties;
