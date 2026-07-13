import React from 'react';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';
import TextType from './ui/TextType';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Video with soft gradient overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover scale-105"
                >
                    <source src="https://res.cloudinary.com/dviizglsy/video/upload/f_auto,q_auto,h_1080/hero/1772531394036-880236-home-page-video.mp4" type="video/mp4" />
                </video>
            </div>  

            {/* Hero Content – Left Aligned */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 md:pt-24 pb-24 md:pb-4">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    {/* Premium Typography with Typing Effect - Fixed Height to prevent layout shift */}
                    <div className="h-[200px] sm:h-[180px] md:h-[220px] flex items-center mb-4 md:mb-6">
                        <TextType 
                            text={[
                                "Welcome to GNM Group! Good to see you!",
                                "Discover Premium Homes in Indirapuram's Best Locations."
                            ]}
                            typingSpeed={75}
                            pauseDuration={2000}
                            showCursor={true}
                            cursorCharacter="_"
                            deletingSpeed={50}
                            cursorBlinkDuration={0.5}
                            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight md:leading-[1.1] tracking-tight drop-shadow-2xl"
                            as="h1"
                        />
                    </div>
                    
                    <p className="text-white text-xs sm:text-base md:text-lg max-w-lg font-light mb-6 md:mb-10 leading-relaxed opacity-90">
                        Curating excellence in luxury real estate. Find your perfect space with us.
                    </p>

                    {/* Search & Filters – responsive, glassmorphic SearchBar */}
                    <div className="relative z-30">
                        <SearchBar variant="hero" />
                    </div>
                </motion.div>
            </div>

            {/* Minimal Scroll Indicator - Repositioned to avoid overlap */}
            <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-1 opacity-70"
            >
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
                <div className="w-px h-6 md:h-10 bg-white/40" />
            </motion.div>
        </section>
    );
};

export default Hero;