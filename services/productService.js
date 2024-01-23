// services/productService.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();
exports.getAproduct=async(req,res)=>{
  try {
    const productId = parseInt(req.params.id);
    console.log(productId)
    const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
  
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(existingProduct)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    // Get all products from the database
    const products = await prisma.product.findMany({include:{Category:true}});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createProduct = async (req, res) => {
  let productData = req.body;
  let price=parseInt(productData.price)
  let minOrderQuantity=parseInt(productData.minOrderQuantity)
  let categoryId=parseInt(productData.categoryId)
  
    // Get the file paths of the uploaded images and create image URLs
    const images = req.files.map((file) => `/images/${file.filename}`);
   

    productData={...productData, minOrderQuantity,price,images,categoryId}
    console.log(productData)


  try {
    // Create a new product in the database
    const newProduct = await prisma.product.create({ data: productData });
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = parseInt(req.params.productId);
  const productData = req.body;

  try {
    // Find the product in the database based on the product ID
    const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product in the database
    const updatedProduct = await prisma.product.update({ where: { id: productId }, data: productData });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    // Find the product in the database based on the product ID
    const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product from the database
    await prisma.product.delete({ where: { id: productId } });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.productImage=async(req,res)=>{
  console.log(req.body)
  
  let {productId,currentImgIndex}=req.body
  productId=parseInt(productId)
  console.log(productId)


  
  
    // Get the file paths of the uploaded images and create image URLs
    const newImages = req.files.map((file) => `/images/${file.filename}`);
   

  try {
    // Find the product in the database based on the product ID
    const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    let images=existingProduct.images
    const imageTodelete=images[parseInt(currentImgIndex)]
    const imagePath = `./public/${imageTodelete}`;
    if(fs.existsSync(imagePath)){
      fs.unlinkSync(imagePath);
    }

// to delete previous image


    images[parseInt(currentImgIndex)]=newImages[0]

    // Update the product in the database
    const updatedProduct = await prisma.product.update({ where: { id: productId }, data:{images} });
   

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}


exports.deleteImage=async(req,res)=>{
  try {

  
    let {productId,currentImgIndex}=req.body
   

    const existingProduct = await prisma.product.findUnique({ where: { id:parseInt(productId) } });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    let images=existingProduct.images
    const imageTodelete=currentImgIndex
    const imagePath = `./public/${imageTodelete}`;
    if(fs.existsSync(imagePath)){
      fs.unlinkSync(imagePath);
    }
    images=images.filter(x=>x!=currentImgIndex)
    // images.splice(imageTodelete, 1);
    // Update the product in the database
    const updatedProduct = await prisma.product.update({ where: { id: productId }, data:{images} });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


exports.addImage=async(req,res)=>{
  try {
    let {productId }=req.body
    productId=parseInt(productId)

    let images = req.files.map((file) => `/images/${file.filename}`);
    const existingProduct = await prisma.product.findUnique({ where: { id:productId } });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
     
      images=[...images,...existingProduct.images,]
    
    const updatedProduct = await prisma.product.update({ where: { id: productId }, data:{images} });
    res.json(updatedProduct);


    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}