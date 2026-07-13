import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Building2, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative py-32 bg-primary-dark overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[150px]"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Since 2010</span>
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-serif leading-tight">
                        Our Legacy <br />
                        <span className="italic font-light text-white/80">of Excellence</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Redefining the landscape of luxury real estate in Indirapuram and beyond through innovation, integrity, and a commitment to our clients.
                    </p>
                </div>
            </section>

            {/* Our Mission & Vision */}
            <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Our Purpose</span>
                        <h2 className="text-5xl font-bold font-serif text-primary-dark mb-8 leading-tight">More than just <br/>Real Estate</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            At GNM Group, we believe that a home is more than just four walls; it's the foundation of your future. For over a decade, we have been dedicated to helping families find their perfect space, combining modern aesthetics with unparalleled quality.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Target className="text-gold" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary-dark mb-2 uppercase tracking-wider text-sm">Our Mission</h4>
                                    <p className="text-gray-500 text-sm">To provide transparent, luxury property solutions that exceed expectations.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Heart className="text-gold" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary-dark mb-2 uppercase tracking-wider text-sm">Our Vision</h4>
                                    <p className="text-gray-500 text-sm">To be the most trusted name in premium real estate development and consultancy.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="GNM Office" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-gold p-10 rounded-[2rem] shadow-xl hidden md:block">
                            <p className="text-5xl font-bold text-primary-dark mb-1 font-serif">15+</p>
                            <p className="text-primary-dark font-bold uppercase tracking-widest text-xs">Years of Trust</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-gray-50 py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Foundation of Success</span>
                        <h2 className="text-5xl font-bold font-serif text-primary-dark mb-6">Our Core Values</h2>
                        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Integrity", desc: "Honesty and transparency are at the heart of everything we do." },
                            { icon: Award, title: "Excellence", desc: "We strive for perfection in every detail, from design to service." },
                            { icon: Users, title: "Client First", desc: "Your needs and dreams are our top priority, always." },
                            { icon: Building2, title: "Innovation", desc: "Embracing modern technology and design for better living." },
                            { icon: Heart, title: "Commitment", desc: "We are with you at every step of your home-buying journey." },
                            { icon: Target, title: "Precision", desc: "Meticulous planning and execution in all our projects." }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center mb-8">
                                    <value.icon className="text-gold" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-primary-dark mb-4 uppercase tracking-tight">{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story/History */}
            <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 order-2 lg:order-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img src="https://images.unsplash.com/flagged/photo-1558954157-aa76c0d246c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" alt="Real Estate" className="rounded-3xl h-64 w-full object-cover" />
                                <img src="https://images.unsplash.com/vector-1741055269272-f30d1e737eb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" alt="Real Estate Vector" className="rounded-3xl h-80 w-full object-cover" />
                            </div>
                            <div className="space-y-4 pt-12">
                                <img src="https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" alt="Premium Real Estate" className="rounded-3xl h-80 w-full object-cover" />
                                <img src="https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" alt="Property" className="rounded-3xl h-64 w-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 order-1 lg:order-2">
                        <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block">The GNM Story</span>
                        <h2 className="text-5xl font-bold font-serif text-primary-dark mb-8 leading-tight">A Journey of <br/>Trust and Innovation</h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Founded in 2010, GNM Group started with a simple vision: to bridge the gap between luxury and accessibility. We saw a need for high-quality, well-designed homes in the growing hubs of NCR.
                            </p>
                            <p>
                                Over the years, we have evolved from a small consultancy to a full-scale real estate powerhouse, successfully delivering multiple premium projects. Our focus has always been on Indirapuram, where we've helped shape the skyline.
                            </p>
                            <p>
                                Today, GNM Group stands as a symbol of reliability. Every project we undertake is a testament to our dedication to architectural brilliance and customer satisfaction.
                            </p>
                        </div>
                        <Link to="/contact" className="inline-flex items-center gap-2 mt-10 text-gold font-bold uppercase tracking-widest hover:gap-4 transition-all">
                            Partner with us <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary-dark rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">Be a Part of Our <br />Future Projects</h2>
                        <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">Whether you're looking for your dream home or a premium investment, GNM Group is here to guide you.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/properties" className="bg-gold text-primary-dark px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl">
                                Explore Listings
                            </Link>
                            <Link to="/contact" className="bg-white/10 border border-white/20 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ArrowRight = ({ size, className }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default About;
