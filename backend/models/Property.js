const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    societyName: { type: String, required: true },
    propertyType: { type: String, required: true }, // e.g., Apartment, Villa, etc.
    bhk: { type: String, required: true }, // e.g., 1BHK, 2BHK, etc.
    size: { type: Number, required: true }, // in Sq Ft
    price: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    floor: { type: String },
    totalFloors: { type: String },
    furnishing: { type: String }, // Furnished, Semi-Furnished, Unfurnished
    parking: { type: String },
    facing: { type: String },
    bathrooms: { type: Number },
    propertyAge: { type: String },
    possessionStatus: { type: String }, // Ready to Move, Under Construction
    amenities: [{ type: String }], // Array of amenities
    images: [{
        url: { type: String },
        fileId: { type: String }
    }],
    videos: [{
        url: { type: String },
        fileId: { type: String },
        thumbnailUrl: { type: String }
    }],
    featured: { type: Boolean, default: false },
    coverType: { type: String, default: 'image' }, // 'image' or 'video'
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
