// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const authenticateToken = require('../middleware/authMiddleware'); // Import the authMiddleware

router.post('/register', userService.registerUser);
router.post('/login', userService.login);
router.get('/profile',authenticateToken, userService.getUserProfile);
router.put('/update-privileges/:userId',authenticateToken, userService.updateUserPrivileges);
router.delete('/delete/:userId',userService.deleteUser)

module.exports = router;
