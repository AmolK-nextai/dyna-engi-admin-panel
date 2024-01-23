const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

// Create a new project
async function createProject(projectData) {
  try {
    const project = await prisma.project.create({
      data: projectData,
    });
    return project;
  } catch (error) {
    throw error;
  }
}

// Update a project
async function updateProject(projectId, projectData) {
  try {
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: projectData,
    });
    return updatedProject;
  } catch (error) {
    throw error;
  }
}

// Delete a project
async function deleteProject(projectId) {
  try {
    await prisma.project.delete({
      where: { id: projectId },
    });
  } catch (error) {
    throw error;
  }
}


async function getAllProjects() {
    try {
      const projects = await prisma.project.findMany({include:{projectCategory:true},orderBy:{id:'desc'}});
      return projects;
    } catch (error) {
      throw error;
    }
  }
  
  // Get project by ID
  async function getProjectById(projectId) {
    try {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  // delete product image
async function deleteProjectImage(req,res){
  try {

  
    let {productId,currentImgIndex}=req.body
    console.log(req.body)
   

    const existingProduct = await prisma.project.findUnique({ where: { id:parseInt(productId) } });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Project not found' });
    }
    let projectImage=existingProduct.projectImage
    const imageTodelete=currentImgIndex
    const imagePath = `./public/${imageTodelete}`;
    if(fs.existsSync(imagePath)){
      fs.unlinkSync(imagePath);
    }
    projectImage=projectImage.filter(x=>x!=currentImgIndex)
    // images.splice(imageTodelete, 1);
    // Update the product in the database
    const updatedProduct = await prisma.project.update({ where: { id: productId }, data:{ projectImage} });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
// add project image

async function addProjectImgae(req,res){
  try {
    let {productId }=req.body
    productId=parseInt(productId)

    let projectImage = req.files.map((file) => `/images/${file.filename}`);
    const existingProduct = await prisma.project.findUnique({ where: { id:productId } });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
     
    projectImage=[...projectImage,...existingProduct.projectImage,]
    
    const updatedProduct = await prisma.project.update({ where: { id: productId }, data:{  projectImage} });
    res.json(updatedProduct);


    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  deleteProjectImage,
  addProjectImgae

  
};
