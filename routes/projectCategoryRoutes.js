const express = require('express');
const router = express.Router();
const projectCategoryService = require('../services/projectCategoryService');

// Create a new project category
router.post('/', async (req, res) => {
  try {
    const { name, catInfo } = req.body;
    const categoryData = { name, catInfo };
    const category = await projectCategoryService.createProjectCategory(categoryData);
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create project category' });
  }
});

// Get all project categories
router.get('/', async (req, res) => {
  try {
    const categories = await projectCategoryService.getAllProjectCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch project categories' });
  }
});

// Get project category by ID
router.get('/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);

  try {
    const category = await projectCategoryService.getProjectCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Project category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch project category' });
  }
});

// Update a project category
router.put('/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const { name, catInfo } = req.body;
  const categoryData = { name, catInfo };

  try {
    const updatedCategory = await projectCategoryService.updateProjectCategory(categoryId, categoryData);
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update project category' });
  }
});

// Delete a project category
router.delete('/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);

  try {
    await projectCategoryService.deleteProjectCategory(categoryId);
    res.json({ message: 'Project category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete project category' });
  }
});

module.exports = router;
