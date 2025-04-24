const express = require('express');
const router = express.Router();
const details = require("../Controller/details.controller");
const jwt=require("jsonwebtoken")
// Route for creating a new user
const authMiddleware = (req, res, next) => {
  console.log("Header token:", req.header("Authorization"));


    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Extracted token:", token);
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, "123");  // Token verification
  
      // Attach decoded user info to the request object
      req.user = decoded;
      next();  // Allow the request to proceed
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired, please log in again' });
      }
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
router.post('/create', details.createUser);
 
// to login
router.post("/login",details.loginUser)
// Route for getting all users
router.get('/users', authMiddleware,details.getAllUsers);

// Route for getting a user by ID
router.get('/users/:id', authMiddleware,details.getUserById);

//login a user
// router.post("/login",details.loginUser)

// Route for updating a user by ID
router.put('/users/:id', authMiddleware,details.updateUser);

// Route for deleting a user by ID
router.delete('/users/:id',authMiddleware, details.deleteUser);

module.exports = router;
