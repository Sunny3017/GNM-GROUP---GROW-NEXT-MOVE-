const express = require('express');
const router = express.Router();
const { 
    submitInquiry, 
    getInquiries, 
    updateInquiryStatus, 
    deleteInquiry 
} = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getInquiries)
    .post(submitInquiry);

router.route('/:id')
    .put(protect, updateInquiryStatus)
    .delete(protect, deleteInquiry);

module.exports = router;
