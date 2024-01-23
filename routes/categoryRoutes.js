// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');
const authenticateToken = require('../middleware/authMiddleware');

// Route to get all categories
router.get('/',categoryService.getAllCategories);

// Route to create a new category
router.post('/', authenticateToken, categoryService.createCategory);

// Route to update an existing category
router.put('/:categoryId', authenticateToken, categoryService.updateCategory);

// Route to delete a category
router.delete('/:categoryId', authenticateToken, categoryService.deleteCategory);

module.exports = router;
