// services/userService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the username already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({ data: { username, password: hashedPassword, role } });

    res.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Find the user in the database based on the user ID
    const user = await prisma.user.findMany({ });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateUserPrivileges = async (req, res) => {
  const userId = req.params.userId;
  const { role } = req.body;

  try {
    // Find the user in the database based on the user ID
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the role of the user
    const updatedUser = await prisma.user.update({ where: { id: parseInt(userId) }, data: { role } });

    res.json({ message: 'User privileges updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  const { role } = req.body;

  try {
    // Find the user in the database based on the user ID
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the role of the user
    const updatedUser = await prisma.user.delete({ where: { id: parseInt(userId) }});

    res.json({ message: 'User deleted successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
