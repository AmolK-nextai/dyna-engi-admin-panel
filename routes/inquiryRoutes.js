const express = require('express');
const inquiryService = require('../services/inquiryService');

const router = express.Router();

router.get('/', inquiryService.getAllInquiries);
router.get('/:id', inquiryService.getInquiryById);
router.post('/', inquiryService.createInquiry);
router.put('/:id', inquiryService.updateInquiry);
router.delete('/:id', inquiryService.deleteInquiry);

module.exports = router;
