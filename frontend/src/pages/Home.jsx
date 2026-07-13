import React, { useContext, useEffect } from 'react';
import { PropertyContext } from '../context/PropertyContext';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import { motion } from 'framer-motion';
import { ArrowRight, Award, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const { featuredProperties, loading, fetchFeaturedProperties } = useContext(PropertyContext);

    useEffect(() => {
        // Ensure featured properties are fetched on home page mount/refresh
        if (featuredProperties.length === 0) {
            fetchFeaturedProperties();
        }
    }, []);

    return (
        <div className="bg-white">
            <Hero />

            {/* Featured Properties */}
            <section className="py-16 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
                    <div className="max-w-2xl text-left">
                        <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Our Portfolio</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-primary-dark mb-6 leading-tight">Featured Luxury <br/>Listings</h2>
                        <div className="w-24 h-1 bg-gold rounded-full"></div>
                    </div>
                    <Link to="/properties" className="group flex items-center text-primary-dark font-bold uppercase tracking-widest hover:text-gold transition-all duration-300 mb-2 self-end md:self-auto">
                        View All Properties 
                        <div className="ml-4 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                            <ArrowRight size={20} className="group-hover:translate-x-1 group-hover:text-white transition-all duration-500" />
                        </div>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[500px] bg-gray-200 animate-pulse rounded-[2.5rem]"></div>
                        ))}
                    </div>
                ) : featuredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProperties.map(property => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No featured listings available at the moment.</p>
                        <Link to="/properties" className="text-gold font-bold mt-4 inline-block hover:underline">
                            Explore All Properties
                        </Link>
                    </div>
                )}
            </section>

            {/* Why Choose Us */}
            <section className="bg-primary-dark py-32 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                    <img src="https://ik.imagekit.io/your_id/pattern.png" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Excellence in Service</span>
                        <h2 className="text-5xl md:text-6xl font-bold font-serif mb-6">Why GNM Group?</h2>
                        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="group text-center p-12 border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500"
                        >
                            <div className="w-20 h-20 bg-white/10 group-hover:bg-gold rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all duration-500 rotate-3 group-hover:rotate-12">
                                <Award className="text-gold group-hover:text-primary-dark transition-all duration-500" size={40} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-6">Premium Selection</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">We curate only the finest properties that meet our strict standards for quality and luxury.</p>
                        </motion.div>

                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="group text-center p-12 border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500"
                        >
                            <div className="w-20 h-20 bg-white/10 group-hover:bg-gold rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all duration-500 -rotate-3 group-hover:-rotate-12">
                                <ShieldCheck className="text-gold group-hover:text-primary-dark transition-all duration-500" size={40} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-6">Trusted Expertise</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">With years of experience, our team provides transparent and professional guidance.</p>
                        </motion.div>

                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="group text-center p-12 border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500"
                        >
                            <div className="w-20 h-20 bg-white/10 group-hover:bg-gold rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all duration-500 rotate-6 group-hover:rotate-[20deg]">
                                <Zap className="text-gold group-hover:text-primary-dark transition-all duration-500" size={40} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-6">Seamless Experience</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">From initial search to final possession, we ensure a smooth and hassle-free journey.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gold rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-dark rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary-dark mb-8 leading-tight">Ready to Find Your <br />Extraordinary Home?</h2>
                        <p className="text-primary-dark/80 text-xl mb-12 max-w-2xl mx-auto">Contact our luxury property consultants today for a private viewing of our exclusive portfolio.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="bg-primary-dark text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                                Contact an Agent
                            </Link>
                            <Link to="/properties" className="bg-white text-primary-dark px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl">
                                Browse Listings
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
