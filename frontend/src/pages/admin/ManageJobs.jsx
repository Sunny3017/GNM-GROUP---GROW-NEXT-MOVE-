import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, Check, X, Briefcase, MapPin, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        location: '',
        type: 'Full-time',
        salary: '',
        experience: '',
        category: ''
    });

    const getAuthHeaders = () => {
        const adminInfo = localStorage.getItem('adminInfo');
        if (adminInfo) {
            const { token } = JSON.parse(adminInfo);
            return { headers: { Authorization: `Bearer ${token}` } };
        }
        return {};
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const { data } = await axios.get('/api/jobs/admin', getAuthHeaders());
            setJobs(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch jobs');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                requirements: formData.requirements.split('\n').filter(r => r.trim() !== '')
            };

            if (editingJob) {
                await axios.put(`/api/jobs/${editingJob._id}`, payload, getAuthHeaders());
                toast.success('Job updated successfully');
            } else {
                await axios.post('/api/jobs', payload, getAuthHeaders());
                toast.success('Job added successfully');
            }
            setIsAdding(false);
            setEditingJob(null);
            setFormData({ title: '', description: '', requirements: '', location: '', type: 'Full-time', salary: '', experience: '', category: '' });
            fetchJobs();
        } catch (error) {
            toast.error('Failed to save job');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await axios.delete(`/api/jobs/${id}`, getAuthHeaders());
                toast.success('Job deleted');
                fetchJobs();
            } catch (error) {
                toast.error('Failed to delete job');
            }
        }
    };

    const toggleStatus = async (job) => {
        try {
            await axios.put(`/api/jobs/${job._id}`, { isActive: !job.isActive }, getAuthHeaders());
            toast.success('Status updated');
            fetchJobs();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleEdit = (job) => {
        setEditingJob(job);
        setFormData({
            ...job,
            requirements: job.requirements.join('\n')
        });
        setIsAdding(true);
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-gold" size={40} /></div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary-dark font-serif">Manage Careers</h1>
                    <p className="text-gray-500">Add or edit job postings for GNM REALTOR</p>
                </div>
                <button
                    onClick={() => { setIsAdding(true); setEditingJob(null); }}
                    className="bg-gold text-primary-dark px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all"
                >
                    <Plus size={20} /> Add New Job
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {jobs.map((job) => (
                    <div key={job._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6 flex-1">
                            <div className="bg-gold/10 p-4 rounded-2xl text-gold">
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">{job.type}</span>
                                    <span className={`flex items-center gap-1 font-medium ${job.isActive ? 'text-green-600' : 'text-red-500'}`}>
                                        {job.isActive ? <Check size={14} /> : <X size={14} />} {job.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => toggleStatus(job)}
                                className={`p-3 rounded-xl transition-all ${job.isActive ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'}`}
                                title={job.isActive ? 'Deactivate' : 'Activate'}
                            >
                                {job.isActive ? <X size={20} /> : <Check size={20} />}
                            </button>
                            <button
                                onClick={() => handleEdit(job)}
                                className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                            >
                                <Edit2 size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(job._id)}
                                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-8">
                        <h2 className="text-2xl font-bold mb-8">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Job Title</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Location</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Job Type</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Salary (optional)</label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Experience</label>
                                <input
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Requirements (one per line)</label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-gold"
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 flex gap-4 mt-4">
                                <button type="submit" className="flex-1 bg-gold text-primary-dark py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all">
                                    {editingJob ? 'Update Job' : 'Post Job'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageJobs;
