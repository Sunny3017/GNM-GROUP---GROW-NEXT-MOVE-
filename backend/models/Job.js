const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    location: { type: String, required: true },
    type: { type: String, required: true }, // Full-time, Part-time, Contract, etc.
    salary: { type: String },
    experience: { type: String },
    category: { type: String }, // Sales, Marketing, HR, IT, etc.
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
