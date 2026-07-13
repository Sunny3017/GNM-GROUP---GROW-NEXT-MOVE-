const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String, required: true }, // Link to resume uploaded to ImageKit or other storage
    resumeFileId: { type: String },
    role: { type: String }, // For general applications
    coverLetter: { type: String },
    status: { type: String, default: 'Pending' }, // Pending, Reviewed, Shortlisted, Rejected
    appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
