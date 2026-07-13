const Application = require('../models/Application');
const imagekit = require('../utils/imageKit');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Submit a job application
// @route   POST /api/applications
// @access  Public
const submitApplication = asyncHandler(async (req, res) => {
    const { jobId, name, email, phone, resumeUrl, resumeFileId, coverLetter, role } = req.body;
    
    if (!name || !email || !phone || !resumeUrl) {
        res.status(400);
        throw new Error('Please provide all required fields (name, email, phone, resume)');
    }

    const applicationData = {
        name,
        email,
        phone,
        resumeUrl,
        resumeFileId,
        coverLetter,
        role
    };

    if (jobId) {
        applicationData.job = jobId;
    }

    const application = await Application.create(applicationData);
    res.status(201).json(application);
});

// @desc    Upload resume to ImageKit
// @route   POST /api/applications/upload
// @access  Public
const uploadResume = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/gnm_careers/resumes',
        useUniqueFileName: true,
    });

    res.json({
        url: response.url,
        fileId: response.fileId
    });
});

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private/Admin
const getApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find().populate('job', 'title').sort({ appliedAt: -1 });
    res.json(applications);
});

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private/Admin
const updateApplicationStatus = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id);
    if (application) {
        application.status = req.body.status || application.status;
        const updatedApplication = await application.save();
        res.json(updatedApplication);
    } else {
        res.status(404);
        throw new Error('Application not found');
    }
});

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private/Admin
const deleteApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id);
    if (application) {
        // Delete resume from ImageKit if exists
        if (application.resumeFileId) {
            try {
                await imagekit.deleteFile(application.resumeFileId);
            } catch (err) {
                console.error('Error deleting file from ImageKit:', err);
            }
        }
        await application.deleteOne();
        res.json({ message: 'Application removed' });
    } else {
        res.status(404);
        throw new Error('Application not found');
    }
});

module.exports = {
    submitApplication,
    uploadResume,
    getApplications,
    updateApplicationStatus,
    deleteApplication
};
