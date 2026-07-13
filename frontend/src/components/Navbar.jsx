import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/gnmwebsitelogo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();
    const { admin, logout } = useContext(AuthContext);

    const isHomePage = location.pathname === '/';
    const isPropertyDetails = location.pathname.startsWith('/property/');

    const menuItems = [
        { label: 'Home', link: '/' },
        { label: 'Listings', link: '/properties' },
        { label: 'Careers', link: '/careers' },
        { label: 'About Us', link: '/about' },
        { label: 'Contact Us', link: '/contact' }
    ];



    // Scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Background color change on scroll
            if (currentScrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            // Hide/Show on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <header 
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}
            >
                <nav className={`transition-all duration-500 px-8 md:px-24 py-2 flex items-center justify-between backdrop-blur-xl ${
                    isHomePage && !isScrolled 
                    ? 'bg-transparent border-transparent' 
                    : isPropertyDetails && !isScrolled
                    ? 'bg-[#FFFFE3]/80 border-transparent shadow-none'
                    : 'bg-white/5 border-b border-white/10 shadow-none'
                }`}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img 
                            src={logo} 
                            alt="GNM REALTOR" 
                            className={`h-12 md:h-20 w-auto object-contain transition-all duration-500 ${
                                isHomePage && !isScrolled ? 'brightness-0 invert' : ''
                            }`} 
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.link}
                                className={`text-sm font-semibold uppercase tracking-widest transition-colors duration-300 hover:text-orange-500 ${
                                    location.pathname === item.link 
                                    ? 'text-orange-500' 
                                    : (isHomePage && !isScrolled ? 'text-white' : 'text-gray-900')
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        className={`md:hidden p-2 transition-colors duration-300 ${isHomePage && !isScrolled ? 'text-white' : 'text-gray-900'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay - Outside header to stay visible during scroll hide */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel - Outside header */}
            <div 
                className={`fixed top-0 right-0 h-full w-[85%] max-w-xs bg-white/95 backdrop-blur-xl z-[70] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-8 flex flex-col h-full">
                    <div className="flex justify-end items-center mb-12">
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="p-3 bg-gray-50 rounded-2xl text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.link}
                                className={`text-3xl font-bold font-serif flex items-center justify-between group ${location.pathname === item.link ? 'text-gold' : 'text-gray-900'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                                <ChevronRight size={24} className={`transition-transform duration-300 group-hover:translate-x-1 ${location.pathname === item.link ? 'opacity-100 text-gold' : 'opacity-30'}`} />
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-10 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Connect With Us</p>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-600 hover:text-gold transition-colors font-medium">Twitter</a>
                            <a href="#" className="text-gray-600 hover:text-gold transition-colors font-medium">Instagram</a>
                            <a href="#" className="text-gray-600 hover:text-gold transition-colors font-medium">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Spacer to prevent content jump (Only on other pages) */}
            {!isHomePage && <div className="h-16 md:h-20"></div>}
        </>
    );
};

export default Navbar;
