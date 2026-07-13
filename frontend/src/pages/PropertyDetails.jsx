import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';
import { 
    MapPin, BedDouble, Maximize2, Bath, Car, Compass, 
    ArrowLeft, Share2, Heart, Phone, MessageSquare, 
    CheckCircle2, Info, Layers, Building2, Calendar, 
    Home, Shield, Zap, Waves, Dumbbell, Coffee, TreePine, Gamepad2
} from 'lucide-react';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';

const PropertyDetails = () => {
    const { slug } = useParams();
    const { getPropertyBySlug, properties, fetchProperties } = useContext(PropertyContext);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const galleryRef = React.useRef(null);

    const scrollToMedia = (index) => {
        if (galleryRef.current) {
            const children = galleryRef.current.children;
            if (children[index]) {
                children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    };

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);
            const data = await getPropertyBySlug(slug);
            setProperty(data);
            setLoading(false);
            
            if (properties.length === 0) {
                fetchProperties();
            }
        };
        getDetails();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-primary-light">
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!property) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary-light p-4">
            <h2 className="text-3xl font-serif font-bold mb-4">Property Not Found</h2>
            <Link to="/properties" className="text-gold font-bold uppercase tracking-widest hover:underline">Back to Listings</Link>
        </div>
    );

    const similarProperties = properties
        .filter(p => p._id !== property._id)
        .slice(0, 3);

    const amenitiesList = [
        { name: 'Lift', icon: <Layers size={20} /> },
        { name: 'Security', icon: <Shield size={20} /> },
        { name: 'Power Backup', icon: <Zap size={20} /> },
        { name: 'Swimming Pool', icon: <Waves size={20} /> },
        { name: 'Gym', icon: <Dumbbell size={20} /> },
        { name: 'Club House', icon: <Coffee size={20} /> },
        { name: 'Garden', icon: <TreePine size={20} /> },
        { name: 'Kids Play Area', icon: <Gamepad2 size={20} /> },
    ];

    return (
        <div className="bg-[#fcfcfc] pb-24">
            {/* Gallery Section */}
            <section className="bg-[#FFFFE3] pt-8 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/properties" className="inline-flex items-center text-gray-500 hover:text-primary-dark mb-8 transition-colors group">
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Search
                    </Link>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Media Gallery (Scrollable) */}
                        <div className="lg:col-span-9 relative">
                            <div 
                                ref={galleryRef}
                                className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
                            >
                                {/* Videos First */}
                                {property.videos?.map((vid, idx) => (
                                    <motion.div 
                                        key={`vid-${idx}`}
                                        className="relative flex-shrink-0 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black snap-center"
                                    >
                                        <video 
                                            src={vid.url} 
                                            controls
                                            className="w-full h-full object-contain bg-black"
                                        />
                                        <div className="absolute top-6 left-6 flex gap-3 pointer-events-none">
                                            <span className="bg-gold text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                                Video Tour
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Images */}
                                {property.images.map((img, idx) => (
                                    <motion.div 
                                        key={`img-${idx}`}
                                        className="relative flex-shrink-0 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black snap-center"
                                    >
                                        <img 
                                            src={img.url} 
                                            alt={`${property.title} - ${idx + 1}`}
                                            className="w-full h-full object-cover bg-black"
                                        />
                                        <div className="absolute top-6 left-6 flex gap-3 pointer-events-none">
                                            <span className="bg-white/90 backdrop-blur-sm text-primary-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                                Photo {idx + 1}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* Hint for scrolling */}
                            <div className="mt-4 flex justify-center lg:justify-start">
                                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                        <span>Swipe on media to explore</span>
                                        <div className="w-12 h-[1px] bg-gray-400"></div>
                                    </p>
                            </div>
                        </div>

                        {/* Right Sidebar Thumbnails (Click to Scroll) */}
                        <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto max-h-[500px] no-scrollbar pr-2">
                            <p className="hidden lg:block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 px-1">Gallery</p>
                            
                            {/* Video Thumbnails */}
                            {property.videos?.map((vid, idx) => (
                                <button 
                                    key={`thumb-vid-${idx}`}
                                    onClick={() => scrollToMedia(idx)}
                                    className="relative flex-shrink-0 w-32 lg:w-full aspect-video rounded-2xl overflow-hidden border-2 border-transparent hover:border-gold transition-all bg-black group"
                                >
                                    <video src={vid.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                                            </div>
                                        </div>
                                </button>
                            ))}

                            {/* Image Thumbnails */}
                            {property.images.map((img, idx) => (
                                <button 
                                    key={`thumb-img-${idx}`}
                                    onClick={() => scrollToMedia((property.videos?.length || 0) + idx)}
                                    className="relative flex-shrink-0 w-32 lg:w-full aspect-video rounded-2xl overflow-hidden border-2 border-transparent hover:border-gold transition-all group"
                                >
                                    <img src={img.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100" alt="" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Side: Info */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Header Info */}
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                <div>
                                    <p className="text-gold font-bold tracking-widest uppercase text-sm mb-2">{property.societyName}</p>
                                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-dark mb-4">{property.title}</h1>
                                    <div className="flex items-center text-gray-500">
                                        <MapPin size={20} className="mr-2 text-gold" />
                                        <span className="text-lg">{property.location}</span>
                                    </div>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Asking Price</p>
                                    <p className="text-4xl md:text-5xl font-bold text-primary-dark tracking-tight">₹{property.price.toLocaleString('en-IN')}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gold">
                                        <BedDouble size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">BHK Type</p>
                                        <p className="font-bold text-primary-dark">{property.bhk} BHK</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gold">
                                        <Maximize2 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Total Area</p>
                                        <p className="font-bold text-primary-dark">{property.size} Sq Ft</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gold">
                                        <Bath size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Bathrooms</p>
                                        <p className="font-bold text-primary-dark">{property.bathrooms || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gold">
                                        <Compass size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Facing</p>
                                        <p className="font-bold text-primary-dark">{property.facing || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-2xl font-serif font-bold mb-6 flex items-center">
                                    <Info size={24} className="mr-3 text-gold" /> Description
                                </h3>
                                <div className="relative">
                                    <p className={`text-gray-600 leading-relaxed text-lg whitespace-pre-line ${!showFullDescription && property.description.length > 300 ? 'line-clamp-4' : ''}`}>
                                        {property.description}
                                    </p>
                                    {property.description.length > 300 && (
                                        <button 
                                            onClick={() => setShowFullDescription(!showFullDescription)}
                                            className="text-gold font-bold mt-4 hover:text-gold-dark transition-colors flex items-center gap-1 uppercase text-sm tracking-widest"
                                        >
                                            {showFullDescription ? 'Read Less' : 'Read More'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Detailed Specs */}
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center">
                                <Layers size={24} className="mr-3 text-gold" /> Property Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {[
                                    { label: 'Society Name', value: property.societyName, icon: <Building2 size={18} /> },
                                    { label: 'Floor Details', value: `${property.floor || 'N/A'} of ${property.totalFloors || 'N/A'} Floors`, icon: <Layers size={18} /> },
                                    { label: 'Furnishing', value: property.furnishing, icon: <CheckCircle2 size={18} /> },
                                    { label: 'Parking', value: property.parking, icon: <Car size={18} /> },
                                    { label: 'Age of Property', value: property.propertyAge, icon: <Calendar size={18} /> },
                                    { label: 'Possession', value: property.possessionStatus, icon: <CheckCircle2 size={18} /> },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-50">
                                        <div className="flex items-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                                            <span className="mr-3 text-gold">{item.icon}</span>
                                            {item.label}
                                        </div>
                                        <div className="font-bold text-primary-dark">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-serif font-bold mb-8 flex items-center">
                                <CheckCircle2 size={24} className="mr-3 text-gold" /> Modern Amenities
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {amenitiesList.map((amenity, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`flex flex-col items-center p-6 rounded-2xl transition-colors ${
                                            property.amenities?.includes(amenity.name) 
                                            ? 'bg-gold/10 text-gold' 
                                            : 'bg-gray-50 text-gray-300'
                                        }`}
                                    >
                                        <div className="mb-3">{amenity.icon}</div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-center">{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Sidebar/Contact */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-[#111827] text-white p-8 rounded-[2rem] shadow-2xl border border-white/5">
                                <h3 className="text-2xl font-serif font-bold mb-6 text-white">Interested in this property?</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">Our expert advisors are ready to help you with more information and a private site visit.</p>
                                
                                <div className="space-y-4">
                                    <a 
                                        href="tel:+918826943792" 
                                        className="flex items-center justify-center w-full py-4 bg-gold text-white rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-primary-dark transition-all duration-300 group shadow-lg shadow-gold/20"
                                    >
                                        <Phone size={20} className="mr-3 group-hover:scale-110 transition-transform" /> Call Now
                                    </a>
                                    <a 
                                        href={`https://wa.me/918826943792?text=I am interested in ${property.title} in ${property.societyName}`} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-full py-4 bg-[#25D366] text-white rounded-xl font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-all duration-300 group shadow-lg shadow-green-500/20"
                                    >
                                        <MessageSquare size={20} className="mr-3 group-hover:scale-110 transition-transform" /> WhatsApp
                                    </a>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-center gap-6 text-gray-400">
                                    <button className="hover:text-gold transition-colors flex items-center gap-2">
                                        <Heart size={20} /> <span className="text-xs font-bold uppercase tracking-widest">Save</span>
                                    </button>
                                    <button className="hover:text-gold transition-colors flex items-center gap-2">
                                        <Share2 size={20} /> <span className="text-xs font-bold uppercase tracking-widest">Share</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#1e293b] p-8 rounded-[2rem] shadow-xl text-white border border-white/5">
                                <h4 className="text-xl font-serif font-bold mb-6 text-center text-gold">GNM Assurance</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-gold" />
                                        <span className="text-sm font-medium text-gray-300">Verified Property Documents</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-gold" />
                                        <span className="text-sm font-medium text-gray-300">Transparent Pricing Policy</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-gold" />
                                        <span className="text-sm font-medium text-gray-300">Expert Legal Assistance</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                    <div className="mb-12">
                        <span className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Handpicked for you</span>
                        <h2 className="text-4xl font-serif font-bold text-primary-dark mb-4">Similar Properties</h2>
                        <div className="w-20 h-1.5 bg-gold"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {similarProperties.map(p => (
                            <PropertyCard key={p._id} property={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default PropertyDetails;
