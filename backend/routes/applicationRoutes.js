const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    submitApplication,
    uploadResume,
    getApplications,
    updateApplicationStatus,
    deleteApplication
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit for resumes
});

router.route('/')
    .post(submitApplication)
    .get(protect, getApplications);

router.post('/upload', upload.single('resume'), uploadResume);

router.route('/:id')
    .put(protect, updateApplicationStatus)
    .delete(protect, deleteApplication);

module.exports = router;
