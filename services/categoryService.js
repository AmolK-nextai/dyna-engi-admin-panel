// services/categoryService.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getAllCategories = async (req, res) => {
  try {
    // Get all categories from the database
    const categories = await prisma.category.findMany({});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    // Create a new category in the database
    const newCategory = await prisma.category.create({ data: { ...req.body } });
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateCategory = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const { name } = req.body;

  try {
    // Find the category in the database based on the category ID
    const existingCategory = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update the category in the database
    const updatedCategory = await prisma.category.update({ where: { id: categoryId }, data: { ...req.body } });
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    // Find the category in the database based on the category ID
    const existingCategory = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Delete the category from the database
    await prisma.category.delete({ where: { id: categoryId } });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
