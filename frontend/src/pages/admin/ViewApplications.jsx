import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, Calendar, Briefcase, FileText, Trash2, Loader2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const ViewApplications = () => {
    const [applications, setApplications] = useState([]);
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
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data } = await axios.get('/api/applications', getAuthHeaders());
            setApplications(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch applications');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await axios.delete(`/api/applications/${id}`, getAuthHeaders());
                toast.success('Application deleted');
                fetchApplications();
            } catch (error) {
                toast.error('Failed to delete application');
            }
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/api/applications/${id}`, { status }, getAuthHeaders());
            toast.success('Status updated');
            fetchApplications();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-gold" size={40} /></div>;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary-dark font-serif">Job Applications</h1>
                <p className="text-gray-500">Review and manage candidate applications</p>
            </div>

            <div className="space-y-6">
                {applications.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <FileText className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500">No applications received yet.</p>
                    </div>
                ) : (
                    applications.map((app) => (
                        <div key={app._id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex flex-col lg:flex-row justify-between gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900">{app.name}</h3>
                                        <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                                            app.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                                            app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                            app.status === 'Reviewed' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Mail size={18} className="text-gold" /> {app.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone size={18} className="text-gold" /> {app.phone}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Briefcase size={18} className="text-gold" /> Applied for: <span className="font-bold">{app.job?.title || app.role || 'General Application'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} className="text-gold" /> Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                                        </div>
                                    </div>

                                    {app.coverLetter && (
                                        <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Cover Letter / Message</p>
                                            <p className="text-gray-700 whitespace-pre-line">{app.coverLetter}</p>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-4">
                                        <a
                                            href={app.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-primary-dark text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
                                        >
                                            <ExternalLink size={18} /> View Resume
                                        </a>
                                        <select
                                            className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-gold"
                                            value={app.status}
                                            onChange={(e) => updateStatus(app._id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Reviewed">Reviewed</option>
                                            <option value="Shortlisted">Shortlisted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                        <button
                                            onClick={() => handleDelete(app._id)}
                                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <Trash2 size={20} />
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

export default ViewApplications;
