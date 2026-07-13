import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, MapPin, Clock, IndianRupee, Send, Loader2, User, Mail, Phone, FileText, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isApplying, setIsApplying] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resumeUrl: '',
        resumeFileId: '',
        coverLetter: '',
        role: '' 
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get('/api/jobs');
                setJobs(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleApply = (job = null) => {
        setSelectedJob(job);
        setFormData(prev => ({ ...prev, role: job ? job.title : '' }));
        setIsApplying(true);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error('Please upload a PDF file only');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }

        setUploadingResume(true);
        const uploadData = new FormData();
        uploadData.append('resume', file);

        try {
            const { data } = await axios.post('/api/applications/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData(prev => ({ ...prev, resumeUrl: data.url, resumeFileId: data.fileId }));
            toast.success('Resume uploaded successfully!');
        } catch (error) {
            toast.error('Failed to upload resume');
        } finally {
            setUploadingResume(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.resumeUrl) {
            toast.error('Please upload your resume (PDF)');
            return;
        }

        setSubmitting(true);
        try {
            await axios.post('/api/applications', {
                ...formData,
                jobId: selectedJob ? selectedJob._id : null,
            });
            toast.success('Application submitted successfully!');
            setIsApplying(false);
            setFormData({ name: '', email: '', phone: '', resumeUrl: '', resumeFileId: '', coverLetter: '', role: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit application');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-gold" />
                    <p className="text-gray-500 font-medium animate-pulse">Loading Opportunities...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 bg-primary-dark overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[150px]"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Career Opportunities</span>
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-serif leading-tight">
                        Build Your Future <br />
                        <span className="italic font-light text-white/80">at GNM REALTOR</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Join a team that values innovation, integrity, and growth. We're looking for passionate individuals to redefine real estate.
                    </p>
                </div>
            </section>

            {/* Current Openings */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-primary-dark font-serif mb-4">Current Openings</h2>
                        <div className="h-1.5 w-24 bg-gold rounded-full"></div>
                    </div>
                    <p className="text-gray-500 max-w-md">
                        Browse through our open positions across various departments.
                    </p>
                </div>

                {jobs.length === 0 ? (
                    <div className="bg-gray-50 rounded-[3rem] p-16 text-center border border-dashed border-gray-200">
                        <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Briefcase className="h-10 w-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Hiring Paused</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto italic">
                            Abhi hamari hiring ruki hui hai, magar talent ke liye jagah hamesha bani rehti hai! 
                            Join our waitlist by sending a general application.
                        </p>
                        <button 
                            onClick={() => handleApply()}
                            className="bg-primary-dark text-white px-10 py-4 rounded-2xl font-bold hover:bg-gold hover:text-primary-dark transition-all shadow-xl shadow-primary-dark/10"
                        >
                            Submit General Application
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job) => (
                            <div 
                                key={job._id} 
                                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="bg-gray-50 group-hover:bg-gold/10 p-4 rounded-2xl transition-colors duration-500">
                                        <Briefcase className="h-7 w-7 text-primary-dark group-hover:text-gold" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-gray-100 text-gray-500 group-hover:bg-gold group-hover:text-primary-dark transition-all duration-500">
                                        {job.type}
                                    </span>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-primary-dark mb-4 line-clamp-1">{job.title}</h3>
                                
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center text-gray-500 font-medium text-sm">
                                        <MapPin className="h-4 w-4 mr-3 text-gold" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center text-gray-500 font-medium text-sm">
                                        <Clock className="h-4 w-4 mr-3 text-gold" />
                                        {job.experience || 'Entry Level'}
                                    </div>
                                    {job.salary && (
                                        <div className="flex items-center text-gray-500 font-medium text-sm">
                                            <IndianRupee className="h-4 w-4 mr-3 text-gold" />
                                            {job.salary}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleApply(job)}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-gray-50 group-hover:bg-primary-dark text-primary-dark group-hover:text-white rounded-2xl font-bold transition-all duration-500"
                                >
                                    Apply Now <ChevronRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Application Modal */}
            {isApplying && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-primary-dark/60 backdrop-blur-md"
                        onClick={() => setIsApplying(false)}
                    ></div>
                    
                    <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 animate-in fade-in zoom-in duration-300">
                        <div className="p-10 md:p-14">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h2 className="text-3xl font-bold text-primary-dark font-serif mb-2">
                                        {selectedJob ? 'Apply for Position' : 'General Application'}
                                    </h2>
                                    <p className="text-gold font-bold uppercase tracking-widest text-sm">
                                        {selectedJob ? selectedJob.title : 'Tell us what you can do'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsApplying(false)}
                                    className="bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 p-3 rounded-2xl transition-all"
                                >
                                    <span className="text-2xl leading-none">&times;</span>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">
                                            <User size={14} className="text-gold" /> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-medium"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">
                                            <Mail size={14} className="text-gold" /> Gmail Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="john@gmail.com"
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-medium"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">
                                            <Phone size={14} className="text-gold" /> Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91 00000 00000"
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-medium"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">
                                            <Briefcase size={14} className="text-gold" /> Desired Role
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Sales Executive"
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-medium"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            readOnly={!!selectedJob}
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">
                                        <FileText size={14} className="text-gold" /> Upload Resume (PDF Only)
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="resume-upload"
                                            disabled={uploadingResume}
                                        />
                                        <label 
                                            htmlFor="resume-upload"
                                            className={`flex items-center justify-between w-full px-6 py-4 rounded-2xl cursor-pointer border-2 border-dashed transition-all ${
                                                formData.resumeUrl 
                                                ? 'bg-green-50 border-green-200 text-green-700' 
                                                : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-gold hover:bg-gold/5'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {uploadingResume ? (
                                                    <Loader2 size={20} className="animate-spin text-gold" />
                                                ) : formData.resumeUrl ? (
                                                    <FileText size={20} className="text-green-500" />
                                                ) : (
                                                    <FileText size={20} />
                                                )}
                                                <span className="font-medium">
                                                    {uploadingResume 
                                                        ? 'Uploading...' 
                                                        : formData.resumeUrl 
                                                            ? 'Resume Uploaded ✓' 
                                                            : 'Choose PDF File (Max 5MB)'
                                                    }
                                                </span>
                                            </div>
                                            {!uploadingResume && !formData.resumeUrl && (
                                                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-md uppercase font-bold group-hover:bg-gold group-hover:text-white transition-colors">Browse</span>
                                            )}
                                        </label>
                                    </div>
                                    {formData.resumeUrl && (
                                        <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider mt-2 ml-1">Your resume has been securely uploaded to our system.</p>
                                    )}
                                </div>

                                <div className="relative">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 ml-1">
                                        <Send size={14} className="text-gold" /> Why should we hire you?
                                    </label>
                                    <textarea
                                        rows="4"
                                        placeholder="Tell us about your experience and passion..."
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all font-medium resize-none"
                                        value={formData.coverLetter}
                                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-5 bg-primary-dark text-white rounded-[2rem] font-bold text-lg flex items-center justify-center space-x-3 hover:bg-gold hover:text-primary-dark shadow-2xl shadow-primary-dark/20 disabled:opacity-50 transition-all duration-500"
                                >
                                    {submitting ? (
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                    ) : (
                                        <>
                                            <span>Send Application</span>
                                            <Send className="h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Careers;
