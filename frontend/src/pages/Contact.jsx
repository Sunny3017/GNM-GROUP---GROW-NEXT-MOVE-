import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/inquiries', formData);
            toast.success('Thank you for your inquiry! We will contact you soon.');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-primary-light pb-24">
            {/* Header */}
            <div className="bg-primary-dark text-white py-24 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Get In Touch</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Contact GNM Group</h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto">Our luxury property consultants are here to assist you with any inquiries.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Contact Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-primary-dark mb-8">Our Headquarters</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gold flex-shrink-0 border border-gray-100">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Location</p>
                                        <p className="text-lg font-medium text-primary-dark">Plot No. 84, Basement, Opposite Shanti Gopal Hospital,<br />Ahinsa Khand-2, Indirapuram, Ghaziabad – 201014</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gold flex-shrink-0 border border-gray-100">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Phone</p>
                                        <p className="text-lg font-medium text-primary-dark">+91 88600 69778</p>
                                        <p className="text-sm text-gray-500">Mon-Sat, 9am to 7pm</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gold flex-shrink-0 border border-gray-100">
                                        <Mail size={28} />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                                        <p className="text-lg font-medium text-primary-dark">info@gnmgroup.com</p>
                                        <p className="text-sm text-gray-500">24/7 Support Response</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-dark p-8 rounded-[2rem] text-white">
                            <h3 className="text-2xl font-serif font-bold mb-6">Direct Connect</h3>
                            <div className="space-y-4">
                                <a href="https://wa.me/918860069778" className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group">
                                    <div className="flex items-center gap-4">
                                        <MessageSquare className="text-gold" />
                                        <span className="font-bold">Chat on WhatsApp</span>
                                    </div>
                                    <Send size={18} className="text-gray-500 group-hover:text-gold transition-colors" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
                            <h2 className="text-3xl font-serif font-bold text-primary-dark mb-8">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                        <input 
                                            type="text" name="name" required
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input 
                                            type="email" name="email" required
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                    <input 
                                        type="tel" name="phone" required
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                        placeholder="+91 88600 69778"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                                    <textarea 
                                        name="message" required rows="6"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium resize-none"
                                        placeholder="Tell us about the property you're looking for..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 bg-primary-dark text-white rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-300 shadow-xl shadow-gold/10 flex items-center justify-center group disabled:opacity-70"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={24} />
                                    ) : (
                                        <>
                                            Send Inquiry
                                            <Send size={20} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
