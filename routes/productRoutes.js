// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const upload = require('../middleware/multerConfig');
router.get('/:id',productService.getAproduct)
router.get('/', productService.getAllProducts);
router.post('/', upload.array('images',5),productService.createProduct);
router.get('/')
// Route to create a new product

router.patch('/updateimg',upload.array('images',5),productService.productImage)
router.put('/:productId', productService.updateProduct);
router.delete('/:productId', productService.deleteProduct);
router.patch('/deleteimage',productService.deleteImage)
router.post('/addnewimg',upload.array('images',5),productService.addImage)

module.exports = router;
