import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
    PlusCircle, ArrowLeft, Upload, X, CheckCircle2, 
    Building2, MapPin, IndianRupee, Info, Layers, 
    Home, Shield, Zap, Waves, Dumbbell, Coffee, TreePine, Gamepad2
} from 'lucide-react';
import { motion } from 'framer-motion';

const AddProperty = () => {
    const { admin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({}); // { fileName: percentage }
    const [customAmenity, setCustomAmenity] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        societyName: '',
        propertyType: 'Apartment',
        listingType: 'sale',
        tenantType: '', // Use empty string instead of null/family for sale
        bhk: '2BHK',
        size: '',
        price: '',
        location: '',
        description: '',
        floor: '',
        totalFloors: '',
        furnishing: 'Semi-Furnished',
        parking: 'Available',
        facing: 'East',
        bathrooms: '',
        propertyAge: '0-1 Years',
        possessionStatus: 'Ready to Move',
        amenities: [],
        featured: false,
        coverType: 'image',
        images: [],
        videos: []
    });

    const amenitiesList = [
        'Lift', 'Security', 'Power Backup', 'Swimming Pool', 
        'Gym', 'Club House', 'Garden', 'Kids Play Area'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const newData = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };
            // If listingType is changed to 'sale', set tenantType to empty string
            if (name === 'listingType' && value === 'sale') {
                newData.tenantType = '';
            } else if (name === 'listingType' && value === 'rent' && !prev.tenantType) {
                // If listingType is changed to 'rent' and tenantType is empty, default to 'family'
                newData.tenantType = 'family';
            }
            return newData;
        });
    };

    const handleAmenityChange = (amenity) => {
        setFormData(prev => {
            if (prev.amenities.includes(amenity)) {
                return { ...prev, amenities: prev.amenities.filter(a => a !== amenity) };
            } else {
                return { ...prev, amenities: [...prev.amenities, amenity] };
            }
        });
    };

    const handleAddCustomAmenity = (e) => {
        e.preventDefault();
        if (!customAmenity.trim()) return;
        
        if (formData.amenities.includes(customAmenity.trim())) {
            toast.error('Amenity already added');
            return;
        }

        setFormData(prev => ({
            ...prev,
            amenities: [...prev.amenities, customAmenity.trim()]
        }));
        setCustomAmenity('');
    };

    const handleMediaUpload = async (e, type) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const uploadPromises = files.map(async (file) => {
            const data = new FormData();
            data.append('media', file);
            
            // Initialize progress for this file
            setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

            try {
                const res = await axios.post('/api/properties/upload', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${admin.token}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(prev => ({ ...prev, [file.name]: percentCompleted }));
                    }
                });
                
                // Clear progress for this file after successful upload
                setUploadProgress(prev => {
                    const newProgress = { ...prev };
                    delete newProgress[file.name];
                    return newProgress;
                });
                
                return res.data;
            } catch (error) {
                toast.error(`Failed to upload ${file.name}`);
                setUploadProgress(prev => {
                    const newProgress = { ...prev };
                    delete newProgress[file.name];
                    return newProgress;
                });
                return null;
            }
        });

        const results = await Promise.all(uploadPromises);
        const successfulUploads = results.filter(res => res !== null);
        
        setFormData(prev => {
            const isFirstUpload = prev.images.length === 0 && prev.videos.length === 0;
            const newState = { ...prev };
            
            if (type === 'image') {
                newState.images = [...prev.images, ...successfulUploads];
            } else {
                newState.videos = [...prev.videos, ...successfulUploads];
            }
            
            if (isFirstUpload && successfulUploads.length > 0) {
                newState.coverType = type;
            }
            
            return newState;
        });
        
        setUploading(false);
        toast.success(`${successfulUploads.length} ${type}s uploaded`);
    };

    const removeMedia = (index, type) => {
        setFormData(prev => {
            const newState = { ...prev };
            if (type === 'image') {
                newState.images = prev.images.filter((_, i) => i !== index);
                if (newState.coverType === 'image' && newState.images.length === 0 && newState.videos.length > 0) {
                    newState.coverType = 'video';
                }
            } else {
                newState.videos = prev.videos.filter((_, i) => i !== index);
                if (newState.coverType === 'video' && newState.videos.length === 0 && newState.images.length > 0) {
                    newState.coverType = 'image';
                }
            }
            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.images.length === 0 && formData.videos.length === 0) {
            return toast.error('Please upload at least one image or video');
        }

        setLoading(true);
        try {
            // Prepare data: set tenantType to null if listingType is sale
            const submitData = {
                ...formData,
                tenantType: formData.listingType === 'rent' ? formData.tenantType : null
            };
            await axios.post('/api/properties', submitData, {
                headers: { Authorization: `Bearer ${admin.token}` }
            });
            toast.success('Property added successfully!');
            navigate('/admin/manage');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Admin Header */}
            <div className="bg-primary-dark text-white py-12 mb-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/admin" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-serif font-bold">Add New Property</h1>
                    <p className="text-gray-400 mt-2">Enter the details of the luxury residence below.</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                            <Info size={24} className="text-gold" /> Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Property Title</label>
                                <input 
                                    type="text" name="title" required
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    placeholder="e.g. Ultra Luxury 4BHK Penthouse with Private Pool"
                                    value={formData.title} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Society Name</label>
                                <input 
                                    type="text" name="societyName" required
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    placeholder="e.g. DLF Magnolias"
                                    value={formData.societyName} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Location</label>
                                <input 
                                    type="text" name="location" required
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    placeholder="e.g. Golf Course Road, Gurgaon"
                                    value={formData.location} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Price (₹)</label>
                                <input 
                                    type="number" name="price" required
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    placeholder="e.g. 85000000"
                                    value={formData.price} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Property Type</label>
                                <select 
                                    name="propertyType"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    value={formData.propertyType} onChange={handleChange}
                                >
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Penthouse">Penthouse</option>
                                    <option value="Plot">Plot</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Listing Type</label>
                                <select 
                                    name="listingType"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    value={formData.listingType} onChange={handleChange}
                                >
                                    <option value="sale">Sale</option>
                                    <option value="rent">Rent</option>
                                </select>
                            </div>
                            {formData.listingType === 'rent' && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Tenant Type</label>
                                    <select 
                                        name="tenantType"
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                        value={formData.tenantType} onChange={handleChange}
                                    >
                                        <option value="family">Family</option>
                                        <option value="bachelors">Bachelors</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detailed Specs */}
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                            <Layers size={24} className="text-gold" /> Property Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">BHK</label>
                                <select 
                                    name="bhk"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    value={formData.bhk} onChange={handleChange}
                                >
                                    <option value="1BHK">1 BHK</option>
                                    <option value="2BHK">2 BHK</option>
                                    <option value="3BHK">3 BHK</option>
                                    <option value="4BHK">4 BHK</option>
                                    <option value="5BHK">5 BHK</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Size (Sq Ft)</label>
                                <input 
                                    type="number" name="size" required
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    placeholder="e.g. 2400"
                                    value={formData.size} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Floor</label>
                                <input 
                                    type="text" name="floor"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    placeholder="e.g. 15"
                                    value={formData.floor} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Total Floors</label>
                                <input 
                                    type="text" name="totalFloors"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    placeholder="e.g. 40"
                                    value={formData.totalFloors} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Bathrooms</label>
                                <input 
                                    type="number" name="bathrooms"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    placeholder="e.g. 3"
                                    value={formData.bathrooms} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Facing</label>
                                <input 
                                    type="text" name="facing"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    placeholder="e.g. North-East"
                                    value={formData.facing} onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Age of Property</label>
                                <select 
                                    name="propertyAge"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    value={formData.propertyAge} onChange={handleChange}
                                >
                                    <option value="0-1 Years">0-1 Years</option>
                                    <option value="1-5 Years">1-5 Years</option>
                                    <option value="5-10 Years">5-10 Years</option>
                                    <option value="10+ Years">10+ Years</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Furnishing</label>
                                <select 
                                    name="furnishing"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    value={formData.furnishing} onChange={handleChange}
                                >
                                    <option value="Furnished">Furnished</option>
                                    <option value="Semi-Furnished">Semi-Furnished</option>
                                    <option value="Unfurnished">Unfurnished</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Possession Status</label>
                                <select 
                                    name="possessionStatus"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                    value={formData.possessionStatus} onChange={handleChange}
                                >
                                    <option value="Ready to Move">Ready to Move</option>
                                    <option value="Under Construction">Under Construction</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                            <CheckCircle2 size={24} className="text-gold" /> Description & Amenities
                        </h3>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Property Description</label>
                                <textarea 
                                    name="description" required rows="6"
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium resize-none"
                                    placeholder="Describe the property's unique features, view, and layout..."
                                    value={formData.description} onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Select Amenities</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {amenitiesList.map((amenity, idx) => (
                                        <button
                                            key={idx} type="button"
                                            onClick={() => handleAmenityChange(amenity)}
                                            className={`flex items-center justify-center gap-2 p-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                                                formData.amenities.includes(amenity)
                                                ? 'bg-gold/10 border-gold text-gold'
                                                : 'bg-gray-50 border-transparent text-gray-400 hover:border-gray-200'
                                            }`}
                                        >
                                            {formData.amenities.includes(amenity) && <CheckCircle2 size={16} />}
                                            {amenity}
                                        </button>
                                    ))}
                                    {/* Display added custom amenities that are not in the predefined list */}
                                    {formData.amenities.filter(a => !amenitiesList.includes(a)).map((amenity, idx) => (
                                        <button
                                            key={`custom-${idx}`} type="button"
                                            onClick={() => handleAmenityChange(amenity)}
                                            className="flex items-center justify-center gap-2 p-4 rounded-2xl font-bold text-sm transition-all border-2 bg-gold/10 border-gold text-gold"
                                        >
                                            <CheckCircle2 size={16} />
                                            {amenity}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Amenity Input */}
                                <div className="flex gap-4 mt-4">
                                    <input 
                                        type="text" 
                                        placeholder="Add other amenity (e.g. Roof Top Cafe)" 
                                        className="flex-grow px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-gold/20 outline-none transition-all font-medium"
                                        value={customAmenity}
                                        onChange={(e) => setCustomAmenity(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomAmenity(e)}
                                    />
                                    <button 
                                        type="button"
                                        onClick={handleAddCustomAmenity}
                                        className="px-8 py-4 bg-gold text-white rounded-2xl font-bold hover:bg-gold-dark transition-all"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
                                <input 
                                    type="checkbox" name="featured" id="featured"
                                    className="w-6 h-6 rounded-lg text-gold focus:ring-gold border-gray-300"
                                    checked={formData.featured} onChange={handleChange}
                                />
                                <label htmlFor="featured" className="font-bold text-primary-dark cursor-pointer">Mark as Featured Property</label>
                            </div>
                        </div>
                    </div>

                    {/* Media: Images & Videos */}
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                            <Upload size={24} className="text-gold" /> Property Media
                        </h3>

                        {/* Active Uploads Progress */}
                        {Object.keys(uploadProgress).length > 0 && (
                            <div className="mb-10 space-y-4">
                                <label className="text-xs font-bold text-gold uppercase tracking-widest ml-1">Uploading Media...</label>
                                {Object.entries(uploadProgress).map(([fileName, progress]) => (
                                    <div key={fileName} className="bg-gray-50 p-4 rounded-2xl border border-gold/20">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-primary-dark truncate max-w-[70%]">{fileName}</span>
                                            <span className="text-sm font-bold text-gold">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                className="bg-gold h-full"
                                            />
                                        </div>
                                        {progress === 100 && (
                                            <p className="text-[10px] text-gray-400 mt-2 italic animate-pulse">Finalizing and generating thumbnails... Please wait.</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* Images Section */}
                        <div className="mb-12">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-4 block">Property Images</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                                        <img src={img.url} className="w-full h-full object-cover" alt="" />
                                        <button 
                                            type="button"
                                            onClick={() => removeMedia(idx, 'image')}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                
                                <label className="relative aspect-square rounded-2xl border-4 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all group">
                                    <input 
                                        type="file" multiple accept="image/*" className="hidden" 
                                        onChange={(e) => handleMediaUpload(e, 'image')} disabled={uploading}
                                    />
                                    {uploading ? (
                                        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <PlusCircle size={32} className="text-gray-300 group-hover:text-gold transition-colors mb-2" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Add Images</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>

                        {/* Videos Section */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-4 block">Property Videos</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {formData.videos.map((vid, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group bg-black">
                                        <video src={vid.url} className="w-full h-full object-cover opacity-60" />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                                            </div>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => removeMedia(idx, 'video')}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                
                                <label className="relative aspect-square rounded-2xl border-4 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all group">
                                    <input 
                                        type="file" multiple accept="video/*" className="hidden" 
                                        onChange={(e) => handleMediaUpload(e, 'video')} disabled={uploading}
                                    />
                                    {uploading ? (
                                        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <PlusCircle size={32} className="text-gray-300 group-hover:text-gold transition-colors mb-2" />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Add Videos</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" disabled={loading || uploading}
                        className="w-full py-6 bg-primary-dark text-white rounded-[2rem] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all duration-300 shadow-2xl shadow-gold/10 disabled:opacity-50"
                    >
                        {loading ? 'Creating Property...' : 'Publish Property Listing'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
