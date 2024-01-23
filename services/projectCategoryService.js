const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new project category
async function createProjectCategory(categoryData) {
  try {
    const category = await prisma.projectCategory.create({
      data: categoryData,
    });
    return category;
  } catch (error) {
    throw error;
  }
}

// Get all project categories
async function getAllProjectCategories() {
  try {
    const categories = await prisma.projectCategory.findMany();
    return categories;
  } catch (error) {
    throw error;
  }
}

// Get project category by ID
async function getProjectCategoryById(categoryId) {
  try {
    const category = await prisma.projectCategory.findUnique({
      where: { id: categoryId },
    });
    return category;
  } catch (error) {
    throw error;
  }
}

// Update a project category
async function updateProjectCategory(categoryId, categoryData) {
  try {
    const updatedCategory = await prisma.projectCategory.update({
      where: { id: categoryId },
      data: categoryData,
    });
    return updatedCategory;
  } catch (error) {
    throw error;
  }
}

// Delete a project category
async function deleteProjectCategory(categoryId) {
  try {
    await prisma.projectCategory.delete({
      where: { id: categoryId },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProjectCategory,
  getAllProjectCategories,
  getProjectCategoryById,
  updateProjectCategory,
  deleteProjectCategory,
};
