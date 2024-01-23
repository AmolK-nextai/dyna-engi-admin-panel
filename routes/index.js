// routes/index.js
const express = require('express');
const router = express.Router();




const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const inquiryRoutes = require('./inquiryRoutes');
const projectRoutes=require('./projectRoutes')
const projectCategories=require('./projectCategoryRoutes')

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories',categoryRoutes)
router.use('/inquiries', inquiryRoutes);
router.use('/project',projectRoutes);
router.use('/project-categories',projectCategories)


module.exports = router;
