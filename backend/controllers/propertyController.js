const Property = require('../models/Property');
const slugify = require('slugify');
const imagekit = require('../utils/imageKit');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all properties with pagination, filtering and sorting
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
    const pageSize = 9;
    const page = Number(req.query.pageNumber) || 1;

    const { bhk, minPrice, maxPrice, location, society, propertyType, sort } = req.query;

    let query = {};

    if (bhk) query.bhk = bhk;
    if (propertyType) query.propertyType = propertyType;
    
    if (location) {
        query.$or = [
            { title: { $regex: location, $options: 'i' } },
            { societyName: { $regex: location, $options: 'i' } },
            { location: { $regex: location, $options: 'i' } }
        ];
    }
    
    if (society) query.societyName = { $regex: society, $options: 'i' };
    
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortQuery = { createdAt: -1 };
    if (sort === 'priceLow') sortQuery = { price: 1 };
    if (sort === 'priceHigh') sortQuery = { price: -1 };

    const count = await Property.countDocuments(query);
    const properties = await Property.find(query)
        .sort(sortQuery)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ properties, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc    Get property by slug
// @route   GET /api/properties/:slug
// @access  Public
const getPropertyBySlug = asyncHandler(async (req, res) => {
    const property = await Property.findOne({ slug: req.params.slug });
    if (property) {
        res.json(property);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (property) {
        res.json(property);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Admin
const createProperty = asyncHandler(async (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        res.status(400);
        throw new Error('Title is required');
    }

    const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();
    
    const property = new Property({
        ...req.body,
        slug
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
});

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
const updateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        // If title changed, update slug
        if (req.body.title && req.body.title !== property.title) {
            property.slug = slugify(req.body.title, { lower: true, strict: true }) + '-' + Date.now();
        }

        Object.assign(property, req.body);
        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
const deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        // Delete images from ImageKit
        if (property.images && property.images.length > 0) {
            const deletePromises = property.images
                .filter(img => img.fileId)
                .map(img => imagekit.deleteFile(img.fileId).catch(err => {
                    console.error(`Failed to delete file ${img.fileId}:`, err.message);
                }));
            
            await Promise.all(deletePromises);
        }
        
        await property.deleteOne();
        res.json({ message: 'Property removed' });
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

// @desc    Search properties
// @route   GET /api/search
// @access  Public
const searchProperties = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) return res.json([]);

    const properties = await Property.find({
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { societyName: { $regex: keyword, $options: 'i' } },
            { location: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { propertyType: { $regex: keyword, $options: 'i' } },
            { bhk: { $regex: keyword, $options: 'i' } },
        ]
    }).limit(10);

    res.json(properties);
});

// @desc    Get featured properties (fallback to latest if none featured)
// @route   GET /api/properties/featured
// @access  Public
const getFeaturedProperties = asyncHandler(async (req, res) => {
    let properties = await Property.find({ featured: true }).limit(6);
    
    // Fallback: If no featured properties, get latest 6
    if (properties.length === 0) {
        properties = await Property.find({}).sort({ createdAt: -1 }).limit(6);
    }
    
    res.json(properties);
});

// @desc    Upload media to ImageKit (image or video)
// @route   POST /api/properties/upload
// @access  Private/Admin
const uploadMedia = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }

    const isVideo = req.file.mimetype.startsWith('video/');
    const folder = isVideo ? '/gnm_properties/videos' : '/gnm_properties/images';

    const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: folder,
        useUniqueFileName: true,
    });

    res.json({
        url: response.url,
        fileId: response.fileId,
        thumbnailUrl: isVideo ? response.thumbnailUrl : null,
        isVideo
    });
});

module.exports = {
    getProperties,
    getPropertyBySlug,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    searchProperties,
    getFeaturedProperties,
    uploadMedia
};
