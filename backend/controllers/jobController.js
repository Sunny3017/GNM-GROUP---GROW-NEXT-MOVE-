const Job = require('../models/Job');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all active jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
    // Return only active jobs by default
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(jobs);
});

// @desc    Get all jobs (for admin)
// @route   GET /api/jobs/admin
// @access  Private/Admin
const getAllJobsAdmin = asyncHandler(async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
});

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (job) {
        res.json(job);
    } else {
        res.status(404);
        throw new Error('Job not found');
    }
});

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private/Admin
const createJob = asyncHandler(async (req, res) => {
    const { title, description, requirements, location, type, salary, experience, category } = req.body;
    
    if (!title || !description) {
        res.status(400);
        throw new Error('Title and description are required');
    }

    const job = await Job.create({
        title,
        description,
        requirements,
        location,
        type,
        salary,
        experience,
        category
    });
    res.status(201).json(job);
});

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private/Admin
const updateJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (job) {
        job.title = req.body.title || job.title;
        job.description = req.body.description || job.description;
        job.requirements = req.body.requirements || job.requirements;
        job.location = req.body.location || job.location;
        job.type = req.body.type || job.type;
        job.salary = req.body.salary || job.salary;
        job.experience = req.body.experience || job.experience;
        job.category = req.body.category || job.category;
        job.isActive = req.body.isActive !== undefined ? req.body.isActive : job.isActive;

        const updatedJob = await job.save();
        res.json(updatedJob);
    } else {
        res.status(404);
        throw new Error('Job not found');
    }
});

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (job) {
        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } else {
        res.status(404);
        throw new Error('Job not found');
    }
});

module.exports = {
    getJobs,
    getAllJobsAdmin,
    getJobById,
    createJob,
    updateJob,
    deleteJob
};
