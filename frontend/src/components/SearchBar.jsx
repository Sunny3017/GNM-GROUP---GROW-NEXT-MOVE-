import React, { useState } from 'react';
import { Search, MapPin, Home, BedDouble } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ variant = 'hero' }) => {
    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState('');
    const [bhk, setBhk] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (keyword) params.append('search', keyword);
        if (type) params.append('type', type);
        if (bhk) params.append('bhk', bhk);
        navigate(`/properties?${params.toString()}`);
    };

    // Simple variant (compact, for other pages)
    if (variant === 'simple') {
        return (
            <form onSubmit={handleSearch} className="flex w-full max-w-3xl mx-auto bg-white rounded-full shadow-lg overflow-hidden p-1 border border-gray-100">
                <div className="flex-grow flex items-center px-5">
                    <Search className="text-amber-500 mr-3" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by society, location, title..." 
                        className="w-full py-3 focus:outline-none text-gray-700 placeholder-gray-400"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold tracking-wide shadow-md hover:shadow-lg">
                    Search
                </button>
            </form>
        );
    }

    // Hero variant – premium, responsive, left‑aligned
    return (
        <form onSubmit={handleSearch} className="w-full max-w-6xl bg-black/30 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/20 p-5 md:p-8 transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Location / Keyword */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1">
                        <MapPin size={14} className="text-amber-400" /> Location
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" size={16} />
                        <input 
                            type="text" 
                            placeholder="City, society, or project"
                            className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-white/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                </div>
                
                {/* Property Type */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1">
                        <Home size={14} className="text-amber-400" /> Property Type
                    </label>
                    <select 
                        className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none cursor-pointer"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="" className="bg-gray-800">All Types</option>
                        <option value="Apartment" className="bg-gray-800">Apartment</option>
                        <option value="Villa" className="bg-gray-800">Villa</option>
                        <option value="Penthouse" className="bg-gray-800">Penthouse</option>
                        <option value="Plot" className="bg-gray-800">Plot / Land</option>
                    </select>
                </div>
                
                {/* BHK Type */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1">
                        <BedDouble size={14} className="text-amber-400" /> Bedrooms
                    </label>
                    <select 
                        className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none cursor-pointer"
                        value={bhk}
                        onChange={(e) => setBhk(e.target.value)}
                    >
                        <option value="" className="bg-gray-800">Any BHK</option>
                        <option value="1BHK" className="bg-gray-800">1 BHK</option>
                        <option value="2BHK" className="bg-gray-800">2 BHK</option>
                        <option value="3BHK" className="bg-gray-800">3 BHK</option>
                        <option value="4BHK" className="bg-gray-800">4 BHK</option>
                        <option value="5BHK" className="bg-gray-800">5+ BHK</option>
                    </select>
                </div>
                
                {/* Search Button */}
                <div className="flex items-end">
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2.5 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
                    >
                        <Search size={18} className="group-hover:scale-110 transition-transform duration-200" />
                        <span>Find Property</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;