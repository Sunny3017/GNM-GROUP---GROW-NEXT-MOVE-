import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Play, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
    const formatPrice = (price) => {
        if (price >= 10000000) {
            return (price / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
        } else if (price >= 100000) {
            return (price / 100000).toFixed(2).replace(/\.00$/, '') + ' Lacs';
        }
        return price.toLocaleString('en-IN');
    };

    const pricePerSqft = Math.round(property.price / property.size);

    const handleShare = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (navigator.share) {
            try {
                await navigator.share({
                    title: property.title,
                    text: `I'm interested in this property: ${property.title} in ${property.societyName}.`,
                    url: `${window.location.origin}/property/${property.slug}`,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(`${window.location.origin}/property/${property.slug}`);
            alert('Link copied to clipboard!');
        }
    };

    const whatsappLink = `https://wa.me/918826943792?text=${encodeURIComponent(
        `I'm interested in this property: ${property.title} in ${property.societyName}.\nDetails: ${window.location.origin}/property/${property.slug}`
    )}`;

    const renderMedia = () => {
        const hasVideos = property.videos && property.videos.length > 0;
        const hasImages = property.images && property.images.length > 0;

        // Condition for showing video as primary: 
        // 1. coverType is 'video'
        // 2. OR coverType is missing but videos exist (fallback for old properties)
        const showVideoAsPrimary = (property.coverType === 'video' || (!property.coverType && hasVideos)) && hasVideos;

        if (showVideoAsPrimary) {
            return (
                <div className="w-full h-full bg-black relative">
                    <video 
                        src={property.videos[0].url}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onMouseOver={e => e.target.play()}
                        onMouseOut={e => e.target.pause()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <Play size={18} className="text-white fill-white ml-0.5" />
                        </div>
                    </div>
                </div>
            );
        }

        if (hasImages) {
            return (
                <img 
                    src={property.images[0].url} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=GNM+REALTOR';
                    }}
                />
            );
        }

        if (hasVideos) {
            return (
                <div className="relative w-full h-full bg-black">
                    <video src={property.videos[0].url} className="w-full h-full object-cover opacity-60" muted playsInline />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Play size={24} className="text-white opacity-50" />
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <img 
                    src="https://via.placeholder.com/400x400?text=GNM+REALTOR" 
                    alt="No Media"
                    className="w-full h-full object-cover opacity-50"
                />
            </div>
        );
    };

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col aspect-[4/4.4] w-full"
        >
            {/* Top Media Area - 55% */}
            <Link to={`/property/${property.slug}`} className="relative h-[55%] shrink-0 overflow-hidden bg-black block">
                {renderMedia()}
                <div className="absolute top-3 left-3">
                    <span className="bg-gold text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {property.propertyType}
                    </span>
                </div>
            </Link>

            {/* Bottom Content Area - Increased to 45% */}
            <div className="p-4 flex flex-col justify-between h-[45%] overflow-hidden">
                <div>
                    <Link to={`/property/${property.slug}`}>
                        <h2 className="text-lg font-bold text-primary-dark line-clamp-1 mb-2 group-hover:text-gold transition-colors font-serif">
                            {property.title}
                        </h2>
                    </Link>

                    <div className="grid grid-cols-3 gap-1 text-center mb-2">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-[11px] font-bold text-primary-dark whitespace-nowrap">{formatPrice(property.price)}</p>
                            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter whitespace-nowrap">₹{pricePerSqft}/sqft</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border-x border-gray-100 px-1">
                            <p className="text-[11px] font-bold text-primary-dark whitespace-nowrap">{property.size} sqft</p>
                            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter whitespace-nowrap">Builtup</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-[11px] font-bold text-primary-dark whitespace-nowrap truncate w-full">{property.possessionStatus}</p>
                            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter whitespace-nowrap">Status</p>
                        </div>
                    </div>

                    {/* Scrollable Amenities */}
                    {property.amenities && property.amenities.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto mb-1.5 no-scrollbar">
                            {property.amenities.map((amenity, idx) => (
                                <div 
                                    key={idx} 
                                    className="flex-shrink-0 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100"
                                >
                                    <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap uppercase tracking-wider">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-2 mt-auto">
                    <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] text-white rounded-xl text-xs font-bold hover:bg-[#128C7E] transition-colors"
                    >
                        <MessageCircle size={16} />
                        WhatsApp
                    </a>
                    <button 
                        onClick={handleShare}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-50 text-primary-dark rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors"
                    >
                        <Share2 size={16} />
                        Share
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyCard;
