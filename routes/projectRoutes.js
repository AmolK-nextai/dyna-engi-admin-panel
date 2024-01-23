const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');
const upload = require('../middleware/multerConfig');
// Create a new project
router.post('/', upload.array('images',5),async (req, res) => {
  try {
    let images =await req.files.map((file) => `/images/${file.filename}`);
    let projectImage=images
    const {name, description,projectCategoryId} = req.body;
    let  projectName=name
    const projectData = { projectName, description, projectImage,projectCategoryId:parseInt(projectCategoryId) };
    const project = await projectService.createProject(projectData);
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create project' });
  }
});


// Get all projects
router.get('/', async (req, res) => {
    try {
      const projects = await projectService.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to fetch projects' });
    }
  });
  
  // Get project by ID
  router.get('/:id', async (req, res) => {
    const projectId = parseInt(req.params.id);
  
    try {
      const project = await projectService.getProjectById(projectId);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to fetch project' });
    }
  });

// Update a project
router.put('/:id', async (req, res) => {
  const projectId = parseInt(req.params.id);
  const { projectName, description, projectImage } = req.body;
  const projectData = { projectName, description, projectImage };

  try {
    const updatedProject = await projectService.updateProject(projectId, projectData);
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update project' });
  }
});

// Delete a project
router.delete('/:id', async (req, res) => {
  const projectId = parseInt(req.params.id);

  try {
    await projectService.deleteProject(projectId);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete project' });
  }
});

router.patch('/deleteimage',projectService.deleteProjectImage)
router.post('/addnewimg',upload.array('images',5),projectService.addProjectImgae)

module.exports = router;
