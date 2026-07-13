import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, Calendar, MessageSquare, Trash2, Loader2, User, CheckCircle2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const ViewInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAuthHeaders = () => {
        const adminInfo = localStorage.getItem('adminInfo');
        if (adminInfo) {
            const { token } = JSON.parse(adminInfo);
            return { headers: { Authorization: `Bearer ${token}` } };
        }
        return {};
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const { data } = await axios.get('/api/inquiries', getAuthHeaders());
            setInquiries(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch inquiries');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await axios.delete(`/api/inquiries/${id}`, getAuthHeaders());
                toast.success('Inquiry deleted');
                fetchInquiries();
            } catch (error) {
                toast.error('Failed to delete inquiry');
            }
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/api/inquiries/${id}`, { status }, getAuthHeaders());
            toast.success('Status updated');
            fetchInquiries();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-gold" size={40} /></div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary-dark font-serif">Customer Inquiries</h1>
                <p className="text-gray-500">Manage messages from the contact form</p>
            </div>

            <div className="space-y-6">
                {inquiries.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <MessageSquare className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500">No inquiries received yet.</p>
                    </div>
                ) : (
                    inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <div className="flex flex-col lg:flex-row justify-between gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                                                <User size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{inquiry.name}</h3>
                                                <p className="text-sm text-gray-400 font-medium">ID: {inquiry._id.slice(-6).toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                            inquiry.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                            inquiry.status === 'Contacted' ? 'bg-blue-100 text-blue-700' :
                                            inquiry.status === 'Reviewed' ? 'bg-purple-100 text-purple-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {inquiry.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-2xl">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Mail size={18} className="text-gold" />
                                            <a href={`mailto:${inquiry.email}`} className="hover:text-gold transition-colors">{inquiry.email}</a>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Phone size={18} className="text-gold" />
                                            <a href={`tel:${inquiry.phone}`} className="hover:text-gold transition-colors">{inquiry.phone}</a>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Calendar size={18} className="text-gold" />
                                            {new Date(inquiry.createdAt).toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <MessageSquare size={14} /> Message Details
                                        </p>
                                        <div className="bg-white border border-gray-100 p-6 rounded-2xl text-gray-700 leading-relaxed italic">
                                            "{inquiry.message}"
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Update Status:</p>
                                            <select
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-bold text-sm outline-none focus:ring-2 focus:ring-gold"
                                                value={inquiry.status}
                                                onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Reviewed">Reviewed</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        </div>
                                        
                                        <button
                                            onClick={() => handleDelete(inquiry._id)}
                                            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all ml-auto"
                                        >
                                            <Trash2 size={18} /> Delete Inquiry
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewInquiries;
