const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    getProperties,
    getPropertyBySlug,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    searchProperties,
    getFeaturedProperties,
    uploadMedia
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for videos
});

router.route('/')
    .get(getProperties)
    .post(protect, createProperty);

router.post('/upload', protect, upload.single('media'), uploadMedia);

router.get('/featured', getFeaturedProperties);
router.get('/search', searchProperties);

router.route('/:id')
    .get(getPropertyById)
    .put(protect, updateProperty)
    .delete(protect, deleteProperty);

router.get('/slug/:slug', getPropertyBySlug);

module.exports = router;
