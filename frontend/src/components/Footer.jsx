import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Camera, Share2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary-dark text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold tracking-tighter font-serif mb-6 block">
                            GNM <span className="text-gold">GROUP</span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Redefining luxury living with premium properties and unmatched service. Your dream home awaits with GNM Group.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Globe size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Camera size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Share2 size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-6 text-gold">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/properties" className="text-gray-400 hover:text-white transition-colors">Properties</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-6 text-gold">Services</h3>
                        <ul className="space-y-4">
                            <li className="text-gray-400">Luxury Apartments</li>
                            <li className="text-gray-400">Premium Villas</li>
                            <li className="text-gray-400">Commercial Spaces</li>
                            <li className="text-gray-400">Property Management</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-6 text-gold">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center text-gray-400">
                                <Phone size={18} className="mr-3 text-gold" />
                                <span>+91 88600 69778</span>
                            </li>
                            <li className="flex items-center text-gray-400">
                                <Mail size={18} className="mr-3 text-gold" />
                                <span>info@gnmgroup.com</span>
                            </li>
                            <li className="flex items-start text-gray-400">
                                <MapPin size={18} className="mr-3 mt-1 text-gold" />
                                <span>Plot No. 84, Basement, Opposite Shanti Gopal Hospital,<br />Ahinsa Khand-2, Indirapuram, Ghaziabad – 201014</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} GNM Group Real Estate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
